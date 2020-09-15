import React, { Component } from 'react';
import axios from "axios";
class ProfileDetails extends Component {
    state = {
        src: "",
        title: "",
        handle: "",
        post: "",
        followers: "",
        following: ""
    }
    componentDidMount(){
        axios.get("/api/v1/users/13b7c97c-4ff9-4e60-b3d1-762fa7acbd8d").then((res)=>{
            let { email_id, handle, p_img_url } = res.data.user;
            this.setState({
                email: email_id,
                src: p_img_url,
                handle: handle
            })
        }).then(()=>{
            let follower = axios.get("/api/v1/users/13b7c97c-4ff9-4e60-b3d1-762fa7acbd8d");
            return follower;
        }).then((followerRes)=>{
            let followers = followerRes.data.message.filter((follower)=>{
                return follower.is_pending == 0;
            });
            let followerCount = followers.length;
            console.log(followerCount);
            this.setState({
                followers: followerCount
            })
        })
    }
    render() { 
        let { src, email, handle, post, followers, following } = this.state;
        return (
            <div className="profile-details">
                <div className="profile-subpart">
                    <h1>PROFILE</h1>
                    <img src={src} alt="profile-img"/>
                    <div className="email">{email}</div>
                    <div className="handle">{handle}</div>
                </div>
                <div className="profile-stats">
                    <div className="div post">
                        <p>{post}</p>
                        <div>POST</div>
                    </div>
                    <div className="div follower">
                        <p>{followers}</p>
                        <div>Follower</div>
                    </div>
                    <div className="div following">
                        <p>{following}</p>
                        <div>Following</div>
                    </div>
                </div>
            </div>);
    }
}
 
export default ProfileDetails;