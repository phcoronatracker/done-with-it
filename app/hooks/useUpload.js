/* eslint-disable no-undef */
import { useEffect } from "react";
import * as Permissions from "expo-permissions";

export default useUpload = () => {
    useEffect(() => {
        (async () => {
            try {
                const { granted, canAskAgain } = await Permissions.getAsync(Permissions.CAMERA_ROLL);

                if (!granted && !canAskAgain) alert("You need to enable permission to access the library!");
                if (!granted && canAskAgain) {
                    await Permissions.askAsync(Permissions.CAMERA_ROLL);
                }
            } catch (error) {
                console.log("Error getting permission for images", error);
            }
        })();
    }, []);
};
