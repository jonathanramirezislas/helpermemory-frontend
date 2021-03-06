import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SignInForm from '../components/forms/SignInForm';
import validator from 'validator';


export default function SignIn() {
   
    //detect if a object is empty
    const isObjEmpty = (obj) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);

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
