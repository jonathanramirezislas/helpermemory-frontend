import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import { Card, Jumbotron, Button } from 'react-bootstrap';
import { Prism as SystaxHighlighter } from 'react-syntax-highlighter';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { toast } from 'react-toastify';


import { downloadTextAsFile } from '../helpers/downloadTextAsFile';
import { POST_DETAILS_ENDPOINT } from '../shared/enpoints';

export default function PostDetails() {

    const { id } = useParams();//GTE ID FROM PARAMS URL
    const [ post, setPost ] = useState(null);
    const history = useHistory();
    
    const notify = () =>{
       
        toast.info("Copy to clipboard", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000
        });
    } 

    useEffect(() => {
        axios.get(`${POST_DETAILS_ENDPOINT}/${id}`).then(response => {
            setPost(response.data);            
        }).catch(e => {
            history.push('/'); //redirect to home if the user is not the owner
        })
    }, [id,history]);

    return (
        <div className="pb-4">
            { post && ( //wait until we have the Post from the API
                <>
                <Jumbotron>
                    <h1>{ post.title } </h1>
                    <p>Owner { post.user.firstName }, { moment(post.createdAt).fromNow() }</p>
                </Jumbotron>

                <Card>
                    <Card.Header>
                        <Button 
                            variant="primary" 
                            className="mr-2" 
                            size="sm" 
                            onClick={() => {
                                downloadTextAsFile(post.postId, post.content)
                            }}>Download</Button>
                        <CopyToClipboard
                            onCopy={notify}
                            text={post.content}
                        >
                            <Button 
                                variant="primary" 
                                size="sm" 
                                >Copy to clipboard</Button>
                        </CopyToClipboard>
                    </Card.Header>
                    <Card.Body>
                        <SystaxHighlighter showLineNumbers={true}>
                            { post.content }
                        </SystaxHighlighter>                        
                    </Card.Body>
                </Card>
               
            </>
            ) }
        </div>
    )
}