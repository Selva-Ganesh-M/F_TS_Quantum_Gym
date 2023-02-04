import { googleAuth } from "@/features/user/authSlice";
import { auth, provider } from "@/firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { TStoreDispatch } from "@/store/store";


type TProps = {
    dispatch: TStoreDispatch
}

export const handleSignInWithGoogle = async ({dispatch}: TProps) => {
    signInWithPopup(auth, provider)
      .then((data) => {
        const user = data.user
        // data prep
        const payload = {
          username: user.displayName ? user.displayName : user.email?.split("@")[0]!,
          fullname: user.displayName ? user.displayName : user.email?.split("@")[0]!,
          email: user.email!,
          gender: "prefernottosay",
          age: 18,
          image: user.photoURL!,
          isGoogleCreated: true,
        };

        // thunk google signin
        dispatch(googleAuth(payload))
      })
      .catch((err) => {
        console.log("google sign-in popup error:", err.message);
      })
  }