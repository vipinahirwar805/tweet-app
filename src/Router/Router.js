import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Component/Home/Home'
import LoginRegisterBackground from '../Component/LoginRegisterBackground/LoginRegisterBackground'
import UserTweets from '../Component/Tweets/UserTweets'
import User from '../Component/User/User'

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<LoginRegisterBackground />} />
                <Route exact path='/home' element={<Home />} />
                <Route exact path='/users' element={<User />} />
                <Route exact path='/mytweets' element={<UserTweets handler={true} />} />
                <Route
                    path="*"
                    element={<div className='d-flex justify-content-center mt-3'
                        style={{ fontSize: "50px", color: "red" }}><b>Page Not Found</b></div>}
                />
            </Routes>

        </BrowserRouter>
    )
}
