import React, { Component } from 'react';
import axios from "axios";
class Settings extends Component{
    state = {
        email : "",
        handle : "",
        bio : "",
        profile : "public",
        disabled : true,
        src: ""
    }
    fileInputRef = React.createRef();
    ImgObj;
    openAddImage = () => {
        this.fileInputRef.current.click();
    }
    selectImage = () => {
        this.ImgObj = this.fileInputRef.current.files[0];
        let imgNewSrc = URL.createObjectURL(this.ImgObj);
        this.setState({
            src : imgSrc
        })
    }
    handleChange = (event) => {
        let val = event.target.value;
        let prop = event.target.name;
        console.log(prop);
        let stateObj = {};
        stateObj[prop] = val;
        this.setState(stateObj);
    }
    handleEdit = (event) => {
        event.preventDefault();
        this.setState({
            disabled: !this.state.disabled
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData();
        if(this.ImgObj){
            formData.append("user", this.ImgObj);
        }
        formData.append("email_id", this.state.email);
        formData.append("bio", this.state.bio);
        formData.append("is_public", this.state.profile == "public" ? 1 : 0);
        let res = await axios.patch("");
        alert(res.data.status);
    }
    componentDidMount(){
        axios.get("").then((req) => {
            let { email_id, hanle, bio, p_img_url } = req.data.user;
            console.log(req.data);
            this.setState({
                email: email_id,
                handle,
                bio,
                src: p_img_url
            })
        });

    }
    render() {
        return(
            <div className="container">
                <h2>User Details</h2>
                <div className="img-container">
                    <img src={this.state.src} alt="" className="profile-img" onClick={this.openAddImage}/>
                    <input type="file" name="" id="" ref={this.fileInputRef} onChange={this.selectImage}/>
                </div>
                <form className="profile" onSubmit={this.handleSubmit}>
                    <div className="input_container">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" value={this.state.email}
                            name="email"
                            onChange={this.handleChange}
                            disabled={this.state.disabled}
                        />
                    </div>
                    <div className="input_container">
                        <label htmlFor="handle">Handle</label>
                        <input type="text" id="handle" value={this.state.handle}
                            onChange={this.handleChange}
                            name="handle"
                            disabled={this.state.disabled}
                        />
                    </div>
                    <div className="input_container">
                        <label htmlFor="bio">Bio</label>
                        <input type="text" id="bio" value={this.state.bio}
                            name="bio"
                            onChange={this.handleChange}
                            disabled={this.state.disabled}
                        />
                    </div>
                    <div></div>
                    <div className="input_container">
                        <label htmlFor="profile">Profile</label>
                        <select id="profile" value={this.state.profile} onChange={this.handleChange} name="profile" disabled={this.state.disabled}>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>    
                    </div>
                    <button type="submit">Submit</button>
                    <button onClick={this.handleEdit}>Edit</button>
                </form>
            </div>
        );
    }
}
export default Settings;