import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ForgetPassword from '../Forget Password/ForgetPassword';
export default function Login(props) {
  const url = "https://cors-everywhere.herokuapp.com/http://tweetapp-env.eba-ypubz2g3.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";
  const [loginId, setLoginId] = useState();
  const [password, setPassword] = useState();
  const [modalShowForgetPassword, setModalShowForgetPassword] = useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState({
    loginIdError: "",
    passwordError: ""
  });

  const onChangeInput = (e) => {

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
  }
  const displayError = (e) => {
    if (e.length > 0) {
      return <small className="text-danger">{e}</small>;
    }
  }
  const handleButton = (e) => {
    if (error.loginIdError.length < 1 && error.passwordError.length < 1 && loginId !== undefined && password !== undefined) {
      const data = {
        loginId: loginId,
        password: password
      };
      axios.post(url + 'login', data)
        .then(() => {
          localStorage.setItem("loginId",loginId);
          navigate("/home");
        })
        .catch((error) => {
          alert(error["response"]["data"]["error-message"]);
        });
    }
  };
  
  const handleForgetPasswordButton = ()=>{
    setModalShowForgetPassword(!modalShowForgetPassword);
  }
  return (
    <>
      <div style={{ marginTop: "60px" }}>
        <h2 className='mb-3' style={{ textAlign: 'center' }}>Sign in to Twitter</h2>
        <div className="form-group">
          <label htmlFor="email">Login Id</label>
          <input type="email" className="form-control" name="loginId" aria-describedby="emailHelp" onChange={onChangeInput}/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          {displayError(error.loginIdError)}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password" onChange={onChangeInput}/>
          {displayError(error.passwordError)}
        </div>
        <Button className='float-right' variant="link" onClick={handleForgetPasswordButton}>Forget Password</Button>

        <ForgetPassword show={modalShowForgetPassword} onHide={() => setModalShowForgetPassword(false)}/>
        
       
        <div className='mt-5'>

        
        <button type="submit" className="btn btn-primary" style={{ borderRadius: '40px', width: '40%', marginLeft: '30%' }}
         onClick={handleButton}>Login</button>
        <button type='click' className="btn btn-success mt-3" style={{ borderRadius: '40px', width: '40%', marginLeft: '30%' }} onClick={() => props.handler(false)}>Register</button>
        </div>
      </div>

    </>
  )
}
