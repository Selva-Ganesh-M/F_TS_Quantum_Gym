import FilledBtn, { EButtonType } from "@/components/shared/FilledBtn";
import OutlineBtn from "@/components/shared/OutlineBtn";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { FileWithPath, useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import useRootPageContext from "@/hooks/useRootPageContext";
import { ERootPageAction, ERootPages } from "@/context/RootPageContext";
import { useDispatch } from "react-redux/es/exports";
import { register } from "@/features/user/userSlice";
import { TStoreDispatch } from "@/store/store";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/firebase/firebase";


// TYPES
type Props = {};
export type TSignup = {
    fullName: string;
    userName: string;
    image: string;
    gender: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
};


// REACT.FC COMPONENT
const SignUp = (props: Props) => {
    // DECLARATIONS
    const dispatch: TStoreDispatch = useDispatch();
    const { state, dispatch: dispatchRootPageContext } = useRootPageContext({});

    // custom declarations
    const [overallWarning, setOverallWarning] = useState<boolean>();
    const [uploadedImage, setUploadedImage] = useState<FileWithPath>();
    const [imagePer, setImagePer] = useState<number>(0)
    const [imageFirebaseUploadSuccess, setImageFirebaseUploadSuccess] = useState<Boolean>(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>()
    const [customWarning, setCustomWarning] = useState<string>("")


    // #region - YUP validation

    // INITIAL STATE
    const initialValues: TSignup = {
        fullName: "",
        userName: "",
        image: "",
        gender: "choose",
        age: 18,
        email: "",
        password: "",
        confirmPassword: "",
    };

    //   YUP VALIDATION SCHEMA
    const validationSchema = yup.object().shape({
        fullName: yup.string().required("required field"),
        userName: yup.string().required("required field"),
        gender: yup.string().required("required"),
        age: yup.number().required("required").min(18, "must be 18 or above"),
        email: yup.string().email("invalid email").required("required"),
        password: yup
            .string()
            .required("required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        confirmPassword: yup
            .string()
            .required("required")
            .oneOf([yup.ref("password"), null], "Passwords must match"),
    });

    //#endregion

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

    // #region : side-effects
    useEffect(() => {
        dispatchRootPageContext({
            action: ERootPageAction.change,
            payload: ERootPages.signup,
        });
    }, []);

    useEffect(() => {
        uploadedImage && uploadFile(uploadedImage)
    }, [uploadedImage])

    useEffect(() => {
        if (imagePer === 100) {
            setImageFirebaseUploadSuccess(true)
        }
    }, [
        imagePer
    ])

    //#endregion

    //#region : functions
    //   CUSTOM ERROR MESSAGE
    const customError = (msg: string) => {
        return <div className="text-red-900">{`* ${msg}`}</div>;
    };

    //   FORM SUBMISSION HANDLER
    const handleFormSubmit = async (
        values: TSignup,
        { setSubmitting, resetForm }: any
    ) => {
        console.log("form submit func");

        if (!uploadedImageUrl && imagePer > 0) {
            setCustomWarning("Please wait until the image is being uploaded.")
        }

        if (!uploadedImage) {
            setCustomWarning("Please upload the image.")
        }

        if (!Object.values(values).every(Boolean)) {
            console.log(values);
            // showing common error on form for 500ms
            setOverallWarning(true);
            // hiding the error
            setTimeout(() => setOverallWarning(false), 500);
            return;
        }
        console.log(values);

        // updating state
        dispatch(register(values));
        console.log();

        // clean up
        // resetForm();
        setOverallWarning(false);
        setUploadedImage(undefined);
        return;
    };

    // handle firebase image upload
    const uploadFile = async (file: File) => {
        const storage = getStorage(app);
        const fileName = new Date().getDate() + file.name
        const storageRef = ref(storage, fileName);

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
                    setUploadedImageUrl(downloadURL)
                });
            }
        );
    }

    //#endregion

    //   JSX RETURN
    return (
        <div
            id="signup"
            className="basis-1/2 p-4 lg:text-sm text-xs h-[89vh] scrollbar-hide scroll overflow-y-scroll
      w-[90%] sm:w-[80%] mx-auto
      md: py-10 md:px-5 lg:px-10
      "
        >
            <h1 className="text-[34px] mb-2 text-center font-bold ">Sign Up</h1>
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
                    <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        {/* name flex */}
                        {/* <div className="flex gap-3"> */}
                        {/* USER NAME */}

                        <div className="basis-1/2">
                            <label htmlFor="userName" className="block ml-1">
                                User Name
                            </label>
                            <Field
                                type="string"
                                name="userName"
                                placeholder="enter username here..."
                                className="border-2 p-2 w-full text-gray-700"
                                value={values.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage name={"userName"}>{customError}</ErrorMessage>

                        {/* FULL NAME */}
                        <div className="basis-1/2">
                            <label htmlFor="fullName" className="block ml-1">
                                Full Name
                            </label>
                            <Field
                                type="string"
                                name="fullName"
                                placeholder="enter fullname here..."
                                className="border-2 p-2 w-full text-gray-700"
                                value={values.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage name={"fullName"}>{customError}</ErrorMessage>

                        {/* </div> */}

                        {/* age and gender */}
                        <div className="flex w-full gap-5">
                            {/* age */}

                            <div className="flex flex-col gap-2">
                                <div>
                                    <label htmlFor="age" className="block ml-1 mb-1">
                                        Age
                                    </label>
                                    <Field
                                        type="number"
                                        minimum="18"
                                        name="age"
                                        placeholder="enter age here..."
                                        className="border-2 p-2 w-full text-gray-700"
                                        value={values.age}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <ErrorMessage name={"age"}>{customError}</ErrorMessage>
                            </div>

                            {/* gender */}
                            <div className="flex flex-col gap-2">
                                <div>
                                    <label htmlFor="gender" className="block ml-1 mb-1">
                                        Gender
                                    </label>
                                    <Field
                                        as="select"
                                        name="gender"
                                        className="p-2 border-2"
                                        value={values.gender}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option value="">select</option>
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                        <option value="prefernottosay">prefer not to say</option>
                                    </Field>
                                </div>
                                <ErrorMessage name={"gender"}>{customError}</ErrorMessage>
                            </div>
                        </div>

                        {/* email */}

                        <div>
                            <label htmlFor="email" className="block">
                                Email
                            </label>
                            <Field
                                name="email"
                                type="email"
                                className="p-2 border-2 w-full"
                                placeholder="enter email here..."
                                autoComplete="off"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <ErrorMessage name={"email"}>{customError}</ErrorMessage>

                        {/* password flex */}

                        <div className="flex gap-3">
                            {/* password */}
                            <div className="flex basis-1/2 flex-col gap-2">
                                <div>
                                    <label htmlFor="password" className="block">
                                        Password
                                    </label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="p-2 border-2 w-full"
                                        placeholder="enter password here..."
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <ErrorMessage name={"password"}>{customError}</ErrorMessage>
                            </div>

                            {/* confirm password */}
                            <div className="flex basis-1/2 flex-col gap-2">
                                <div>
                                    <label htmlFor="password" className="block">
                                        Confirm Password
                                    </label>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        className="p-2 border-2 w-full"
                                        placeholder="confirm password here..."
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <ErrorMessage name={"confirmPassword"}>
                                    {customError}
                                </ErrorMessage>
                            </div>
                        </div>

                        {/* dropzone */}
                        <div className={`border-2 p-5 cursor-pointer ${imageFirebaseUploadSuccess ? "" : "border-red-600"}`}>
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
                                    <p className="absolute text-center w-[90%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                        {`${uploadedImage.name.substring(0, 30)}...`}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Overall warning */}
                        {overallWarning && (
                            <div className="text-center p-4 border-2 text-md bg-red-300 border-red-600">
                                {customWarning || "Please fill all the required fields"}
                            </div>
                        )}

                        {/* actions */}

                        <div className="flex justify-center md:justify-start">
                            <a className="mr-2">
                                <FilledBtn content={"Submit"} type={EButtonType.submit} />
                            </a>
                            <a
                                onClick={() => {
                                    setOverallWarning(false);
                                    resetForm();
                                }}
                            >
                                <OutlineBtn content={"Reset"} />
                            </a>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignUp;
