import EventSearchCard from '@/components/cards/EventSearchCard'
import WorkoutPreviewCard from '@/components/cards/WorkoutPreviewCard'
import WorkoutsSearchCard from '@/components/cards/WorkoutsSearchCard'
import { ECategories, EFocuses } from '@/components/headers/MyWorkoutsHeader'
import SrcEventLoader from '@/components/loaders/SrcEventLoader'
import FilledBtn, { EButtonType } from '@/components/shared/FilledBtn'
import OutlineBtn from '@/components/shared/OutlineBtn'
import { TPComment } from '@/features/comments/comment.slice'
import { getUser } from '@/features/user/authSlice'
import { create, search, selectAllWorkouts, TSWorkout } from '@/features/workouts/workouts.slice'
import { app } from '@/firebase/firebase'
import useMediaQuery from '@/hooks/useMediaQuery'
import { TRootState, TStoreDispatch } from '@/store/store'
import { FileWithPath } from 'file-selector'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { type } from 'os'
import { string } from 'prop-types'
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { AiOutlineClose } from 'react-icons/ai'
import { BiCaretDown } from 'react-icons/bi'
import { BsFilterRight } from 'react-icons/bs'
import { FaCross } from 'react-icons/fa'
import { MdOutlineFilterAlt } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { TiTickOutline } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import * as Yup from "yup"
import { notFound } from '../events/EventsPage'

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
    const workoutState = useSelector((state: TRootState) => state.workout)
    const workouts = useSelector(selectAllWorkouts)

    //#endregion

    // #region : refs
    const supersetInputRef = useRef<HTMLInputElement | null>(null)
    const titleRef = useRef<HTMLInputElement | null>(null)
    // #endregion

    //#region : custom-declarations

    // #region : formik form data declarations
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
    const [selectedSupersetWorkout, setSelectedSupersetWorkout] = useState({
        name: "-- select --",
        id: ""
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

    // #endregion

    //#region : simple states

    const [isCatOpen, setIsCatOpen] = useState<Boolean>(false)
    const [isFocusOpen, setIsFocusOpen] = useState<Boolean>(false)
    const [isDropset, setIsDropset] = useState<boolean>(false)
    const [isSuperSetOpen, setIsSuperSetOpen] = useState<Boolean>(false)
    const [src, setSrc] = useState<string>("")

    const [preview, setPreview] = useState<TSWorkout>({
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


    //#endregion

    //#region : loaders
    const [isSubmittin, setIsSubmittin] = useState(false)

    //#endregion

    // #region : focuses and categories
    const [focuses, setFocuses] = useState<Array<EFocuses>>([
        EFocuses.Wings,
        EFocuses.Hamstrings,
        EFocuses.Calves,
        EFocuses.Chest,
        EFocuses.Back,
        EFocuses.Shoulders,
        EFocuses.Triceps,
        EFocuses.Biceps,
        EFocuses.Forearms,
        EFocuses.Trapezius,
        EFocuses.Abs,
    ])
    const [selectedFocuses, setSelectedFocuses] = useState<Array<EFocuses>>([])

    const [categories, setCategories] = useState<ECategories[]>([
        ECategories.All,
        ECategories.Push,
        ECategories.Pull,
        ECategories.Legs,
    ])

    const [selectedCategory, setSelectedCategory] = useState<ECategories>(ECategories.All)

    // #endregion

    //#endregion

    //#region : side-effects

    // #region : initial effects

    useEffect(() => {
        titleRef.current?.focus()
        return () => {
        }
    }, [])


    // #endregion

    // fetch whenever src has value
    useEffect(() => {

        // don't execute if the search is set as empty
        if (src) {
            // fetch data
            (async () => {
                dispatch(search({ src, mine: "" }))
            })()
        }
    }, [src])

    // set focuses list in preview data whenever the focus list changes
    useEffect(() => {
        setPreview(prev => {
            return { ...prev, focuses: selectedFocuses }
        })
    }, [selectedFocuses])

    // set categories in preview data whenever the category changes
    useEffect(() => {
        setPreview(prev => {
            return { ...prev, category: selectedCategory }
        })
    }, [selectedCategory])

    // upload image file
    useEffect(() => {
        console.log("side effect");
        console.log(uploadedImage);
        uploadedImage && uploadFileI(uploadedImage)
    }, [uploadedImage])

    // upload video file
    useEffect(() => {
        uploadedVideo && uploadFileV(uploadedVideo)
    }, [uploadedVideo])



    //#endregion

    //#region : functions

    const handleFormSubmit = async (
        values: TSWorkout,
        { setSubmitting, resetForm }: any
    ) => {

        setIsSubmittin(true)

        // assigning values from form in other forms
        values.focuses = selectedFocuses.map(item => item.toLowerCase())
        values.dropset = isDropset
        if (selectedSupersetWorkout.id) {
            values.superSetWith = [selectedSupersetWorkout.id]
        }
        // values.

        // assigning values not obtained from the form


        console.log("form submit func");
        console.log(values)

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

        if (!uploadedVideoUrl) {
            setCustomWarning("Please upload the video.")
            setOverallWarning(true)
            setTimeout(() => {
                setCustomWarning("")
                setOverallWarning(false)
            }, 3000)
            setIsSubmittin(false)
            return
        }

        values.imgUrl = uploadedImageUrl!
        values.videoUrl = uploadedVideoUrl!
        values.userId = user._id

        // if (!Object.values(values).every(Boolean)) {
        //     console.log(values);
        //     // showing common error on form for 500ms
        //     setOverallWarning(true);
        //     // hiding the error
        //     setTimeout(() => setOverallWarning(false), 3000);
        //     setIsSubmittin(false)
        //     return;
        // }
        // console.log(values);


        // updating state
        await dispatch(create(values));

        // clean up
        resetForm();
        setOverallWarning(false);
        setUploadedImage(undefined);
        setUploadedVideo(undefined);
        setImagePer(0)
        setVideoPer(0)
        setImageFirebaseUploadSuccess(false)
        setVideoFirebaseUploadSuccess(false)
        setUploadedImageUrl("")
        setUploadedVideoUrl("")
        setCustomWarning("")
        setOverallWarning(false)
        setIsSubmittin(false)
        navigate("/home/my_workouts")
    };

    const customError = (msg: string) => {
        return <div className="text-red-900">{`* ${msg}`}</div>;
    };

    // remove selected items from focus filter
    const removeFromFocusFilter = (item: EFocuses) => {
        if (!selectedFocuses.includes(item)) {
            return
        }
        setSelectedFocuses((prev) => {
            return prev.filter(focus => focus !== item)
        })
    }

    // add items to focus filter
    const addItemsToFocusFilter = (item: EFocuses) => {
        if (selectedFocuses.includes(item)) {
            return
        }
        setSelectedFocuses(prev => {
            return [...prev, item]
        })
    }


    //#endregion

    // #region : formik specifics

    // #region : Yup validation
    // YUP validation
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("title is a required field"),
        desc: Yup.string().required("description is a required field"),
        sets: Yup.number().integer().required("sets is a required field.").min(1, "minimum value is 1.").max(8, "max value is 8"),
        reps: Yup.number().integer().required("reps is a required field.").min(1, "minimum value is 1.").max(30, "max value is 30"),
    });

    // #endregion

    //#region : dropzone

    // DROPZONE PREP - image
    const onDropI = useCallback((acceptedFiles: Array<FileWithPath>) => {
        // had to use any cause I can't find the types
        setUploadedImage(acceptedFiles[0]);
        console.log(acceptedFiles);
    }, []);

    // USE DROPZONE - image
    const {
        getRootProps: getRootPropsI,
        getInputProps: getInputPropsI,
        isDragActive: isDragActiveI,
        isDragAccept: isDragAcceptI,
        isDragReject: isDragRejectI,
    } = useDropzone({
        onDrop: onDropI,
        accept: {
            "image/*": [".jpeg", ".png"],
        },
        multiple: false,
    });

    // DROPZONE PREP - video
    const onDropV = useCallback((acceptedFiles: Array<FileWithPath>) => {
        // had to use any cause I can't find the types
        setUploadedVideo(acceptedFiles[0]);
        console.log(acceptedFiles);
    }, []);

    // USE DROPZONE - video
    const {
        getRootProps: getRootPropsV,
        getInputProps: getInputPropsV,
        isDragActive: isDragActiveV,
        isDragAccept: isDragAcceptV,
        isDragReject: isDragRejectV,
    } = useDropzone({
        onDrop: onDropV,
        accept: {
            "video/*": [".mp4", ".mkv", ".avi"],
        },
        multiple: false,
    });

    //#endregion

    // #region : file upload

    // handle firebase image upload
    const uploadFileI = async (file: File) => {
        const storage = getStorage(app);
        const fileName = new Date().toString() + file.name
        const storageRef = ref(storage, "workoutImages/" + fileName);

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
                console.log("error", error.message);

            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFirebaseUploadSuccess(true)
                    setUploadedImageUrl(downloadURL)
                    setPreview(prev => {
                        return { ...prev, imgUrl: downloadURL }
                    })
                });
            }
        );
    }
    // handle firebase video upload
    const uploadFileV = async (file: File) => {
        const storage = getStorage(app);
        const fileName = new Date().toString() + file.name
        const storageRef = ref(storage, "workoutVideos/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setVideoPer(progress)
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
                    setVideoFirebaseUploadSuccess(true)
                    setUploadedVideoUrl(downloadURL)
                    setPreview(prev => {
                        return { ...prev, videoUrl: downloadURL }
                    })
                });
            }
        );
    }

    // #endregion

    // #endregion

    //jsx rendering
    return (
        // form wrappper + image
        <div className='relative flex items-center justify-center'>
            <div className='flex gap-10 items-center w-full xs:w-[90%] sm:w-[70%] md:w-[80%] lg:w-[70%]'>

                {/* form wrapper */}
                <div className='flex-1 w-[95%] h-[calc(100vh-72px)] overflow-scroll'>
                    <div
                        id="signup"
                        className=" basis-1/2 px-10 pb-10 md:px-4 lg:text-sm text-xs flex items-center lg:px-10 flex-1"
                    >
                        {/* from  */}
                        <div className="w-full">

                            {/* title */}
                            <div className='text-[26px] xs:text-[34px] mb-6 md:mb-4 text-center font-bold sticky top-[0px] pt-6 pb-4 shadow-sm bg-white z-[995]'>
                                Create Workout
                            </div>

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
                                                    innerRef={(el: HTMLInputElement) => {
                                                        titleRef.current = el
                                                    }}
                                                    className="p-2 border-2 w-full"
                                                    placeholder="enter title here..."
                                                    autoComplete="off"
                                                    value={values.title}
                                                    onChange={(e: any) => {
                                                        handleChange(e)
                                                        setPreview((prev: TSWorkout) => {
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
                                                        setPreview((prev: TSWorkout) => {
                                                            return { ...prev, desc: e.target.value }
                                                        })
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            <ErrorMessage name={"desc"}>{customError}</ErrorMessage>
                                        </div>

                                        {/* filters flex */}
                                        <div className='flex flex-col sm:flex-row gap-4'>

                                            {/* categories filter */}
                                            <div className='w-[150px] bg-white p-2 relative border-2 flex justify-center items-center'>

                                                {/* selected category */}
                                                <div
                                                    className='w-full cursor-pointer flex gap-2 items-center'
                                                    onClick={() => {
                                                        setIsCatOpen(prev => !prev)
                                                    }}>
                                                    <MdOutlineFilterAlt />
                                                    <span>
                                                        {selectedCategory === ECategories.All ? "Combo" : selectedCategory}
                                                    </span>
                                                </div>

                                                {/* hr and available options */}
                                                {/* show available options only when it got clicked */}
                                                {
                                                    isCatOpen && (
                                                        <div>
                                                            {/* hr */}
                                                            <hr className='translate-y-[0.45rem]' />

                                                            {/* available options */}
                                                            <div className='absolute w-full bg-white top-10 left-0 shadow-md z-[49]'>
                                                                {/* options */}
                                                                {
                                                                    categories.map((cat, index) => {
                                                                        return cat === selectedCategory ? <React.Fragment key={index}></React.Fragment> : (
                                                                            <div
                                                                                key={index}
                                                                                className={'w-full p-2 cursor-pointer hover:bg-teal-50'}
                                                                                onClick={() => {
                                                                                    setSelectedCategory(cat)
                                                                                    // manually setting the value
                                                                                    setFieldValue("category", cat)
                                                                                    // close the board
                                                                                    setIsCatOpen(false)
                                                                                }}
                                                                            >{cat}</div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                            </div>

                                            {/* focus filter */}
                                            <div className='w-full xs:w-[250px] sm:w-[280px] bg-white flex items-center border-2'>
                                                {/* previewer */}
                                                <div className=' flex-[10] relative h-10 '>
                                                    {/* placholder for absolute floater */}
                                                    <div className=''>
                                                    </div>

                                                    {/* floating */}
                                                    <div
                                                        className={
                                                            `absolute top-0 left-0 bg-white min-w-full z-[30]
                            ${isFocusOpen && "shadow-md"}
                    `
                                                        }>
                                                        {/* selected items previewer */}
                                                        <div
                                                            className={`w-full overflow-y-scroll flex flex-wrap p-2 pt-[0.60rem] gap-3 transition-all
                            ${isFocusOpen ? "max-h-[101.6px]" : "max-h-[38.4px]"}
                            `}>
                                                            {
                                                                selectedFocuses.length > 0 ? (selectedFocuses.map((focus, index) => (
                                                                    <div key={index} className='w-max h-max px-2 border-2 border-teal-200 bg-teal-50 rounded-lg flex items-center gap-2'>
                                                                        <span className='text-xs'>{focus}</span>
                                                                        <AiOutlineClose size={10} className="cursor-pointer" onClick={() => removeFromFocusFilter(focus)} />
                                                                    </div>
                                                                ))) : (
                                                                    <div
                                                                        className='flex gap-3 items-center'>
                                                                        <BsFilterRight size={20} className="cursor-pointer" onClick={() => { }} />
                                                                        <span>filter by target muscles</span>
                                                                    </div>
                                                                )
                                                            }

                                                        </div>


                                                        {/* line break & available options */}
                                                        {
                                                            isFocusOpen && (
                                                                <>
                                                                    {/* line break */}
                                                                    <hr className='mt-2 w-[90%] m-auto' />

                                                                    {/* available options */}
                                                                    <div className={`max-h-[180px] overflow-y-scroll transition-all`}>
                                                                        {
                                                                            focuses.map((focus, index) => (
                                                                                <div
                                                                                    key={index}
                                                                                    className={`text-sm cursor-pointer ${selectedFocuses.includes(focus) && "border-l-4 border-teal-500"} w-full p-2 hover:bg-teal-50 `}
                                                                                    onClick={() => {
                                                                                        if (selectedFocuses.includes(focus)) {
                                                                                            removeFromFocusFilter(focus)
                                                                                            return
                                                                                        }
                                                                                        addItemsToFocusFilter(focus)
                                                                                    }}
                                                                                >

                                                                                    {focus}
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    </div>

                                                </div>

                                                {/* seperator bar */}
                                                <div className='border-l-2 h-[20px]'></div>

                                                {/* toggle caret icon */}
                                                <div className='flex-[1] ml-2 cursor-pointer' onClick={() => {
                                                    setIsFocusOpen(prev => !prev)
                                                }}>
                                                    {/* {
                    isFocusOpen ? <BiCaretUp /> : <BiCaretDown />
                } */}
                                                    <BiCaretDown
                                                        className={`
                transition-all
                ${isFocusOpen && "rotate-180"}
                `}
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        {/* dropset */}
                                        <div className='flex gap-3 items-center mt-3'>
                                            {/* question */}
                                            <label htmlFor="dropset">Dropset ? </label>

                                            {/* yes */}
                                            <div className=' flex items-center gap-2'>
                                                <label htmlFor="dropset">Yes</label>

                                                {/* always show the box */}
                                                <div className='w-3 h-3 relative border-2' onClick={() => {
                                                    setIsDropset(prev => true)
                                                    setPreview((prev) => {
                                                        return { ...prev, dropset: true }
                                                    })
                                                }}>
                                                    {
                                                        // show the tick only if the yes if selected
                                                        isDropset && (
                                                            <TiTickOutline />
                                                        )
                                                    }
                                                </div>
                                            </div>

                                            {/* no */}
                                            <div className=' flex items-center gap-2'>
                                                <label htmlFor="dropset">No</label>
                                                <div className='w-3 h-3 relative border-2' onClick={() => {
                                                    setIsDropset(prev => false)
                                                    setPreview((prev) => {
                                                        return { ...prev, dropset: false }
                                                    })
                                                }}>
                                                    {
                                                        !isDropset && <TiTickOutline />
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        {/* sets + reps */}
                                        <div className=' flex gap-3 mt-3'>

                                            {/* sets */}
                                            <div className="mb-3">
                                                <div>
                                                    <label htmlFor="sets" className="block">
                                                        Sets
                                                    </label>
                                                    <Field
                                                        name="sets"
                                                        type="number"
                                                        className="p-2 border-2 w-full"
                                                        placeholder="eg.4"
                                                        autoComplete="off"
                                                        value={values.sets}
                                                        onChange={(e: any) => {
                                                            handleChange(e)
                                                            setPreview((prev: TSWorkout) => {
                                                                return { ...prev, sets: e.target.value }
                                                            })
                                                        }}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                                <ErrorMessage name={"sets"}>{customError}</ErrorMessage>
                                            </div>

                                            {/* reps */}
                                            <div className="mb-3">
                                                <div>
                                                    <label htmlFor="reps" className="block">
                                                        Reps
                                                    </label>
                                                    <Field
                                                        name="reps"
                                                        type="number"
                                                        className="p-2 border-2 w-full"
                                                        placeholder="eg.15"
                                                        autoComplete="off"
                                                        value={values.reps}
                                                        onChange={(e: any) => {
                                                            handleChange(e)
                                                            setPreview((prev: TSWorkout) => {
                                                                return { ...prev, reps: e.target.value }
                                                            })
                                                        }}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                                <ErrorMessage name={"reps"}>{customError}</ErrorMessage>
                                            </div>
                                        </div>

                                        {/* super set with */}
                                        <div className='flex items-center gap-3'>
                                            <label htmlFor="superSetWith">super set with:</label>

                                            {/* functionality wrapper */}
                                            <div className='flex-1 border-2 p-2 max-w-[300px]'>
                                                {/* selected workout */}
                                                <div className='flex justify-between items-center'>
                                                    <div>
                                                        {selectedSupersetWorkout.name.substring(0, 35)}
                                                    </div>
                                                    <BiCaretDown
                                                        className='cursor-pointer'
                                                        onClick={() => {
                                                            // blurring the background
                                                            setIsSuperSetOpen(true)
                                                            // focusing the search field
                                                            supersetInputRef.current?.focus()

                                                        }} />
                                                </div>

                                                {/* list of wokouts */}
                                                {/* coded at the end of the page */}
                                            </div>
                                        </div>

                                        {/* dropzone flex */}
                                        <div className='flex flex-col gap-3 mt-5'>

                                            {/* thumbnail dropzone */}
                                            <div className='flex flex-col gap-2'>
                                                <span>Upload cover image:</span>
                                                <div className={`border-2 flex-1 mb-3 p-5 cursor-pointer ${uploadedImageUrl && "border-green-600"}`}>
                                                    <div
                                                        {...getRootPropsI()}
                                                        className="h-14 relative border-dashed border-2"
                                                    >
                                                        <div {...getInputPropsI()} className="h-full w-full " />
                                                        {isDragAcceptI && (
                                                            <p className="absolute text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                                                All files will be accepted
                                                            </p>
                                                        )}
                                                        {isDragRejectI && (
                                                            <p className="absolute text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                                                Some files will be rejected
                                                            </p>
                                                        )}
                                                        {!uploadedImage && !isDragActiveI && (
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
                                            </div>

                                            {/* video dropzone */}
                                            <div className='flex flex-col gap-2'>
                                                <span>Upload workout video:</span>
                                                <div className={`border-2 flex-1 mb-3 p-5 cursor-pointer ${uploadedVideoUrl && "border-green-600"}`}>
                                                    <div
                                                        {...getRootPropsV()}
                                                        className="h-14 relative border-dashed border-2"
                                                    >
                                                        <div {...getInputPropsV()} className="h-full w-full " />
                                                        {isDragAcceptV && (
                                                            <p className="absolute text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                                                All files will be accepted
                                                            </p>
                                                        )}
                                                        {isDragRejectV && (
                                                            <p className="absolute text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                                                Some files will be rejected
                                                            </p>
                                                        )}
                                                        {!uploadedVideo && !isDragActiveV && (
                                                            <p className="absolute text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                                                Drop your video here ...
                                                            </p>
                                                        )}
                                                        {uploadedVideo && (
                                                            <>
                                                                <p className="absolute text-center w-[90%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                                                    {`${uploadedVideo.name.substring(0, 30)}...`}{"  "}{videoPer > 0 ? videoPer : null}%
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Overall warning */}
                                        {overallWarning && (
                                            <div className="text-center p-4 border-2 text-md bg-red-300 border-red-600 mb-3">
                                                {customWarning || "Please fill all the required fields"}
                                            </div>
                                        )}

                                        {/* actions */}
                                        <div className='mt-5'>
                                            <div className="flex justify-center md:justify-start">
                                                <a className="mr-2">
                                                    {
                                                        // condition deciding whether to show loading or normal button

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
                                                            onClick={() => {
                                                                console.log("clicked");

                                                            }}
                                                        />
                                                    }
                                                </a>
                                                <a
                                                    onClick={() => {
                                                        setOverallWarning(false);
                                                        resetForm()
                                                        setUploadedImage(undefined)
                                                        setUploadedVideo(undefined)
                                                        setSelectedFocuses([])
                                                        setSelectedSupersetWorkout({
                                                            name: "-- select --",
                                                            id: ""
                                                        })
                                                        setSelectedCategory(ECategories.All)
                                                        setPreview({
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
                                                        setUploadedImageUrl("")
                                                        setUploadedVideoUrl("")
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
                </div>

                {/* preview */}
                {
                    isAboveMedium && (
                        <div>
                            <WorkoutPreviewCard sx='md:w-[250px]  lg:w-[300px]' item={preview} />
                        </div>
                    )
                }

                {/* overlay */}
                {
                    isSuperSetOpen && (
                        <div className='absolute w-full h-full bg-gray-900 opacity-75 z-[39] left-0'></div>
                    )
                }

                {/* super set search */}
                {
                    isSuperSetOpen && (
                        <div className='flex gap-2 items-center absolute top-[5%] left-[50%] translate-x-[-50%] z-[50]'>
                            <div className='relative'>


                                {/* search bar */}
                                <div className='relative'>

                                    {/* input */}
                                    <input
                                        ref={el => {
                                            console.log(el);
                                            supersetInputRef.current = el
                                            console.log("inside ref - current: ", supersetInputRef.current);
                                            supersetInputRef.current?.focus();

                                        }}
                                        type="text"
                                        value={src}
                                        onChange={((e) => setSrc(e.target.value))}
                                        placeholder='eg. Quantum wars'
                                        className={`px-2 py-2 w-[280px] sm:w-[325px] focus:outline-none`} />

                                    {/* close button */}
                                    <div className='absolute top-[-25px] right-[-23px] z-40 h-[25px] w-[25px] rounded-full bg-red-500 flex items-center justify-center'>
                                        <RxCross2 size={20} className={"cursor-pointer"} onClick={() => setIsSuperSetOpen(false)} />
                                    </div>

                                </div>



                                {/* src results */}
                                {
                                    src.length > 0 && (
                                        <div className='w-full  absolute bg-pink-50 bg-opacity-0 top-14 rounded-lg '>

                                            {/* header */}
                                            <div className={`sticky top-0 p-3 text-white ${workoutState.isWorkoutsLoading ? "bg-white opacity-[0.95]" : "bg-pink-800"} z-[49] my-3 rounded-lg`} >
                                                {
                                                    workoutState.isWorkoutsLoading ? (
                                                        <div role="status" className='flex justify-center' >
                                                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                            </svg>
                                                        </div>
                                                    ) : (
                                                        `Found: ${workouts.length} results`
                                                    )
                                                }
                                            </div>

                                            {/* content */}
                                            <div className='relative max-h-[405px] overflow-y-scroll flex flex-col gap-3 rounded-lg'>
                                                {/* src results */}
                                                {
                                                    workoutState.isWorkoutsLoading ? (
                                                        <>
                                                            <SrcEventLoader />
                                                            <SrcEventLoader />
                                                            <SrcEventLoader />
                                                        </>
                                                    ) : (
                                                        workouts.length > 0 ? (
                                                            workouts.map(item => (
                                                                <WorkoutsSearchCard item={item} key={item._id} onClick={(e) => {
                                                                    setSelectedSupersetWorkout({
                                                                        name: item.title,
                                                                        id: item._id
                                                                    })
                                                                    setIsSuperSetOpen(false)
                                                                    setPreview((prev) => {
                                                                        return { ...prev, superSetWith: [item.title] }
                                                                    })
                                                                }} />
                                                            ))
                                                        ) : (
                                                            <div className='bg-white p-3 flex flex-col justify-center'>
                                                                <img src={notFound} alt="" />
                                                                <span className='m-auto text-sm'>Try searching for other keywords</span>
                                                            </div>
                                                        )
                                                    )
                                                }

                                            </div>

                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default CreateWorkout