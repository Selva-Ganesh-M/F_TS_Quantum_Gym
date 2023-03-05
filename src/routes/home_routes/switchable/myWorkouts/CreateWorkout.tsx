import WorkoutPreviewCard from '@/components/cards/WorkoutPreviewCard'
import { ECategories, EFocuses } from '@/components/headers/MyWorkoutsHeader'
import { TPComment } from '@/features/comments/comment.slice'
import { getUser } from '@/features/user/authSlice'
import { TSWorkout } from '@/features/workouts/workouts.slice'
import useMediaQuery from '@/hooks/useMediaQuery'
import { TRootState, TStoreDispatch } from '@/store/store'
import { FileWithPath } from 'file-selector'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { type } from 'os'
import { string } from 'prop-types'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import * as Yup from "yup"

type Props = {}

const CreateWorkout = (props: Props) => {
    //#region : grabbing

    const dispatch: TStoreDispatch = useDispatch()
    const navigate = useNavigate()

    // responsiveness
    const isAboveMedium = useMediaQuery("(min-width:769px")


    //#endregion

    //#region : selectors
    const user = useSelector(getUser).user
    const workouts = useSelector((state: TRootState) => state.workout)

    //#endregion

    //#region : custom-declarations
    const [uploadedImage, setUploadedImage] = useState<FileWithPath>();
    const [uploadedVideo, setUploadedVideo] = useState<FileWithPath>();
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>()
    const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>()
    const [imagePer, setImagePer] = useState<number>(0)
    const [videoPer, setVideoPer] = useState<number>(0)
    const [imageFirebaseUploadSuccess, setImageFirebaseUploadSuccess] = useState<Boolean>(false)
    const [videoFirebaseUploadSuccess, setVideoFirebaseUploadSuccess] = useState<Boolean>(false)
    const [customWarning, setCustomWarning] = useState<string>("")
    const [overallWarning, setOverallWarning] = useState<boolean>();

    //#region : simple states
    const [previewData, setPreviewData] = useState<TSWorkout>({
        title: "",
        userId: user._id,
        comments: [],
        likes: [],
        category: ECategories.All,
        desc: "",
        dropset: false,
        imgUrl: "",
        videoUrl: "",
        reps: 0,
        sets: 0,
        focuses: [],
        superSetWith: []

    })

    const initialValues: TSWorkout = {
        title: "",
        userId: user._id,
        comments: [],
        likes: [],
        category: ECategories.All,
        desc: "",
        dropset: false,
        imgUrl: "",
        videoUrl: "",
        reps: 0,
        sets: 0,
        focuses: [],
        superSetWith: []

    }

    //#endregion

    //#region : loaders


    //#endregion

    //#endregion

    //#region : side-effects

    //#endregion

    //#region : functions
    const handleFormSubmit = async (
        values: TSWorkout,
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
        values.imgUrl = uploadedImageUrl!
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
        // await dispatch(createEvent(values));

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

    const customError = (msg: string) => {
        return <div className="text-red-900">{`* ${msg}`}</div>;
    };
    //#endregion

    // #region : formik specifics

    // #region : joi validation
    // YUP validation
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("title is a required field"),
        desc: Yup.string().required("description is a required field"),
        focuses: Yup.mixed<EFocuses>().oneOf(Object.values(EFocuses)),
        category: Yup.mixed<ECategories>().oneOf(Object.values(ECategories)),
        dropset: Yup.boolean().required("dropset is a required field."),
        sets: Yup.number().required("sets is a required field."),
        reps: Yup.number().required("reps is a required field."),
        superSetWith: Yup.array().of(Yup.string()),
    });

    // #endregion


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
    return (
        // wrapper
        <div className='flex gap-10 items-center m-auto sm:w-[70%] md:w-[80%]'>

            {/* form wrapper */}
            <div>
                <div
                    id="signup"
                    className=" basis-1/2 p-10 md:p-4 lg:text-sm text-xs h-[89vh] flex items-center lg:px-10 flex-1"
                >
                    {/* from  */}
                    <div className="w-full relative">

                        {/* title */}
                        <h1 className="text-[34px] mb-6 md:mb-4 text-center font-bold sticky top-[82px] bg-white">
                            Create Event
                        </h1>

                        {/* formik form */}
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
                                                    setPreviewData((prev: TSWorkout) => {
                                                        return { ...prev, title: e.target.value }
                                                    })
                                                }}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <ErrorMessage name={"title"}>{customError}</ErrorMessage>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

            {/* previewer */}
            {/* preview */}
            {
                isAboveMedium && (
                    <div>
                        <WorkoutPreviewCard sx='md:w-[250px]  lg:w-[300px]' item={previewData} />
                    </div>
                )
            }


        </div>
    )
}

export default CreateWorkout