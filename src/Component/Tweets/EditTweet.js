import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Tag from './Tag';

export default function EditTweet(props) {

    const [tag, setTag] = useState("");
    const [newTweet, setNewTweet] = useState("");
    const [editButton, setEditButton] = useState(false);
    const [tagFlag, setTagFlag] = useState(false);
    const url = "https://cors-everywhere.herokuapp.com/http://tweetapp-env.eba-ypubz2g3.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";

    const loginId = localStorage.getItem("loginId");

    useEffect(() => {
        setNewTweet(props.tweet.message);
        setTag(props.tweet.tag);
    }, [props.tweet])

    const handleInput = (e) => {
        if (e.target.name === "edit") {
            setNewTweet(e.target.value);
            if (e.target.value.length > 0) {
                setEditButton(false);
            } else {
                setEditButton(true);
            }
        } else {
            setTag(e.target.value);
        }
    }

    const handleTagButton = () => {
        setTagFlag(!tagFlag);
    }

    const handleExitButton = () => {
        setEditButton(false);
        setTagFlag(false);
        props.onHide();
    }

    const handleButton = () => {
        const data = {
            tag: tag,
            message: newTweet
        }

        
        axios.put(url + loginId + "/update/" + props.tweet.tweetId, data)
            .then((e) => {

                alert("Tweet Update successfully...")
                props.onHide();
                props.loadTweets();

            })
            .catch((error) => {
                alert(error["response"]["data"]["error-message"]);
            });
    }
    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <img src="..." className="rounded mr-4" alt="..." />
                        <strong className="mr-auto">{props.tweet.loginId}</strong>
                        <small className='ml-4'>{moment(props.tweet.timestamp).fromNow()}</small>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center mt-3'>
                        <textarea name="edit" rows="4" cols="55" placeholder="What's happening?"
                            defaultValue={props.tweet.message} onChange={handleInput} style={{ borderColor: "aliceblue", fontSize: "25px", resize: "none" }} maxLength={144} />
                    </div>
                    <Tag defaultValue={props.tweet.tag} tagFlag={tagFlag} handleInput={handleInput} handleTagButton={handleTagButton} />

                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-center' style={{ width: "150%" }}>
                        <button type='submit' className={editButton ? 'tweetButtonDisable' : 'tweetButtonEnable'}
                            disabled={editButton} onClick={handleButton}>Update</button>

                        <button className='tweetButtonEnable ml-4' onClick={handleExitButton}>Exit</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
