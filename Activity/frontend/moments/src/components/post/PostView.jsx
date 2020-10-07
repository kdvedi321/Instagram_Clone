import React, { Component } from 'react';
import {Link, Route} from "react-router-dom";
class PostView extends Component{
    state = {}
    render() {
        return(
            <div className="postview">
                <div className="header">
                    <div className="feed">Feed</div>
                    <div className="search">Search</div>
                    <div className="create-post_btn">
                        <Link to="/profile.create">Create</Link>
                    </div>
                </div>
                <div className="main"></div>
                <Route path="/profile/create" exact>
                    <div className="createPost">
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                </Route>
            </div>
        );
    }
}
export default PostView;