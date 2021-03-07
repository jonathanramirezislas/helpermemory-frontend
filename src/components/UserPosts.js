import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Post from './ui/Post';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPosts } from '../actions/postActions';
import { toast } from 'react-toastify';

const UserPosts= () => {
   
    const [fetching, setFetching] = useState(false);
    const fetched = useSelector(state => state.posts.fetched);
    const posts = useSelector(state => state.posts.posts);
    const dispatch = useDispatch();

    useEffect(() => {
       async function fetchedPosts() {
            
                try {
                    setFetching(true);
                    await dispatch(getUserPosts());
                    setFetching(false);
                }catch(err) {
                    toast.error(err.response.data.message, { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
                }
            
       }
       fetchedPosts();
    }, [dispatch, fetched]);


    return (
        <div>
            <Jumbotron>
                <h1>My posts</h1>
            </Jumbotron>
            
            { !fetching && posts.length === 0 && <div>There are not private post</div>}
            <div>
                { posts.map(post => <Post key={post.postId} post={post} renderControls={true} ></Post>) }
            </div>
        </div>
    )
}

export default UserPosts
