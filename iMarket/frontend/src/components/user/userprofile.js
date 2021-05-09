import "../../assets/common.css";
import React from 'react' ;
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import { Row,Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import MainLayout from '../../layout/MainLayout';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import DefaultPic from '../../default.png';


class userprofile extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            username:this.props.username,
            email:this.props.email,
            profileImage:this.props.profileImage,
            uploadedFile:null
        }
    }

    // fetchUserDetails=(email)=>{
    //    // console.log(email);
    //     axios.get("http://localhost:5000/user",{
    //         headers: {
    //             "content-type": "application/json"
    //           }
    //     }).then(res=>{
    //         //console.log(res);
    //         this.setState({email:res.data.results[0].email});
    //         console.log(email);

    //         // this.setState({profileImage:res.data.results[0].profileImage})
    //     })
    //     .catch(err=>console.log(err))
    // }

    changeProfileImage=(event)=>{
       
        this.setState({uploadedFile:event.target.files[0]});
    }
  
    UpdateProfileHandler=(e)=>{
        e.preventDefault();
        //create object of form data
        const formData=new FormData();
        formData.append("profileImage",this.state.uploadedFile);

        //update-profile
        axios.post("http://localhost:5000/userapi/update-profile/",formData,{
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
           this.setState({msg:res.data.message});
           this.setState({profileImage:res.data.results.profileImage});
        })
        .catch(err=>console.log(err))
    }

    render(){

        if(this.state.profileImage){
            var imagestr=this.state.profileImage;
            imagestr = imagestr.replace("public/", "");
            var profilePic="http://localhost:3001/";
        }else{
             profilePic=DefaultPic;
        }
    return (
        <MainLayout> 

            {/* <form action ="/" > */}
                <div className = "form_container">
                <Col>
                <h1> User Profile </h1>
                </Col>
                
                <Col>
                <img src={profilePic} alt="profils pic" />
                </Col>
                <Row>
                {/* {message && (
                    <div className="alert alert-success" role="alert" onClick={() => setMessage('')}>
                        {message}
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger" role="alert" onClick={() => setError('')}>
                        {error}
                    </div>
                )} */}
                <Col>
                <FormInput 
                    label="User Name"
                    username="username"
                    type="text"
                    placeholder="Enter your Name"
                    value={this.state.username}   
                />
                <FormInput 
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Your Email Address"
                    value={this.state.email}
                />

                <FormInput 
                    label="Contact Info"
                    username="contact"
                    type="text"
                    placeholder="Enter your Contact Number"   
                />

                <FormInput 
                    label="Add a Bio"
                    username="bio"
                    type="text"
                    placeholder="..."   
                />

                <FormInput 
                    label="Profile Image"
                    name="image"
                    type="file"
                    onChange = {this.changeProfileImage}
                    placeholder="Upload an Image"
                />
    
                <Button
                        variant = "primary"
                        color="success"
                        onClick = {this.UpdateProfileHandler}
                    >
                        Update Profile
                </Button>
                </Col>
            </Row>
            </div>
          {/* </form> */}
         
        </MainLayout>
    );
            
}

}

const mapUsertoProps =(state)=>{
    return {
        username:state.user.username,
        email:state.user.email,
        profileImage:state.user.profileImage
    }
}

export default userprofile;

//export default connect(mapUsertoProps)(userprofile);