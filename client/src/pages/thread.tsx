import React, { useState, useContext, useEffect, useRef } from 'react'
import "./thread.scss"
import { ThreadContext } from "../context/contexts/threadContext"
import { ThemeContext } from "../context/contexts/themeContext"
import { Link, useHistory } from "react-router-dom";
import { useLocation, useRouteMatch } from "react-router-dom";
import CategoryActions from "../actions/actions"
import Moment from 'react-moment';
import CategoryCard from "../components/categoryCard/categoryCard"
import Loading from "../components/loading/loading"
import Sort from "../components/sortdropdown/sort"
import { FaCommentAlt } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useClickOutside from "../hooks/useClickOutside"
import Comment from "../components/comment/comment"
import { FaLink } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';

interface Props {
    thread: Thread
    recents: string[]
    setRecents: React.Dispatch<React.SetStateAction<any>>
}


const Thread: React.FC<Props> = ({ recents, setRecents }) => {
    const { dispatch: threadDispatch, threadData, } = useContext(ThreadContext);
    const { dispatch: themeDispatch, themeData, } = useContext(ThemeContext);
    const { fetchThread, fetchRecents, fetchCategoryImage, createComment } = CategoryActions();
    const history = useHistory();
    const location = useLocation<any>();
    const match = useRouteMatch<any>();
    const [thread, setThread] = useState<Partial<Thread>>({})
    const [image, setImage] = useState<string>("")
    const [title, setTitle] = useState<any>("")
    const [loading, setLoading] = useState<boolean>(true)
    const [count, setCount] = useState<number>(0)
    const [date, setDate] = useState<string>("")
    const [details, setDetails] = useState<string>("")
    const [comment, setComment] = useState("")
    const [dropId, setDropId] = useState<number | undefined>(undefined)
    const [shareDropdown, setShareDropdown] = useState(false)

    const ref = useRef()
    useClickOutside(ref, () => threadDispatch({ type: 'CLOSE_REPLY', id: dropId }))


    const onMount = async () => {

        let response = await fetchThread(match.params.thread_id)
        let imageResponse = await fetchCategoryImage(response.thread.category)

        console.log("response", imageResponse)
        await threadDispatch({ type: 'SET_THREAD', thread: response.thread });

        setImage(imageResponse)
        setTitle(response.thread.title)
        setDetails(response.thread.details)
        setCount(response.count)
        setDate(response.date)
        setLoading(false)

    }



    const handleCopyLink = () => {


        let url = `https://springboards.netlify.app/t/${thread.thread_id}/${thread.thread_title}`

        navigator.clipboard.writeText(url)
        setShareDropdown(false)
    }



    const handleCreateComment = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault()
        if (comment !== "") {
            let payload = {
                comment: comment,
                thread_id: match.params.thread_id
            }

            await createComment(payload)

            setComment("")
            toast.success('Comment Posted.', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            return
        }
    }


    console.log("THREAD TITLE", title)


    useEffect(() => {
        console.log("MOUNTED THREAD")
        onMount()

    }, [])




    useEffect(() => {
        onMount()


    }, [match.params.thread_id])



    return (
        <>
            {loading ? <Loading /> : <div className={`current-thread-main-${themeData.theme}`}>

                <div className="current-thread-main-left">
                    <div className="current-thread">
                        <div className="current-thread-header">
                            <div className="current-image-container">
                                <img src={image} />
                            </div>
                            <span>Posted by <span style={{ fontWeight: "bold" }}>u/{threadData.thread.user}</span></span>
                            <Moment fromNow className="date">{threadData.thread.date}</Moment>

                        </div>
                        <div className="current-title-container">
                            <span>{thread.thread_title}</span>
                        </div>
                        <div className="current-body-container">

                            <p>{threadData.thread.body}</p>
                        </div>
                        <div className="current-bottom-bar">
                            <FaCommentAlt style={{ position: "relative", top: "3.5px", color: "rgb(215, 46, 51)", marginRight: "3px" }} /><span style={{ fontSize: "14.5px", position: "relative", top: "0.5px" }}> {threadData.thread.comments?.length}</span> <span style={{ marginLeft: "5px" }}>Comments </span>
                            <FaShare style={{ position: "relative", top: "2px", color: "rgb(215, 46, 51)", marginLeft: "20px", marginRight: "3px" }} /> <span onClick={() => setShareDropdown(true)}>Share</span>
                            {shareDropdown && <div className="dropdown">
                                <span className="copy-span" style={{ fontSize: "13px" }} onClick={handleCopyLink}>
                                    <FaLink style={{ position: "relative", fontSize: "12px", top: "2px", right: "4px" }} /> Copy link
                        </span>
                                <span className="copy-span" style={{ fontSize: "13px" }} onClick={() => setShareDropdown(false)}>
                                    <FaTimesCircle style={{ position: "relative", fontSize: "12px", top: "2px", right: "12px" }} /> Cancel
                        </span>
                            </div>}
                            <MdReportProblem style={{ position: "relative", top: "2px", color: "rgb(215, 46, 51)", marginLeft: "20px", marginRight: "3px" }} /> <span>Report</span>


                        </div>
                        <div className="create-comment-container">
                            <form className="create-comment-form" onSubmit={(e) => handleCreateComment(e)}>
                                <textarea placeholder="Leave a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                                <div className="comment-button-container">
                                    <button type="submit">Comment</button>

                                </div>
                            </form>
                        </div>
                        <div>
                            <Sort />
                        </div>
                        <div className="thread-comment-container">
                            {threadData.thread.comments?.map((comment: Comment) => (
                                <>
                                    <Comment comment={comment} />

                                </>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="current-thread-main-right">
                    <CategoryCard image={image} title={title} count={count} date={date} details={details} />

                </div>

            </div>}
        </>
    )
}

export default Thread