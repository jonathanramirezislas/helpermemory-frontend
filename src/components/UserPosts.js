import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Post from './ui/Post';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPosts } from '../actions/postActions';
import { toast } from 'react-toastify';
import PlaceHolder from './ui/PlaceHolder';
import NoPosts from './ui/NoPostMessage';

const UserPosts= () => {
   
    const [fetching, setFetching] = useState(false);
    const fetched = useSelector(state => state.posts.fetched);
    const posts = useSelector(state => state.posts.posts);
    const dispatch = useDispatch();

    useEffect(() => {
       async function fetchedPosts() {
        if (!fetched) { //if we did't fecth the data 
                try {
                    setFetching(true);
                    await dispatch(getUserPosts());//gte user's post
                    setFetching(false);
                }catch(err) { //error from back end
                    toast.error(err.response.data.message, { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
                }
            }
       }
       fetchedPosts();
    }, [dispatch, fetched]);


    return (
        <div>
            <Jumbotron>
                <h1>My posts</h1>
            </Jumbotron>
            { fetching && <PlaceHolder/> }
            { !fetching && posts.length === 0 && <NoPosts text=" There are not private posts , create one!"></NoPosts> }
            <div>
                <h1>s</h1>
                { posts.map(post => <Post key={post.postId} post={post} renderControls={true} ></Post>) }
            </div>
        </div>
    )
}

export default UserPosts
