import React from 'react';
import { Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

 const Post=({ post, renderControls })=> {
    return (
        <Card className="mb-4">
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