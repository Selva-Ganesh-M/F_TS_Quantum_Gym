import { app } from "@/firebase/firebase";
import { deleteObject, getStorage, ref } from "firebase/storage";

const storage = getStorage(app);
export const deleteImg = async (refUrl: string) => {
  const imageRef = ref(storage, refUrl);
  await deleteObject(imageRef);
  console.log("file deleted");
};

export const deleteVideo = async (refUrl: string) => {
  const videoRef = ref(storage, refUrl);
  await deleteObject(videoRef);
  console.log("file deleted");
};
