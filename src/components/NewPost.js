import React, { useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import PostForm from './forms/PostForm';
import validator from 'validator';
import { isObjEmpty } from '../helpers/isObjEmpty';
import { useHistory } from 'react-router-dom';
import { exposures } from '../helpers/exposures';
import { CREATE_POST_ENDPOINT } from '../shared/enpoints';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getUserPosts } from '../actions/postActions';
 
 const NewPost=()=> {

    const [errors, setErrors] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();
   
    const createPost = async ({ title, content, expirationTime, exposureId }) => {
        const errors = {};
        setErrors(errors);

        if (validator.isEmpty(title)) {
            errors.title = "Tile is required";
        }
        
        if (validator.isEmpty(content)) {
            errors.content = "Content is required";
        }

        if (!isObjEmpty(errors)) {
            setErrors(errors);
            return;
        }
        // if the exposure is Private put 0 time of expiration
        expirationTime = parseInt(exposureId) === exposures.PRIVATE ? 0 : expirationTime;       

        try {
            const response = await axios.post(CREATE_POST_ENDPOINT, { title, content, expirationTime, exposureId });
            await dispatch(getUserPosts());//get again the posts to add the new post to the store
            toast.info("The post was created", { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
            history.push(`/post/${response.data.postId}`) //redirect to details of post wich was created
        } catch(err) {
            setErrors({ newpost: err.response.data.message });
        }

    }

    return (
        <Container className="mt-5 mb-5">
            <Row>
                <Col sm="12" lg={{ span: 10, offset: 1 }}>
                    <Card body>                        
                        { errors.newpost && <Alert variant="danger">{ errors.auth }</Alert> }

                        <h3>Create a post</h3><hr></hr>
                        <PostForm errors={errors} onSubmitCallback={createPost}></PostForm>
                       
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default NewPost;