import {useState, useContext} from 'react';
import MainLayout from "layout/MainLayout";
import axios from 'axios';
import {useHistory} from "react-router-dom";

import datacontext from 'context/data/datacontext';
import useUploadImage from 'hooks/useUploadImage';

const d = {
    title: '',
    description: '',
    price: 0,
    city: '',
    state: '',
    zip: '',
    phoneNumber: ''
}

const PostItem = (props) => {
    const [postObj, setPostObj] = useState(d);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const {addToList} = useContext(datacontext);
    
    const onChangeHandle = (e) => {
        setError('');
        setPostObj(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const history = useHistory();
    const {images,progess, handleImageChange, deleteImage, clearImages} = useUploadImage();

    const onSubmitHandle = async (e) => {
        e.preventDefault()
        const postData = {
            ...postObj,
            images: images,
        }
        try{
            const {data} = await axios.post('http://localhost:3001/products', postData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            })
            addToList(data.data);
            setSuccess('You Item has been posted for sale successfully.');
            setPostObj(d);
            clearImages();
            window.scrollTo(0, 0);
        }catch(e){
            console.log(e);
            setError("Something went wrong, please try again!")
        }
    }
     return (
        <MainLayout>
        <h2>Post your room description below </h2>
        {error && (
            <div className="alert alert-danger" role="alert" onClick={() => setError('')}>
                {error}
            </div>
        )}
        {success && (
            <div className="alert alert-success" role="alert" onClick={() => setSuccess('')}>
                {success}
            </div>
        )}
        
        <div style={{maxWidth: '700px', margin: '0 auto'}}>
            <form onSubmit={onSubmitHandle}>
                <FormControl id="title" label="Title" type="text" value={postObj.title} onChange={onChangeHandle}/>
                <FormControl id="description" label="Description" type="text" value={postObj.description} onChange={onChangeHandle}/>
                <FormControl id="price" label="Price" type="number" value={postObj.price} onChange={onChangeHandle}/>
                <FormControl id="city" label="City" type="text" value={postObj.city} onChange={onChangeHandle}/>
                <FormControl id="state" label="State" type="text" value={postObj.state} onChange={onChangeHandle}/>
                <FormControl id="zip" label="Zip" type="text" value={postObj.zip} onChange={onChangeHandle}/>
                <FormControl id="phoneNumber" label="Phone Number" type="number" value={postObj.phoneNumber} onChange={onChangeHandle}/>
                <input id="images" type="file" onChange={handleImageChange} /> 
                {progess > 0 && (
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{width: `${progess}%`}}>{progess.toFixed(0)}</div>
                    </div>
                )}
                {images.length > 0 && (
                    <div style={{display: "flex", flexWrap: 'wrap', justifyContent: 'space-evenly', margin: '10px 0 20px 0'}} onClick={(e) => e.stopPropagation()}>
                    {images.map((a) => (
                        <ImageCard  src={a.url} onClick={() => deleteImage(a.id)} key={a.id}/>
                    ))}
                </div>
                )}
                <div style={{width: '100%', margin: '10px 0'}}>
                    <button className="btn btn-success" type="submit">Post it now</button>
                </div>
                
            </form>
        </div>

    </MainLayout>
    )
}

export default PostItem;

const FormControl = ({id, label, type, value, onChange, errorText}) => {
    return(
        <div className="mb-3">
            <label className="form-label" htmlFor={id}>{label}</label>
            <input className="form-control" type={type} id={id} value={value} onChange={onChange} min="0"/>
            {errorText && <lable>error message</lable>}
        </div>
    )
}

const ImageCard = ({src, onClick}) => {
    return(
        <div className="post_image_card"> 
            <img src={src} className="card-img-top" style={{width: '18rem', height: '13rem', objectFit: 'cover'}}/>
            <button onClick={onClick} className="image_remove" type="button">Remove</button>
        </div>
    )
}
