import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Post from './ui/Post';
import PlaceHolder from './ui/PlaceHolder';
import {  PUBLIC_POSTS_ENDPOINT } from '../shared/enpoints';
import { Jumbotron } from 'react-bootstrap';
import PlaceHolder from './ui/PlaceHolder';
import NoPosts from './ui/NoPostMessage';


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
                <Jumbotron>
                <h1>Ultimos posts publicos</h1>
            </Jumbotron>
            { fetching && <PlaceHolder/> }
            { !fetching && posts.length === 0 && <NoPosts text=" There are not public posts yet!"></NoPosts> }
            <div>
                { posts.map(post => <Post key={post.postId} post={post} renderControls={false}></Post>) }
            </div>
        </div>
    )
}

export default Posts