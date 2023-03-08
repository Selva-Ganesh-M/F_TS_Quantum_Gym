import FilledBtn, { EButtonType } from '@/components/shared/FilledBtn';
import OutlineBtn from '@/components/shared/OutlineBtn';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import { FileWithPath, useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useState } from 'react'
import * as Yup from "yup";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '@/firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/features/user/authSlice';
import EventCard from '@/components/cards/EventCard';
import EventPreviewCard from '@/components/cards/EventPreviewCard';
import useMediaQuery from '@/hooks/useMediaQuery';
import { api, TPayload } from '@/api/api';
import { TPEvent } from './EventsPage';
import { ImStarEmpty, ImStarFull } from 'react-icons/im';
import { TRootState, TStoreDispatch } from '@/store/store';
import { createEvent, selectAllEvents } from '@/features/events/eventSlice';


type Props = {}

export type TSEvent = {
    title: string;
    desc: string;
    date: Date;
    location: string;
    img: string;
    rating: number;
    userId: string;
    registrations: Array<string>
}

const CreateEvent = (props: Props) => {
    //#region : grabbing
    const dispatch: TStoreDispatch = useDispatch()
    const user = useSelector(getUser).user
    const events = useSelector((state: TRootState) => state.events)


    const navigate = useNavigate()
    const isAboveMedium = useMediaQuery("(min-width:769px")
    //#endregion

    //#region : custom-declarations
    const [uploadedImage, setUploadedImage] = useState<FileWithPath>();
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>()
    const [imagePer, setImagePer] = useState<number>(0)
    const [imageFirebaseUploadSuccess, setImageFirebaseUploadSuccess] = useState<Boolean>(false)
    const [customWarning, setCustomWarning] = useState<string>("")
    const [overallWarning, setOverallWarning] = useState<boolean>();
    const [preview, setPreview] = useState<TSEvent>({
        title: "Event Title",
        desc: "",
        date: new Date(),
        location: "Location",
        img: uploadedImageUrl || "",
        rating: 1,
        userId: "",
        registrations: []
    })


    //#endregion

    //#region : side-effects
    useEffect(() => {
        uploadedImage && uploadFile(uploadedImage)
    }, [uploadedImage])

    //#endregion

    //#region : functions
    // SUBMIT FORM

    const handleFormSubmit = async (
        values: TSEvent,
        { setSubmitting, resetForm }: any
    ) => {
        console.log("form submit func");
        console.log(values)

        if (!uploadedImageUrl) {
            setCustomWarning("Please upload the image.")
            setOverallWarning(true)
            setTimeout(() => {
                setCustomWarning("")
                setOverallWarning(false)
            }, 3000)
            return
        }

        console.log("uploaded image url", uploadedImageUrl)
        values.img = uploadedImageUrl!
        values.userId = user._id

        if (!Object.values(values).every(Boolean)) {
            console.log(values);
            // showing common error on form for 500ms
            setOverallWarning(true);
            // hiding the error
            setTimeout(() => setOverallWarning(false), 3000);
            return;
        }
        console.log(values);


        // updating state
        await dispatch(createEvent(values));

        // clean up
        resetForm();
        setOverallWarning(false);
        setUploadedImage(undefined);
        setImagePer(0)
        setImageFirebaseUploadSuccess(false)
        setUploadedImageUrl("")
        setCustomWarning("")
        setOverallWarning(false)
        navigate("/home/events")

    };
    //#endregion

    // #region : form specifics

    // function declaration
    const customError = (msg: string) => {
        return <div className="text-red-900">{`* ${msg}`}</div>;
    };

    // FORMIK SPECIFICS
    const initialValues: TSEvent = {
        title: "",
        desc: "",
        date: new Date(),
        location: "",
        img: "",
        rating: 1,
        userId: "",
        registrations: []
    };

    // YUP validation
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("title is a required field"),
        desc: Yup.string().required("description is a required field"),
        userId: Yup.string().required("organizer is a required field"),
        date: Yup.date().required("date is a required field"),
        location: Yup.string().required("location is a required field"),
        img: Yup.string(),
        rating: Yup.number().min(1).max(5).required("rating is a required field"),
    });

    // handle firebase image upload
    const uploadFile = async (file: File) => {
        const storage = getStorage(app);
        const fileName = new Date().toString() + file.name
        const storageRef = ref(storage, "eventImages/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePer(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFirebaseUploadSuccess(true)
                    setUploadedImageUrl(downloadURL)
                    setPreview(prev => {
                        return { ...prev, img: downloadURL }
                    })
                });
            }
        );
    }



    // date picker field
    const DatePickerField = ({ name, value, onChange }: { name: string, value: any, onChange: (field: string, value: any, shouldValidate?: boolean | undefined) => void }) => {
        return (
            <DatePicker
                className='cursor-pointer p-2'
                selected={(value && new Date(value)) || null}
                onChange={(val: any) => {
                    onChange(name, val);
                }}

            />
        );
    };

    //#region : dropzone

    // DROPZONE PREP
    const onDrop = useCallback((acceptedFiles: Array<FileWithPath>) => {
        // had to use any cause I can't find the types
        setUploadedImage(acceptedFiles[0]);
        console.log(acceptedFiles);
    }, []);

    // USE DROPZONE
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".png"],
        },
        multiple: false,
    });

    //#endregion


    // #endregion

    //jsx rendering
    // JSX RENDERING
    return (
        // flexbox
        <div className='flex gap-10 items-center m-auto sm:w-[70%] md:w-[80%]'>
            {/* form */}
            <div
                id="signup"
                className=" basis-1/2 p-10 md:p-4 lg:text-sm text-xs h-[89vh] flex items-center lg:px-10 flex-1"
            >
                {/* form */}

                <div className="w-full relative">
                    <h1 className="text-[34px] mb-6 md:mb-4 text-center font-bold sticky top-[82px] bg-white">
                        Create Event
                    </h1>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            resetForm,
                        }) => (
                            <Form>
                                {/* title */}
                                <div className="mb-3">
                                    <div>
                                        <label htmlFor="title" className="block">
                                            Title
                                        </label>
                                        <Field
                                            name="title"
                                            type="text"
                                            className="p-2 border-2 w-full"
                                            placeholder="enter title here..."
                                            autoComplete="off"
                                            value={values.title}
                                            onChange={(e: any) => {
                                                handleChange(e)
                                                setPreview((prev: TSEvent) => {
                                                    return { ...prev, title: e.target.value }
                                                })
                                            }}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <ErrorMessage name={"title"}>{customError}</ErrorMessage>
                                </div>

                                {/* desc */}
                                <div className="mb-3">
                                    <div>
                                        <label htmlFor="desc" className="block">
                                            Description
                                        </label>
                                        <textarea
                                            style={{
                                                resize: "none"
                                            }}
                                            name="desc"
                                            rows={7}
                                            cols={40}
                                            className="p-2 border-2 w-full"
                                            placeholder="enter description here..."
                                            autoComplete="off"
                                            value={values.desc}
                                            onChange={(e: any) => {
                                                handleChange(e)
                                                setPreview((prev: TSEvent) => {
                                                    return { ...prev, desc: e.target.value }
                                                })
                                            }}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <ErrorMessage name={"desc"}>{customError}</ErrorMessage>
                                </div>

                                {/* organizer */}
                                <div className="mb-3 flex-1">
                                    <div>
                                        <label htmlFor="userId" className="block">
                                            Organizer
                                        </label>
                                        <Field
                                            as="select"
                                            name="userId"
                                            className="p-2 border-2 w-full"
                                            autoComplete="off"
                                            value={values.userId}
                                            onChange={(e: any) => {
                                                handleChange(e)
                                                setPreview((prev: TSEvent) => {
                                                    return { ...prev, organizer: e.target.value }
                                                })
                                            }}
                                            onBlur={handleBlur}
                                        >
                                            {/* placeholder option */}
                                            <option value="" disabled>select the event organizer</option>
                                            {/* option */}
                                            <option value={user._id}>
                                                {user.email}
                                            </option>
                                        </Field>
                                    </div>
                                    <ErrorMessage name={"userId"}>{customError}</ErrorMessage>
                                </div>

                                {/* date and location */}
                                <div className='flex gap-3'>
                                    {/* date */}
                                    <div className="mb-3">
                                        <label htmlFor="date" className="block">
                                            Date
                                        </label>
                                        <div className='border-2'>
                                            <DatePickerField
                                                name="date"
                                                value={values.date}
                                                onChange={(field: string, value: any, shouldValidate?: boolean) => {
                                                    setFieldValue(field, value, shouldValidate)
                                                    setPreview((prev: TSEvent) => {
                                                        return { ...prev, date: value }
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* location */}
                                    <div className="mb-3 flex-1">
                                        <div>
                                            <label htmlFor="location" className="block">
                                                Location
                                            </label>
                                            <Field
                                                name="location"
                                                type="text"
                                                className="p-2 border-2 w-full"
                                                placeholder="enter location here..."
                                                autoComplete="off"
                                                value={values.location}
                                                onChange={(e: any) => {
                                                    handleChange(e)
                                                    setPreview((prev: TSEvent) => {
                                                        return { ...prev, location: e.target.value }
                                                    })
                                                }}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <ErrorMessage name={"location"}>{customError}</ErrorMessage>
                                    </div>
                                </div>

                                {/* dropzone */}
                                <div className={`border-2 mb-3 p-5 cursor-pointer ${uploadedImageUrl && "border-green-600"}`}>
                                    <div
                                        {...getRootProps()}
                                        className="h-14 relative border-dashed border-2"
                                    >
                                        <div {...getInputProps()} className="h-full w-full " />
                                        {isDragAccept && (
                                            <p className="absolute text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                                All files will be accepted
                                            </p>
                                        )}
                                        {isDragReject && (
                                            <p className="absolute text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                                Some files will be rejected
                                            </p>
                                        )}
                                        {!uploadedImage && !isDragActive && (
                                            <p className="absolute text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                                Drop your image here ...
                                            </p>
                                        )}
                                        {uploadedImage && (
                                            <>
                                                <p className="absolute text-center w-[90%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                                    {`${uploadedImage.name.substring(0, 30)}...`}{"  "}{imagePer > 0 ? imagePer : null}%
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Overall warning */}
                                {overallWarning && (
                                    <div className="text-center p-4 border-2 text-md bg-red-300 border-red-600 mb-3">
                                        {customWarning || "Please fill all the required fields"}
                                    </div>
                                )}

                                {/* actions */}
                                <div>
                                    <div className="flex justify-center md:justify-start">
                                        <a className="mr-2">
                                            {
                                                // condition deciding whether to show loading or normal button
                                                events.loading ? (
                                                    // show loading button
                                                    <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                                                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                                        </svg>
                                                        Loading...
                                                    </button>
                                                ) : (
                                                    // show normal button
                                                    <FilledBtn content={"Create"} type={EButtonType.submit} />

                                                )
                                            }
                                        </a>
                                        <a
                                            onClick={() => {
                                                setOverallWarning(false);
                                                resetForm();
                                                setUploadedImage(undefined)
                                                setPreview({
                                                    title: "Event Title",
                                                    desc: "",
                                                    date: new Date(),
                                                    location: "Location",
                                                    img: uploadedImageUrl || "",
                                                    rating: Math.floor(Math.random() * 5) + 1,
                                                    userId: "",
                                                    registrations: []
                                                })
                                                setUploadedImageUrl("")
                                            }}
                                        >
                                            <OutlineBtn content={"Reset"} />
                                        </a>
                                    </div>

                                </div>


                            </Form>
                        )}
                    </Formik>
                </div>

            </div>

            {/* preview */}
            {
                isAboveMedium && (
                    <div>
                        <EventPreviewCard width='md:w-[250px]  lg:w-[300px]' item={preview} />
                    </div>

                )
            }

        </div>

    );
}

export default CreateEvent