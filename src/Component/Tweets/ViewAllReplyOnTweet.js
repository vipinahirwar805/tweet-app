import moment from 'moment'
import { Modal } from 'react-bootstrap'

export default function ViewAllReplyOnTweet(props) {

    return (
        <>
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
                    <p style={{ fontWeight: 900, color: "rgb(83, 100, 113)" }}>all replies </p>
                    {props.replylist.map(val => {
                        return (
                            <div style={{ borderStyle: 'outset' }} className="mt-3" key={val.replyId}>
                                <span style={{ fontSize: '12px' }} className="float-right mr-2">{moment(val.timestamp).fromNow()}</span>
                                <span style={{ fontSize: '12px' }} className="float-right mr-2">Replied By <b>@{val.loginId}</b></span>
                                <div className="ml-2">
                                    <p><b>Reply:</b> {val.reply}</p>
                                    <p><b>Tag:</b> {val.tag}</p>
                                </div>
                            </div>
                        )
                    })}

                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-center' style={{ width: "150%" }}>
                        <button className='tweetButtonEnable ml-4' onClick={() => props.onHide()}>Exit</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
