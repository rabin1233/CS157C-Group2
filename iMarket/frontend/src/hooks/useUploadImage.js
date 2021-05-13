import {useState} from 'react';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyBLYKqpoilQv8gzGhPmKUaROJUBJmHbNOE',
    authDomain: 'imarket-dc0d7.firebaseapp.com',
    databaseURL: 'gs://imarket-dc0d7.appspot.com',
    storageBucket: 'imarket-dc0d7.appspot.com'
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage().ref();

const metadata = {
    contentType: 'image/jpeg',
}

const useUploadImage = () => {
    const [images, setImages] = useState([]);
    const [progess, setProgess] = useState(0);

    const handleImageChange = async (e) => {
        const fileName = e.target.files[0].name.replace(/ /g, '');
        const uploadImage = storage.child('images/' + fileName).put(e.target.files[0], metadata);
        uploadImage.on(firebase.storage.TaskEvent.STATE_CHANGED, 
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgess(progress);
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                switch (error.code) {
                  case 'storage/unauthorized':
                    console.log(error)
                    break;
                  case 'storage/canceled':
                    console.log(error)
                    break;
                  case 'storage/unknown':
                    console.log(error)
                    break;
                }
              }, 
            () => {
            uploadImage.snapshot.ref.getDownloadURL().then((downloadUrl) => {
                setImages([...images, {
                    id: fileName,
                    url: downloadUrl
                }])
                setProgess(0);
            })
        })
    }

    const deleteImage = (id) => {
        var desertRef = storage.child(`images/${id}`);
        desertRef.delete().then(() => {
            setImages(images.filter(function(el) { return el.id != id }))
        }).catch((error) => {
            console.log(error);
        });
    }
    const clearImages = () => setImages([]);

    return {images, progess, handleImageChange, deleteImage, clearImages}
}


export default useUploadImage;

