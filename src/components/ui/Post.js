import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { exposures } from './../../helpers/exposures';

                    //rendercontrols for owner of post
 const Post=({ post, renderControls })=> {
    return (
        <Card className="mb-4">
              { renderControls && 
            <Card.Header className="d-flex justify-content-between">
                <div>
                    <Badge variant="secondary" className="mr-2">{ post.exposure.type }</Badge>
                    { post.expired && post.exposure.id === exposures.PUBLIC && <Badge variant="danger" className="mr-2">Expiro</Badge> }
                </div>
                <div>
                    <Button variant="primary" size="sm" className="mr-2"
                        as={NavLink} to={`editpost/${post.postId}`}
                    >Edit</Button>
                    <Button variant="danger" size="sm" className="mr-2" >Delete</Button>
                </div>
            </Card.Header> }
            <Card.Body>
                <Card.Title>
                <Link to={`/post/${post.postId}`}>{ post.title }</Link>
                   
                </Card.Title>
                <Card.Text>
                   Owner  { post.user.firstName }, { moment(post.createdAt).fromNow() }
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default Post