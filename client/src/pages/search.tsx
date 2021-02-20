import React, { useContext, useEffect, useState, useRef } from 'react'
import { ThemeContext } from "../context/contexts/themeContext"
import { SearchContext } from "../context/contexts/searchContext"
import categoryActions from "../actions/actions"
import Loading from "../components/loading/loading"
import { useLocation, useRouteMatch } from "react-router-dom";
import "./search.scss"
import Moment from 'react-moment';
import { FaCommentAlt } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa';
import { FaLink } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';
import { Link, useHistory } from "react-router-dom";


interface Props {

}

const Search: React.FC<Props> = ({ }) => {
    const { dispatch: themeDispatch, themeData } = useContext(ThemeContext);
    const { dispatch: searchDispatch, searchData } = useContext(SearchContext);
    const { searchThreads } = categoryActions();
    const [loading, setLoading] = useState(true)
    const location = useLocation<any>();
    const match = useRouteMatch<any>();
    const ref = useRef<any>();
    const [dropId, setDropId] = useState("")
    const history = useHistory();

    const onMount = async () => {
        await searchThreads(match.params.term)
        setLoading(false)
    }

    useEffect(() => {
        onMount()
    }, [])

    useEffect(() => {
        onMount()
    }, [match.params.term])

    const handleShareToggle = (thread: any, i: number) => {
        console.log("thread", thread.thread_id)
        let thread_id = thread.thread_id
        console.log("thread index", thread_id)
        setDropId(thread_id)
        searchDispatch({ type: 'OPEN_DROPDOWN', id: thread_id });

    }


    const handleCopyLink = (e: any, thread: any) => {
        // console.log("thread clicked", thread_id)

        console.log(e.target)
        let url = `https://springboards.netlify.app/t/${thread.thread_id}/${thread.thread_title}`
        navigator.clipboard.writeText(url)
        setDropId("")
        searchDispatch({ type: 'CLOSE_DROPDOWN', id: thread.thread_id });
    }

    const handleCloseDropdown = (thread: any, i: number) => {
        let thread_id = thread.thread_id
        console.log("thread id", thread_id)
        setDropId("")
        searchDispatch({ type: 'CLOSE_DROPDOWN', id: thread_id });
    }



    const handleThreadRoute = async (thread: any) => {
        let thread_id = thread.thread_id

        history.push({
            pathname: `/t/${thread_id}/${thread.thread_title}`,
            state: { id: thread_id, image: thread.image },

        });


    }


    return (
        <>

            {loading ? <Loading /> :
                <div className="search-main">
                    {searchData.searchResults.length === 0 ? <span style={{ textAlign: "center" }}>no results found for "{match.params.term}"</span> :


                        <>
                            {
                                searchData.searchResults.map((thread: any, i: number) => (
                                    <div className={`thread-search-${themeData.theme}`} >
                                        <div className="user-container">
                                            <div className="image-container">
                                                <img src={thread.image} />
                                            </div>
                                            <span  >Posted by <span >u/{thread.user}</span></span>
                                            <Moment fromNow className="date">{thread.date}</Moment>
                                        </div>

                                        <div className="thread-title" onClick={() => handleThreadRoute(thread)}>
                                            <span>{thread.thread_title}</span>
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
                                ))
                            }
                        </>
                    }



                </div>}

        </>
    )
}

export default Search