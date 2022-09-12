import axios from 'axios';
import moment from 'moment'
import { useState } from 'react';
import { Modal } from 'react-bootstrap'
import Tag from './Tag'

export default function Reply(props) {
    const [tag, setTag] = useState("");
    const [reply, setReply] = useState("");
    const [replyButton, setReplyButton] = useState(true);
    const [tagFlag, setTagFlag] = useState(true);
    const url = "https://cors-everywhere.herokuapp.com/http://tweetapp-env.eba-ypubz2g3.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";

    const loginId = localStorage.getItem("loginId");

    const handleInput = (e) => {
        if (e.target.name === "reply") {
            setReply(e.target.value);
            if (e.target.value.length > 0) {
                setReplyButton(false);
            } else {
                setReplyButton(true);
            }
        } else {
            setTag(e.target.value);
        }
    }

    const handleTagButton = () => {
        setTagFlag(!tagFlag);
    }

    const handleExitButton = () => {
        setReplyButton(true);
        setTagFlag(!tagFlag);
        props.onHide();
    }

    const handleButton = () => {
        const data = {
            tag: tag,
            reply: reply
        }
        axios.post(url + loginId + "/reply/" + props.tweet.tweetId, data)
            .then((e) => {
                alert("Reply successfully...")
                props.onHide();
            })
            .catch((error) => {
                alert(error["response"]["data"]["error-message"]);
            });
    }
    return (
        <Modal {...props}
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
                <h4>{props.tweet.message}</h4>
                <p>
                    tag : {props.tweet.tag}
                </p>
                <p style={{ color: "rgb(83, 100, 113)" }}>replying to <span style={{ fontWeight: 900 }}>@{props.tweet.loginId}</span></p>
                <div className='d-flex justify-content-center'>
                    <textarea name="reply" rows="4" cols="55" placeholder="Tweet your reply"
                        onChange={handleInput} style={{ borderColor: "aliceblue", fontSize: "20px", resize: "none" }} maxLength={144} />
                </div>
                <Tag tagFlag={tagFlag} handleInput={handleInput} handleTagButton={handleTagButton} />
            </Modal.Body>
            <Modal.Footer>
                <div className='d-flex justify-content-center' style={{ width: "150%" }}>
                    <button type='submit' className={replyButton ? 'tweetButtonDisable' : 'tweetButtonEnable'}
                        disabled={replyButton} onClick={handleButton}>Reply</button>

                    <button className='tweetButtonEnable ml-4' onClick={handleExitButton}>Exit</button>
                </div>
            </Modal.Footer>
        </Modal>

    )
}
