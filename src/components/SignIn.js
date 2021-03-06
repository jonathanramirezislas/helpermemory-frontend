import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import SignInForm from '../components/forms/SignInForm';
import { isObjEmpty } from '../helpers/isObjEmpty';


export default function SignIn() {
   
    
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const history = useHistory();

    //if the user is already logged in
    useEffect(() => {
      if (loggedIn) {
        history.push("/");
      }
    }); 

    const login = ({ email, password }) => {
        const errors = {};
        setErrors(errors);

        if (!validator.isEmail(email)) {
            errors.email = "email is invalid";
        }

        if (validator.isEmpty(password)) {
            errors.password = "password must not empty";
        }

        if (!isObjEmpty(errors)) {//if there are errors save the errors
            setErrors(errors);  //errors will show in the form
            return; //stop the method
        }

        dispatch(loginUser({ email, password }))
        .then(response => { //evething is ok
                
        })
        .catch(err => {                
            setErrors({ auth: "Check your email and password" });
        });
       
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                    <Card body>                        
                        { errors.auth && <Alert variant="danger">{ errors.auth }</Alert> }

                        <h3>Log in</h3><hr></hr>
                        <SignInForm errors={errors} onSubmitLogin={login}></SignInForm>
                        <div className="mt-4">
                            <Link to={"/signup"}>Create a new account here.</Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
