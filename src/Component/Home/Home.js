import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Menu from '../Menu/Menu'
import Tag from '../Tweets/Tag'
import TweetComponent from '../Tweets/TweetComponent'
import '../Tweets/TweetButton.css';
import { checkUser, Authentication } from '../Authentication/Authentication';
import { useNavigate } from 'react-router-dom'
export default function Home() {

    const [tweet, setTweet] = useState("");
    const [tag, setTag] = useState("");
    const [tweetflag, setTweetFlag] = useState(true);
    const [tagFlag, setTagFlag] = useState(true);
    const [allTweets, setAllTweets] = useState([]);
    const url = "https://cors-everywhere.herokuapp.com/http://tweetapp-env.eba-ypubz2g3.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";

    const navigate = useNavigate();
    const loadTweets = async () => {
        Authentication();
        const res = await fetch(url + 'all');
        setAllTweets(await res.json());
        if (!checkUser) {
            navigate("/");
        }
    };

    useEffect(() => {
        loadTweets();
    }, [navigate])

    const handleInput = (e) => {
        if (e.target.name === "tweet") {
            setTweet(e.target.value);
            if (e.target.value.length > 0) {
                setTweetFlag(false);
            } else {
                setTweetFlag(true);
            }
        } else {
            setTag(e.target.value);
        }
    }

    const handleTagButton = () => {
        setTagFlag(!tagFlag);
    }

    const handleButton = () => {
        const loginId = localStorage.getItem("loginId");
        const data = {
            tag: tag,
            message: tweet
        }

        axios.post(url + loginId + "/add", data)
            .then((e) => {
                setTweet("");
                setTweetFlag(true);
                setTagFlag(true);
                loadTweets();
                alert("Your Tweet is successfully Done!!!")
            })
            .catch((error) => {
                alert(error["response"]["data"]["error-message"]);
            });
    }

    return (
        <>
            <Menu />
            <div className='container'>
                <div className='d-flex justify-content-center mt-3' style={{ width: "45%" }}>
                    <h4 style={{ fontWeight: "bold" }}>Home</h4>
                </div>
                <div className='d-flex justify-content-center mt-3'>
                    <textarea name="tweet" rows="4" cols="55" placeholder="What's happening?"
                        value={tweet} onChange={handleInput} style={{ borderColor: "aliceblue", fontSize: "25px", resize: "none" }} maxLength={144} />
                </div>

                <Tag tagFlag={tagFlag} handleInput={handleInput} handleTagButton={handleTagButton} />
                <hr style={{ width: "60%" }} />

                <div className='d-flex justify-content-center' style={{ width: "150%" }}>
                    <button type='submit' className={tweetflag ? 'tweetButtonDisable' : 'tweetButtonEnable'}
                        disabled={tweetflag} onClick={handleButton}>Tweet</button>
                </div>
                <TweetComponent loadTweets={loadTweets} allTweets={allTweets} setAllTweets={setAllTweets} />
            </div>
        </>
    )
}
