import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { exposures } from '../../helpers/exposures';

export default function NewPostForm({ errors, onSubmitCallback}) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [expirationTime, setExpirationTime] = useState(60);
    const [exposureId, setExposureId] = useState(exposures.PUBLIC);

    const submitForm = (e) => {
        e.preventDefault();
        onSubmitCallback({ title, content, expirationTime, exposureId });
    }

    return (
        <Form onSubmit={submitForm}>
            <Form.Group control="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={ e => setTitle(e.target.value) }
                    placeholder="title post"
                    isInvalid={errors.title}
                />
                <Form.Control.Feedback type="invalid">
                    { errors.title }
                </Form.Control.Feedback>
            </Form.Group>

            <Row>
                <Col md="6" xs="12">
                    <Form.Group controlId="expirationTime">
                        <Form.Label>Expiration time</Form.Label>
                        <Form.Control
                            disabled={ parseInt(exposureId) === exposures.PRIVATE } 
                            as="select" value={expirationTime}
                            onChange={ e => setExpirationTime(e.target.value) }
                            >
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                            <option value="360">6 hours</option>
                            <option value="720">12 hours</option>
                            <option value="1440">1 day</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            { errors.expirationTime }
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md="6" xs="12">
                    <Form.Group controlId="exposureId">
                        <Form.Label>Post type</Form.Label>
                        <div>
                            <Form.Check 
                                onChange={ e => setExposureId(e.target.value) }
                                checked={ parseInt(exposureId) === exposures.PRIVATE }
                                value={exposures.PRIVATE}
                                inline
                                label="Privado"
                                name="exposureId"
                                type="radio"
                            ></Form.Check>

                            <Form.Check 
                                onChange={ e => setExposureId(e.target.value) }
                                checked={ parseInt(exposureId) === exposures.PUBLIC }
                                value={exposures.PUBLIC}
                                inline
                                label="Publico"
                                name="exposureId"
                                type="radio"
                            ></Form.Check>
                        </div>
                        <Form.Control.Feedback type="invalid">
                            { errors.expirationTime }
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group control="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={10}
                    value={content}
                    onChange={ e => setContent(e.target.value) }                    
                    isInvalid={errors.content}
                />
                <Form.Control.Feedback type="invalid">
                    { errors.content }
                </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit"> Create a Post</Button>
        </Form>
    )
}