import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Images/logo.png'
export default function Menu() {

    const url = "https://cors-everywhere.herokuapp.com/http://tweetapp-env.eba-ypubz2g3.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";
    const [user, setUser] = useState("");

    const navigate = useNavigate();
    const onChangeInput = (e) => {
        setUser(e.target.value);
    }
    
    const handleAllUserButton = () => {
        axios.get(url + "users/all")
            .then(e => {
                navigate("/users", { state: [e.data, "All Users"] });
            })
            .catch((error) => {
                alert(error["response"]["data"]["error-message"]);
            });
    }

    const handleSearchButton = () => {
        if (user.length > 0) {
            setUser("");
            axios.get(url + "user/search/" + user)
                .then(e => {
                    navigate("/users", { state: [e.data, "Search Users"] });
                })
                .catch((error) => {
                    alert(error["response"]["data"]["error-message"]);
                });

        } else {
            alert("Please enter something!!!")
        }
    }

    const handleLogOutButton = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <div className='container-fluid'>
                    <Link className="navbar-brand" to="/home">
                        <img src={logo} width="60" height="50" alt="" /> </Link>
                    <Link className="navbar-brand" to="/home">Tweet App</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarText">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Button className="nav-link" style={{ border: "none", backgroundColor: "#343a40" }} onClick={handleAllUserButton}>All Users</Button>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/mytweets" >My Tweets</Link>
                            </li>
                        </ul>
                        <div className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search User" aria-label="Search" onChange={onChangeInput} value={user} />
                            <Button onClick={() => handleSearchButton()}>
                                <FaSearch style={{ fontSize: "22px" }} />
                            </Button>
                        </div>
                        <Button variant="danger ml-3" onClick={handleLogOutButton}><IoMdLogOut style={{ fontSize: "25px" }} /></Button>
                    </div>
                </div>
            </nav>
        </>
    )
}
