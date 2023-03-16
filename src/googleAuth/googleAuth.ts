import { googleAuth } from "@/features/user/authSlice";
import { auth, provider } from "@/firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { TStoreDispatch } from "@/store/store";

type TProps = {
  dispatch: TStoreDispatch;
  isGoogleLoggingIn?: Boolean;
  setIsGoogleLoggingIn?: (value: React.SetStateAction<Boolean>) => void;
};

export const handleSignInWithGoogle = async ({
  dispatch,
  isGoogleLoggingIn,
  setIsGoogleLoggingIn,
}: TProps) => {
  signInWithPopup(auth, provider)
    .then(async (data) => {
      const user = data.user;
      // data prep
      const payload = {
        username: user.displayName
          ? user.displayName
          : user.email?.split("@")[0]!,
        fullname: user.displayName
          ? user.displayName
          : user.email?.split("@")[0]!,
        email: user.email!,
        gender: "prefernottosay",
        age: 18,
        image: user.photoURL!,
        isGoogleCreated: true,
      };

      // thunk google signin
      await dispatch(googleAuth(payload));
      isGoogleLoggingIn && setIsGoogleLoggingIn!(false);
    })
    .catch((err) => {
      console.log("google sign-in popup error:", err.message);
      isGoogleLoggingIn && setIsGoogleLoggingIn!(false);
    });
};
