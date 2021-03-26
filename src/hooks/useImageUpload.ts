import {useState} from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase'

import {storage} from '../firebase/firebaseConfig'

type ImageURL = string | ArrayBuffer | null

const useImageUpload = () => {
    const firebase = useFirebase()
    const auth = useSelector(
        (state: RootStateOrAny) => state.firebase.auth
    );
    const [image, setImage] = useState<File>();
    const [imageUrl, setImageUrl] = useState<ImageURL>(null)
    const [previewImage, setPreviewImage] = useState<ImageURL>(null)

    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            const reader = new FileReader()
            reader.onload = () => setPreviewImage(reader.result)
            reader.readAsDataURL(e.target.files[0])
            setImage(e.target.files[0]);
        }
    };

    const saveImageToFirebase = (location: 'avatar' | 'posts') => {
        if (image !== (null || undefined)) {
            const uploadTask = storage
                .ref(`/${auth.uid}/${location}/${image.name}`)
                .put(image);
    
            uploadTask.on('state_changed', (snapShot) => {
                console.log(snapShot)
            }, (error) => {
                console.error(error)
            }, () => {
                storage.ref(`${auth.uid}/${location}`).child(image.name)
                    .getDownloadURL()
                    .then((firebaseUrl) => {
                        setImageUrl(firebaseUrl)
                        if (location === "avatar") {
                            firebase.updateAuth({
                                photoURL: firebaseUrl
                            })
                            firebase.updateProfile({
                                photoURL: firebaseUrl,
                            });
                            setPreviewImage('')
                        }
                    })
            })
            return imageUrl
        };
    }
    return { handleImageInput, saveImageToFirebase, previewImage, imageUrl };
}

export default useImageUpload