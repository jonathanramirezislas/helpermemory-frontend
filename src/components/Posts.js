import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Post from './ui/Post';
import {  PUBLIC_POSTS_ENDPOINT } from '../shared/enpoints';


 const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        axios.get(PUBLIC_POSTS_ENDPOINT).then(response => {
            setPosts(response.data);
            setFetching(false);
        }).catch(e => {
            setFetching(false);
        })
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            <div>
                { posts.map(post => <Post key={post.postId} post={post} renderControls={false}></Post>) }
            </div>
        </div>
    )
}

export default Posts