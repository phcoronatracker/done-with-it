/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import * as firebase from "firebase";
import firebaseConfig from "../config/firebase";

export default useFirebase = (URIs) => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

    const storage = firebase.app().storage("gs://done-with-it-photos.appspot.com");
    const storageRef = storage.ref();
    const metadata = {
        contentType: "image/jpg",
    };

    const getLastSegment = (uri) => {
        const parts = uri.split("/");
        const last = parts.pop() || parts.pop();
        return last;
    };

    const uploadImage = async () => {
        const imageURis = await Promise.all(
            URIs.map(async (image) => {
                const res = await fetch(image);
                const blob = await res.blob();

                const last = getLastSegment(image);
                const ref = storageRef.child(`images/${last}`);

                const result = await ref.put(blob, metadata);
                console.log("Uploaded");

                const download = await ref.getDownloadURL();
                console.log("Downloaded");
                return download;
            })
        );
        return imageURis;
    };

    return { uploadImage };
};
