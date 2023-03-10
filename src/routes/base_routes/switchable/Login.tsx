import { ERootPageAction, ERootPages } from "@/context/RootPageContext";
import useRootPageContext from "@/hooks/useRootPageContext";
import { useEffect } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import FilledBtn, { EButtonType } from "@/components/shared/FilledBtn";
import OutlineBtn from "@/components/shared/OutlineBtn";
import { googleAuth, login } from "@/features/user/authSlice";
import { useDispatch } from "react-redux";
import { TStoreDispatch } from "@/store/store"
import { auth, provider } from "@/firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import GoogleButton from "@/components/GoogleButton";
import { handleSignInWithGoogle } from "@/googleAuth/googleAuth";

type Props = {};

export type TLogin = {
  email: string;
  password: string;
};

const Login = (props: Props) => {
  // STATES DECLARATIONS
  const { state, dispatch: rootDispatch } = useRootPageContext({});
  const dispatch = useDispatch<TStoreDispatch>()

  // FUNCTIONS DECLARATIONS
  const customError = (msg: string) => {
    return <div className="text-red-900">{`* ${msg}`}</div>;
  };

  // SIDE EFFECTS
  useEffect(() => {
    rootDispatch({
      action: ERootPageAction.change,
      payload: ERootPages.login,
    });
  }, []);

  // FORMIK SPECIFICS
  const initialValues: TLogin = {
    email: "",
    password: "",
  };
  // YUP VALIDATION
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string()
      .required("required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  // SUBMIT FORM

  const handleFormSubmit = async (
    values: TLogin,
    { setSubmitting, resetForm }: any
  ) => {
    console.log(values);
    await dispatch(login(values))
    resetForm();
    return;
  };



  // JSX RENDERING
  return (
    <div
      id="signup"
      className="basis-1/2 p-10 md:p-4 lg:text-sm text-xs h-[89vh] flex items-center lg:px-10"
    >
      <div className="w-full">
        <h1 className="text-[34px] mb-6 md:mb-4 text-center font-bold">
          Log In
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
              {/* email */}
              <div className="mb-3">
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
              </div>

              {/* password */}
              <div className="mb-5">
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
              </div>

              {/* actions */}
              <div className="flex gap-4 justify-center">
                <FilledBtn type={EButtonType.submit} content="Login" />
                <OutlineBtn content="Reset" />
              </div>
              <div className="mt-5 flex justify-center hover:text-white ">
                <OutlineBtn className="hover:text-white" content={<GoogleButton />} onClick={() => handleSignInWithGoogle({ dispatch })} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
