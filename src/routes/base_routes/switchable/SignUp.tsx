import FilledBtn from "@/components/shared/FilledBtn";
import OutlineBtn from "@/components/shared/OutlineBtn";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDropzone, Accept } from "react-dropzone";
import { useCallback } from "react";

type Props = {};

type TSignup = {
  fullName: string;
  userName: string;
  image: string;
  gender: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = (props: Props) => {
  // INITIAL STATE
  const initialValues: TSignup = {
    fullName: "",
    userName: "",
    image: "",
    gender: "",
    age: 0,
    email: "",
    password: "",
    confirmPassword: "",
  };

  //   YUP VALIDATION SCHEMA
  const validationSchema = yup.object().shape({
    fullName: yup.string().required("full name is a required field"),
    userName: yup.string().required("user name is a required field"),
    image: yup.string().required("required"),
    gender: yup.string().required("required"),
    age: yup.number().required("required"),
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
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  //   FORM SUBMISSION HANDLER
  const handleFormSubmit = async (
    values: TSignup,
    { setSubmitting, resetForm }: any
  ) => {
    console.log(values);
    resetForm();
    return;
  };

  // DROPZONE PREP

  const onDrop = useCallback((acceptedFiles: Array<any>) => {
    // had to use any cause I can't find the types
    console.log(acceptedFiles);
  }, []);

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
  });

  //   CUSTOM ERROR MESSAGE
  const customError = (msg: string) => {
    return <div className="text-red-900">{`* ${msg}`}</div>;
  };

  //   JSX RETURN
  return (
    <div id="signup" className="basis-1/2 p-4 lg:text-sm text-xs ">
      <h1 className="text-[34px] mb-2 text-center font-bold">Sign Up</h1>
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

            {/* {touched.userName && errors.userName && (
              <div className="text-red-900">hello</div>
            )} */}
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
            <div className="border-2 p-5 cursor-pointer">
              <div
                {...getRootProps()}
                className="h-14 relative border-dashed border-2"
              >
                <input {...getInputProps()} className="h-full w-full " />
                {isDragAccept && <p>All files will be accepted</p>}
                {isDragReject && <p>Some files will be rejected</p>}
                {!isDragActive && (
                  <p className="absolute text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    Drop some files here ...
                  </p>
                )}
                <p></p>
              </div>
            </div>

            {/* actions */}

            <div className="flex">
              <a className="mr-10">
                <FilledBtn content={"Submit"} />
              </a>
              <OutlineBtn content={"Reset"} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
