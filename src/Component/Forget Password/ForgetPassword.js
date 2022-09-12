import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

export default function ForgetPassword(props) {

  const url = "https://cors-everywhere.herokuapp.com/http://tweetapp-env.eba-ypubz2g3.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";
  const [loginId, setLoginId] = useState();
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");

  const [flag, setFlag] = useState(true);
  const contactReg = /^[7-9]\d{9}$/g;

  const [error, setError] = useState({
    loginIdError: "",
    passwordError: "",
    contactError: ""
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

  const handleVerifyButton = () => {

    if (loginId > 4) {
      axios.get(url + 'login/' + loginId)
        .then((e) => {
          setFlag(!e.data);
          if (!e.data) {
            alert("Login Id is not exist..")
          }
        })
        .catch((error) => {
          alert(error["response"]["data"]["error-message"]);
        });
    }
    else{
      alert("Please enter correct crediential!!!")
    }

  }

  const handleChangePasswordButton = () => {
    if (password.length > 4 && contact.length === 10) {
      const data = {
        password: password,
        contactNumber: contact
      }
      axios.post(url + loginId + '/forgot/', data)
        .then((e) => {
          if (e.data) {
            alert("Password changed Successfully!!!");
            setFlag(true);
            props.onHide();
          }
        })
        .catch((error) => {
          alert(error["response"]["data"]["error-message"]);
        });
    }else{
      alert("Please enter correct crediential!!!")
    }
    
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <b>Forget Password</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {flag ?
          <div className="form-group">
            <label htmlFor="inputLogin">Login Id</label>
            <input type="text" className="form-control" name="loginId" onChange={onChangeInput} />
            {displayError(error.loginIdError)}
          </div> :
          <>
            <div className="form-group">
              <label htmlFor="inputPassword">Password</label>
              <input type="password" className="form-control" name="password" onChange={onChangeInput} />
              {displayError(error.passwordError)}
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact No.</label>
              <input  type="text" className="form-control" name="contactNumber" onChange={onChangeInput} maxLength={10} />
              {displayError(error.contactError)}
            </div>
          </>
        }
      </Modal.Body>
      <Modal.Footer>
        {flag ? <>
          <Button onClick={() => { props.onHide(); setFlag(true) }}>Back To Login</Button>
          <Button variant="success" onClick={() => handleVerifyButton()}>Verify</Button>
        </>
          : <>
            <Button onClick={() => setFlag(true)}>Back</Button>
            <Button variant="success" onClick={() => handleChangePasswordButton()}>Change Password</Button>
          </>
        }

      </Modal.Footer>
    </Modal>
  );
}
