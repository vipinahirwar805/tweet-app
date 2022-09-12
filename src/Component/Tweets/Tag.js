import React from 'react'

export default function Tag(props) {
    return (
        <>
            <div className='d-flex justify-content-center mt-1' >

                {props.tagFlag ? "" : <textarea name="tag" rows="1" cols="63" defaultValue={props.defaultValue} placeholder="add tag" onChange={props.handleInput}
                    style={{ borderColor: "aliceblue", fontSize: "18px", resize: "none" }} maxLength={50} />}

                <button type="button" className="btn btn-info" onClick={props.handleTagButton}
                    style={!props.tagFlag ? { marginLeft: "1%" } : { marginLeft: "57%" }}>tag</button>
            </div>
        </>
    )
}
