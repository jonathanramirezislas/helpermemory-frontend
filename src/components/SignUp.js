import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import SignUpForm from '../components/forms/SignUpForm';
import { isObjEmpty } from '../helpers/isObjEmpty';
import { registerUser, loginUser } from '../';
import { useHistory } from 'react-router-dom';

const SignUp = () => {

   
    
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const history = useHistory();
    
    
    useEffect(() => {
        if (loggedIn) {
        history.push("/");
    }
    }); 
    
    const register = ({ email, password, firstName, lastName }) => {
        const errors = {};
        setErrors(errors);

        if (!validator.isEmail(email)) {
            errors.email = "fromat email is invalid";
        }

        if (!validator.isLength(password, { min: 8, max: 30 })) {
            errors.password = "The password must contain at least 8 character and less than 30 characters";
        }

        if (validator.isEmpty(firstName)) {
            errors.firstName = "Name is required";
        }
        
        if (validator.isEmpty(lastName)) {
            errors.lastName = "Surname is required";
        }

        if (!isObjEmpty(errors)) {
            setErrors(errors);
            return;
        }

        dispatch(registerUser({ email, password, firstName, lastName }))
        .then(response => {
                dispatch(loginUser({ email, password }));
            })
            .catch(err => {                
                setErrors({ registerError: err.response.data.message });
            });

        }

    return (
        <Container className="mt-5">
            <Row>
                <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                    <Card body>                        
                        { errors.registerError && <Alert variant="danger">{ errors.registerError }</Alert> }

                        <h3>Create account </h3><hr></hr>
                        <SignUpForm errors={errors} onSubmit={register}></SignUpForm>
                        <div className="mt-4">
                            <Link to={"/signin"}>Do you have already an account? Sign in here.</Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}


export default SignUp