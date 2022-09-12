import React, { useEffect, useState } from 'react'
import Menu from '../Menu/Menu'
import TweetComponent from './TweetComponent'

export default function Tweets(props) {

  const [myTweets, setMyTweets] = useState([]);
  const url = "https://cors-everywhere.herokuapp.com/http://tweetapp-env.eba-ypubz2g3.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";

  const [flag, setFlag] = useState(true);

  const loadTweets = async () => {
    const loginId = localStorage.getItem("loginId");
    const res = await fetch(url + loginId);
    const data = await res.json();
    if (data.length < 1) {
      setFlag(false);
    } else {
      setMyTweets(data);
    }
  };
  useEffect(() => {
    loadTweets();
  }, []);

  return (
    <>
      <Menu />
      <div className='container'>
        <div className='d-flex justify-content-center mt-3 ml-5' style={{ width: "45%" }}>
          <h4 style={{ fontWeight: "bold" }}>My All Tweets</h4>
        </div>
        {flag ?
          <TweetComponent loadTweets={loadTweets} displayEditAndDeleteFlag={props.handler} allTweets={myTweets} setAllTweets={setMyTweets} flag={setFlag}/>
          : <>
            <div className='d-flex justify-content-center mt-3 ml-5' style={{ width: "46%" }}>
              <h6 style={{ color:"red",fontWeight: "bold" }}>No Tweet is available.</h6>
            </div>
          </>}
      </div>


    </>
  )
}
