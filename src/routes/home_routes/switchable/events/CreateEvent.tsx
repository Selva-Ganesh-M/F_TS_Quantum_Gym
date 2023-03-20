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
import { getUser } from '@/features/user/authSlice';;
import EventPreviewCard from '@/components/cards/EventPreviewCard';
import useMediaQuery from '@/hooks/useMediaQuery';
import { TRootState, TStoreDispatch } from '@/store/store';
import { createEvent } from '@/features/events/eventSlice';


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
    const [isSubmittin, setIsSubmittin] = useState(false)
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

        setIsSubmittin(true)

        if (!uploadedImageUrl) {
            setCustomWarning("Please upload the image.")
            setOverallWarning(true)
            setTimeout(() => {
                setCustomWarning("")
                setOverallWarning(false)
            }, 3000)
            setIsSubmittin(false)
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
            setIsSubmittin(false)
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
        setIsSubmittin(false)
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
                    <h1 className="text-[34px] mb-6 md:mb-4 text-center font-bold sticky top-[82px] bg-white z-[995] pb-4">
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
                                                // show normal button
                                                <FilledBtn
                                                    content={
                                                        isSubmittin ? (
                                                            <>
                                                                <div
                                                                    className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                                                    role="status">
                                                                    <span
                                                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                                                    >Loading...</span>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            "Create"
                                                        )
                                                    }
                                                    sx={isSubmittin ? "bg-transparent hover:shadow-none cursor-progress" : ""}
                                                    type={EButtonType.submit}
                                                />

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