import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import PostForm from './forms/PostForm';
import validator from 'validator';
import { isObjEmpty } from '../helpers/isObjEmpty';
import { useHistory, useParams } from 'react-router-dom';
import { exposures } from '../helpers/exposures';
import { UPDATE_POST_ENDPOINT, POST_DETAILS_ENDPOINT } from '../shared/enpoints';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getUserPosts } from '../actions/postActions';
 
 const EditPost = () => {

    const { id } = useParams(); //gte id from params
    const [errors, setErrors] = useState({});    
    const [ post, setPost ] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${POST_DETAILS_ENDPOINT}/${id}`).then(response => {
            setPost(response.data);            
        }).catch(e => {
            history.push('/'); 
        })
    }, [id, history]);
   
    const editPost = async ({ title, content, expirationTime, exposureId }) => {
        const errors = {};
        setErrors(errors);

        if (validator.isEmpty(title)) {
            errors.title = "the title is required";
        }
        
        if (validator.isEmpty(content)) {
            errors.content = "The content is required";
        }

        if (!isObjEmpty(errors)) {
            setErrors(errors);
            return;
        }

        expirationTime = parseInt(exposureId) === exposures.PRIVATE ? 0 : expirationTime;       

        try {
            const response = await axios.put(`${UPDATE_POST_ENDPOINT}/${post.postId}`, { title, content, expirationTime, exposureId });
            await dispatch(getUserPosts());
            toast.info("The post was updated", { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
            history.push(`/post/${response.data.postId}`)
        } catch(err) {
            setErrors({ editpost: err.response.data.message });
        }

    }

    return (
        <Container className="mt-5 mb-5">
            <Row>
                <Col sm="12" lg={{ span: 10, offset: 1 }}>
                    <Card body>                        
                        { errors.editpost && <Alert variant="danger">{ errors.auth }</Alert> }

                        <h3>Editar post</h3><hr></hr>
                        { post && <PostForm 
                            errors={errors} 
                            onSubmitCallback={editPost}
                            pTitle={post.title}
                            pContent={post.content}
                            pExposureId={post.exposure.id}
                            textButton="Edit Post"
                            ></PostForm> }
                       
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default EditPost