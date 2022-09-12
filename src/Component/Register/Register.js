import React, { useState } from 'react'
import axios from 'axios';
export default function Register(props) {
    const url = "https://cors-everywhere.herokuapp.com/http://tweetapp-env.eba-ypubz2g3.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [loginId, setLoginId] = useState();
    const [password, setPassword] = useState();
    const [contact, setContact] = useState();
    const emailReg = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    const contactReg = /^[7-9]\d{9}$/g;

    const [error, setError] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        loginIdError: "",
        passwordError: "",
        cpasswordError: "",
        contactError: "",
    });

    const onChangeInput = (e) => {
        if (e.target.name === 'firstName') {
            if (e.target.value.length > 1) {
                setFirstName(e.target.value);
                setError((preValue) => ({
                    ...preValue,
                    firstNameError: "",
                }));
            } else {
                setError((preValue) => ({
                    ...preValue,
                    firstNameError: "First name is required",
                }));
            }
        }
        if (e.target.name === 'lastName') {
            if (e.target.value.length > 1) {
                setLastName(e.target.value);
                setError((preValue) => ({
                    ...preValue,
                    lastNameError: "",
                }));
            } else {
                setError((preValue) => ({
                    ...preValue,
                    lastNameError: "Last name is required",
                }));
            }
        }
        if (e.target.name === 'email') {
            if (emailReg.test(e.target.value) === false) {
                setError((preValue) => ({
                    ...preValue,
                    emailError: "Email Field is Invalid "
                }));
            } else {
                setEmail(e.target.value);
                setError((preValue) => ({
                    ...preValue,
                    emailError: ""
                }));
            }

        }
        if (e.target.name === 'loginId') {
            if (e.target.value.length > 4) {
                setLoginId(e.target.value);
                setError((preValue) => ({
                    ...preValue,
                    loginIdError: "",
                }));
            } else {
                setError((preValue) => ({
                    ...preValue,
                    loginIdError: "minimum length should be 5.",
                }));
            }

        }
        if (e.target.name === 'password') {

            if (e.target.value.length > 4) {
                setPassword(e.target.value);
                setError((preValue) => ({
                    ...preValue,
                    passwordError: "",
                }));
            } else {
                setError((preValue) => ({
                    ...preValue,
                    passwordError: "minimum length should be 5.",
                }));
            }
        }
        if (e.target.name === 'cpassword') {
            if (e.target.value === password) {
                setError((preValue) => ({
                    ...preValue,
                    cpasswordError: "",
                }));
            } else {
                setError((preValue) => ({
                    ...preValue,
                    cpasswordError: "Password and Confirm Password is not matched.",
                }));
            }
        }
        if (e.target.name === 'contactNumber') {
            if (contactReg.test(e.target.value) === true) {
                setContact(e.target.value);
                setError((preValue) => ({
                    ...preValue,
                    contactError: "",
                }));
            } else {
                setError((preValue) => ({
                    ...preValue,
                    contactError: "Contact no. is not valid.",
                }));
            }
        }
    }

    const displayError = (e) => {
        if (e.length > 0) {
            return <small className="text-danger">{e}</small>;
        }
    };

    const handleButton = (e) => {
        if(error.firstNameError.length<1 && error.lastNameError.length<1 && error.emailError.length<1 &&
            error.loginIdError.length<1 && error.passwordError.length<1 && error.cpasswordError.length<1 &&
            error.contactError.length<1 && firstName!== undefined && lastName!== undefined &&
            email!== undefined && loginId!== undefined && password!== undefined && contact!== undefined){
        const data = {
            firstName: firstName,
            lastName: lastName,
            emailId: email,
            loginId: loginId,
            password: password,
            contactNumber: contact,
        };
        axios
          .post(url+'register', data)
          .then((data) => {
            alert("Your Registration is successfully Done...")
            props.handler(true)
          })
          .catch((error) => {
            alert(error["response"]["data"]["error-message"]);
          });
        }
      };


    return (
        <>
            <div style={{ marginTop: "60px" }}>
                <h2 className='mb-3' style={{ textAlign: 'center' }}>Join Twitter today.</h2>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" onChange={onChangeInput} />
                        {displayError(error.firstNameError)}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" onChange={onChangeInput} />
                        {displayError(error.lastNameError)}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail">Email Id</label>
                    <input type="email" className="form-control" name="email" onChange={onChangeInput} />
                    {displayError(error.emailError)}
                </div>
                <div className="form-group">
                    <label htmlFor="inputLogin">Login Id</label>
                    <input type="text" className="form-control" name="loginId" onChange={onChangeInput} />
                    {displayError(error.loginIdError)}
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" className="form-control" name="password" onChange={onChangeInput} />
                        {displayError(error.passwordError)}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword2">Confirm Password</label>
                        <input type="password" className="form-control" name="cpassword" onChange={onChangeInput} />
                        {displayError(error.cpasswordError)}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Contact No.</label>
                    <input type="text" className="form-control" name="contactNumber" onChange={onChangeInput} maxLength={10}/>
                    {displayError(error.contactError)}
                </div>

                <button type="submit" className="btn btn-primary" onClick={() => props.handler(true)}>Back to Login</button>
                <button type="submit" className="btn btn-success ml-5" onClick={handleButton}>Register</button>
            </div>

        </>
    )
}
