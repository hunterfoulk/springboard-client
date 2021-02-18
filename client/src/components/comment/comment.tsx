import React, { useState, useContext, useRef } from 'react'
import { FaCommentAlt } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';
import { GoComment } from 'react-icons/go';
import Moment from 'react-moment';
import { ThreadContext } from "../../context/contexts/threadContext"
import { ThemeContext } from "../../context/contexts/themeContext"
import "./comment.scss"
import CategoryActions from "../../actions/actions"
import Reply from "../comment/reply"
import { useLocation, useRouteMatch } from "react-router-dom";



interface Props {
    comment: Comment
}




const Comment: React.FC<Props> = ({ comment }) => {
    const { dispatch: threadDispatch, threadData, } = useContext(ThreadContext);
    const { dispatch: themeDispatch, themeData } = useContext(ThemeContext);
    const [dropId, setDropId] = useState<number | undefined>(undefined)
    const [message, setMessage] = useState<string>("")
    const { createReply } = CategoryActions();
    const [openReplies, setRepliesOpen] = useState(false)
    const location = useLocation<any>();
    const match = useRouteMatch<any>();



    const handleReplyOpen = (comment: Comment) => {

        threadDispatch({ type: 'OPEN_REPLY', id: comment.comment_id });
        setDropId(comment.comment_id)
        console.log("comment", comment)

    }

    const handleReplyClose = () => {
        threadDispatch({ type: 'CLOSE_REPLY', id: dropId })
        setDropId(undefined)

    }


    const handleCreateReply = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault()
        console.log("DROP ID", dropId)

        let payload = {
            message: message,
            comment_id: dropId,
            thread_id: match.params.thread_id
        }

        await createReply(payload)

        setMessage("")
        handleReplyClose()
        showReplies(comment)
    }


    const showReplies = async (comment: Comment) => {
        console.log("comment", comment)

        threadDispatch({ type: 'OPEN_REPLIES', id: comment.comment_id })

    }


    return (

        <>
            <div className={`comment-${themeData.theme}`}>
                <div className="comment-user">
                    <span style={{ fontWeight: "bold" }}>{comment.user}</span>
                    <span style={{ marginRight: "5px", marginBottom: "5px" }}>·</span>
                    <Moment style={{ fontSize: "13px" }} fromNow className="date">{comment.date}</Moment>

                </div>
                <div className="comment-body">
                    <span>{comment.message}</span>

                </div>
                <div className="comment-button-bar">
                    <GoComment style={{ position: "relative", top: "4px", color: "rgb(215, 46, 51)", marginRight: "5px", fontSize: "14px" }} /><span style={{ fontSize: "12.4px", cursor: "default", marginRight: "10px" }} onClick={comment.replies?.length === 0 ? undefined : () => showReplies(comment)}>{comment.replies?.length} Replies</span>
                    <FaCommentAlt style={{ position: "relative", top: "2px", color: "rgb(215, 46, 51)", marginRight: "1px", fontSize: "11px" }} /><span style={{ marginLeft: "5px", fontSize: "12.4px", cursor: "default" }} onClick={() => handleReplyOpen(comment)}>Reply </span>
                    <MdReportProblem style={{ position: "relative", top: "2px", color: "rgb(215, 46, 51)", marginLeft: "10px", marginRight: "1px", fontSize: "11px" }} /> <span style={{ fontSize: "12.4px", cursor: "default" }}>Report</span>

                </div>
                {comment.replying &&

                    <div className="reply-container" >
                        <textarea placeholder="Leave A Reply..." value={message} onChange={(e) => setMessage(e.target.value)} />
                        <div className="reply-button-container">
                            <span onClick={() => handleReplyClose()}>Cancel</span>

                            <button className="reply-button" type="submit" onClick={(e) => handleCreateReply(e)}>Submit</button>
                        </div>

                    </div>}

                {comment.repliesShow &&
                    <div className="replies-container">
                        {comment.replies?.map((reply: Reply, index: number) =>

                            <Reply reply={reply} index={index} />

                        )}
                    </div>
                }


            </div>
        </>
    )
}

export default Comment