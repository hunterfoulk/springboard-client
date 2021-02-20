import React, { useState, useContext, useRef } from 'react'
import Moment from 'react-moment';
import { FaCommentAlt } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa';
import { FaLink } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';
import "./threads.scss"
import { ThreadContext } from "../../context/contexts/threadContext";
import { ThemeContext } from "../../context/contexts/themeContext";
import useClickOutside from "../../hooks/useClickOutside"
import { Link, useHistory } from "react-router-dom";


interface Props {
    thread: any;
    i: number
    image: string
}

const Threads: React.FC<Props> = ({ thread, i, image }) => {
    const { dispatch: threadDispatch, threadData } = useContext(ThreadContext);
    const { dispatch: themeDispatch, themeData } = useContext(ThemeContext);
    const [dropId, setDropId] = useState("")
    const history = useHistory();
    const ref = useRef<any>();
    useClickOutside(ref, () => threadDispatch({ type: 'CLOSE_DROPDOWN', id: dropId }))


    const handleShareToggle = (thread: any, i: number) => {
        console.log("thread", thread.thread_id)
        let thread_id = thread.thread_id
        console.log("thread index", thread_id)
        setDropId(thread_id)
        threadDispatch({ type: 'OPEN_DROPDOWN', id: thread_id });

    }

    const handleCopyLink = (e: any, thread: any) => {
        // console.log("thread clicked", thread_id)

        console.log(e.target)
        let url = `https://springboards.netlify.app/t/${thread.thread_id}/${thread.thread_title}`
        navigator.clipboard.writeText(url)
        setDropId("")
        threadDispatch({ type: 'CLOSE_DROPDOWN', id: thread.thread_id });
    }

    const handleCloseDropdown = (thread: any, i: number) => {
        let thread_id = thread.thread_id
        console.log("thread id", thread_id)
        setDropId("")
        threadDispatch({ type: 'CLOSE_DROPDOWN', id: thread_id });
    }


    const handleThreadRoute = async (thread: Thread) => {
        let thread_id = thread.thread_id

        history.push({
            pathname: `/t/${thread_id}/${thread.thread_title}`,
            state: { id: thread_id, image: image },

        });


    }

    return (
        <>
            <div className={`thread-${themeData.theme}`} >
                <div className="user-container">
                    <div className="image-container">
                        <img src={image} />
                    </div>
                    <span  >Posted by <span >u/{thread.user}</span></span>
                    <Moment fromNow className="date">{thread.date}</Moment>
                </div>
                <div className="thread-title">
                    <span>{thread.thread_title}</span>
                </div>
                <div className="thread-body" onClick={() => handleThreadRoute(thread)}>
                    <p>{thread.body}</p>
                </div>
                <div className="thread-buttons">
                    <FaCommentAlt style={{ position: "relative", top: "2px", color: "rgb(215, 46, 51)", marginRight: "3px" }} /><span style={{ fontSize: "14.5px", position: "relative", top: "0.5px" }}> {thread.comments.length}</span> <span style={{ marginLeft: "5px" }} onClick={() => handleThreadRoute(thread)}>Comments </span>
                    <FaShare style={{ position: "relative", top: "2px", color: "rgb(215, 46, 51)", marginLeft: "20px", marginRight: "3px" }} /> <span onClick={() => handleShareToggle(thread, i)}>Share</span>
                </div>
                {thread.sharing && <div ref={ref} className="dropdown">
                    <span className="copy-span" style={{ fontSize: "13px" }} onClick={(e) => handleCopyLink(e, thread)}>
                        <FaLink style={{ position: "relative", fontSize: "12px", top: "2px", right: "4px" }} /> Copy link
                        </span>
                    <span className="copy-span" style={{ fontSize: "13px" }} onClick={(e) => handleCloseDropdown(thread, i)}>
                        <FaTimesCircle style={{ position: "relative", fontSize: "12px", top: "2px", right: "12px" }} /> Cancel
                        </span>
                </div>}
            </div>
        </>
    )
}

export default Threads