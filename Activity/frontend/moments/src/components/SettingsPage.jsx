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
        this.ImgObj = this.fileInputRef.current.giles[0];
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
    handleSubmit = async(event) => {
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

    }
}