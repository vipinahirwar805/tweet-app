import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { MdFavoriteBorder } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbMessageCircle } from "react-icons/tb";
import { MdOutlineDoubleArrow } from "react-icons/md";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Reply from './Reply';
import EditTweet from './EditTweet';
import ViewAllReplyOnTweet from './ViewAllReplyOnTweet';
export default function TweetComponent(props) {

    const url = "https://cors-everywhere.herokuapp.com/http://tweetapp-env.eba-ypubz2g3.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";
    const [userLikeOnTweets, setUserLikeOnTweets] = useState([]);
    const [totalLikes, setTotalLikes] = useState({});
    const loginId = localStorage.getItem("loginId");
    const [tweet, setTweet] = useState({});
    const [replyList, setReplyList] = useState([]);
    const [modalShowReply, setModalShowReply] = useState(false);
    const [modalShowEdit, setModalShowEdit] = useState(false);
    const [modalShowViewAllReplyOnTweet, setModalShowViewAllReplyOnTweet] = useState(false);

    useEffect(() => {
        const list = props.allTweets.filter(val => val.likes.filter(p => p.loginId === loginId).length > 0);
        setUserLikeOnTweets(list);

        props.allTweets.map(o => {
            return (
                setTotalLikes(i => ({
                    ...i,
                    [o.tweetId]: o.likes.length
                }))
            )
        })
    }, [loginId, props.allTweets]);

    const handleLikeButton = (tweetId) => {
        axios.put(url + loginId + "/like/" + tweetId)
            .then((e) => {

                if (e.data.likes.filter(p => p.loginId === loginId).length > 0) {
                    setUserLikeOnTweets(userLikeOnTweets.concat(e.data))
                    setTotalLikes(d => ({
                        ...d, [tweetId]: totalLikes[tweetId] + 1
                    }))
                } else {
                    setUserLikeOnTweets(userLikeOnTweets.filter(e => e.tweetId !== tweetId))
                    setTotalLikes(d => ({
                        ...d, [tweetId]: totalLikes[tweetId] - 1
                    }))
                }

            })
            .catch((error) => {
                alert(error["response"]["data"]["error-message"]);
            });
    }

    const handleDeleteButton = (tweetId) => {
        axios.delete(url + loginId + "/delete/" + tweetId)
            .then((e) => {
                const allTweets = props.allTweets.filter(p => p.tweetId !== e.data.tweetId);
                alert("Tweet delete successfully...")
                if(allTweets.length>0){
                    props.setAllTweets(allTweets)
                }else{
                    props.flag(false);
                }
            })
            .catch((error) => {
                alert(error["response"]["data"]["error-message"]);
            });
    }

    const displayEditAndDeleteButton = (val) => {
        return (
            <>
                <button className='ml-5' style={{ border: "none", backgroundColor: "white" }}
                    onClick={() => handleEditButton(val.tweetId)} ><FaEdit style={{ fontSize: "25px" }} /></button>
                <EditTweet loadTweets={props.loadTweets} show={modalShowEdit} tweet={tweet} onHide={() => setModalShowEdit(false)} />
                <button className='ml-2' style={{ border: "none", backgroundColor: "white" }} onClick={() => handleDeleteButton(val.tweetId)}><RiDeleteBin5Line style={{ fontSize: "25px" }} /></button>
            </>
        )
    }

    const handleEditButton = (id) => {
        setModalShowEdit(!modalShowEdit);
        setTweet(props.allTweets.filter(e => e.tweetId === id)[0]);
    }

    const handleReplyButton = (id) => {
        setModalShowReply(!modalShowReply);
        setTweet(props.allTweets.filter(e => e.tweetId === id)[0]);
    }

    const handleViewAllReplyOnTweetButton = (tweetId) => {

        axios.get(url + 'replies/' + tweetId)
            .then((e) => {
                setReplyList(e.data);
                if (e.data.length > 0) {
                    setModalShowViewAllReplyOnTweet(!modalShowViewAllReplyOnTweet);
                    setTweet(props.allTweets.filter(e => e.tweetId === tweetId)[0]);
                }
            }).catch((error) => {
                console.log(error);
                alert(error["response"]["data"]["error-message"]);
            });

    }



    return (
        <>
            {props.allTweets.slice(0).reverse().map(val => {
                return (
                    <div className='d-flex justify-content-center mt-3' key={val.tweetId}>
                        <div style={{ zIndex: 5, right: 0, bottom: 0, width: "60%" }}>
                            <div id="liveToast" className="toast show" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000" style={{ maxWidth: "100%" }}>
                                <div className="toast-header">
                                    <img src="..." className="rounded mr-2" alt="..." />
                                    <strong className="mr-auto">{val.loginId}</strong>
                                    <h6 className='mt-2'>{moment(val.timestamp).fromNow()}</h6>
                                    {props.displayEditAndDeleteFlag ? displayEditAndDeleteButton(val) : ""}


                                </div>
                                <div className="toast-body">
                                    <h4>{val.message}</h4>
                                </div>
                                <div className="toast-body">
                                    <h6>tag : {val.tag}</h6>
                                    <div className='d-flex justify-content-center'>
                                        <button style={{ border: "none", backgroundColor: "white" }} onClick={() => handleLikeButton(val.tweetId)}>
                                            <span className='mt-1'>

                                                {userLikeOnTweets.filter(e => e.tweetId === val.tweetId).length !== 1 ?
                                                    <MdFavoriteBorder style={{ fontSize: "25px" }} /> : <FcLike style={{ fontSize: "25px" }} />}</span>
                                        </button>
                                        <span className='ml-2 mt-1' style={{ fontSize: "20px" }}>
                                            {totalLikes[Object.keys(totalLikes).filter(e => parseInt(e) === val.tweetId)[0]]}</span>


                                        <Button className='ml-5 mb-1' style={{ border: "none", backgroundColor: "white" }} variant="primary" onClick={() => handleReplyButton(val.tweetId)}>
                                            <TbMessageCircle style={{ fontSize: "25px", color: "black" }} />
                                        </Button>
                                        <Reply show={modalShowReply} tweet={tweet} onHide={() => setModalShowReply(false)} />
                                        <Button className='ml-5 mb-1' style={{ border: "none", backgroundColor: "white" }} variant="primary" onClick={() => handleViewAllReplyOnTweetButton(val.tweetId)}>
                                            <MdOutlineDoubleArrow style={{ fontSize: "25px", color: "black" }} />
                                        </Button>

                                        <ViewAllReplyOnTweet show={modalShowViewAllReplyOnTweet} tweet={tweet} replylist={replyList} onHide={() => setModalShowViewAllReplyOnTweet(false)} />
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
