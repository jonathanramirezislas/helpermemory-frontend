import React from 'react';
import { Card} from 'react-bootstrap';
import moment from 'moment';

 const Post=({ post, renderControls })=> {
    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>
{ post.title }
                </Card.Title>
                <Card.Text>
                   Owner  { post.user.firstName }, { moment(post.createdAt).fromNow() }
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default Post