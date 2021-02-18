import React from 'react'
import Moment from 'react-moment';

interface Props {
    reply: Reply
    index: number

}

const Reply: React.FC<Props> = ({ reply, index }) => {
    return (
        <>
            <div className="reply" style={{ marginLeft: `${1}px` }}>
                <div className="reply-user">
                    <span style={{ fontWeight: "bold" }}>{reply.user}</span>
                    <span style={{ marginRight: "5px", marginBottom: "5px" }}>·</span>
                    <Moment style={{ fontSize: "13px" }} fromNow className="date">{reply.date}</Moment>
                </div>
                <div className="reply-body">
                    <span>{reply.reply_message}</span>
                </div>
            </div>
        </>
    )
}

export default Reply