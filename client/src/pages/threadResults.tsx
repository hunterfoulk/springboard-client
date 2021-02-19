import React, { useEffect, useState, useContext } from 'react'
import "./threadresults.scss"
import { useLocation, useRouteMatch } from "react-router-dom";
import Threads from "../components/threads/threads"
import { ThreadContext } from "../context/contexts/threadContext"
import { ThemeContext } from "../context/contexts/themeContext"
import CategoryActions from "../actions/actions"
import Loading from "../components/loading/loading"
import TrendingCard from "../components/trending/trendingCard"
import RecentCard from "../components/recentsCard/recentsCard"
import { Link, useHistory } from "react-router-dom";


interface Props {
    state: string,
    setState: React.Dispatch<React.SetStateAction<string>>
    thread: Thread
    recents: any
    setRecents: React.Dispatch<React.SetStateAction<[]>>
}

const ThreadResults: React.FC<Props> = ({ state, setState, recents, setRecents }) => {
    const location = useLocation<any>();
    const match = useRouteMatch<any>();
    const [header, setHeader] = useState("")
    const [image, setImage] = useState<string>("")
    const { dispatch: threadDispatch, threadData } = useContext(ThreadContext);
    const { dispatch: themeDispatch, themeData } = useContext(ThemeContext);

    const { fetchThreads, fetchCategoryImage, fetchRecents, fetchThread } = CategoryActions();
    const [loading, setLoading] = useState<boolean>(true)
    const history = useHistory();

    const onMount = async () => {
        await fetchThreads(match.params.category_id)
        let image = await fetchCategoryImage(match.params.category_id)
        setHeader(match.params.category)
        setImage(image)
        setState(match.params.category)

        await pushRecentArray()
        setLoading(false)

    }

    const pushRecentArray = async () => {

        var storedNames = await JSON.parse(localStorage.getItem("names") || '[]');


        const some = (element: any) => element.title === match.params.category.toLowerCase();

        if (storedNames.some(some)) {
            setRecents(storedNames)

        } else {
            setTimeout(async () => {
                let recent = await fetchRecents(match.params.category)

                storedNames.push(recent)

                localStorage.setItem("names", JSON.stringify(storedNames));
                setRecents(storedNames)

            }, 1000);
        }

        console.log("storedddd", storedNames)


    }

    useEffect(() => {

        onMount()

        return () => {
            threadDispatch({ type: 'CLEAR_RESULTS' });

            setState("All")

        }
    }, [])

    useEffect(() => {
        console.log("state changed")
        onMount()
    }, [state])




    return (
        <>
            {loading ? <Loading /> : <div className="thread-results-main" style={{ backgroundColor: themeData.theme === "dark" ? "#121212" : "rgb(248, 248, 248)" }}>
                <div className="header-container">
                    <div className="header-left">
                        <div className="image-container">
                            <img src={image} />
                        </div>
                    </div>
                    <div className="header-right">
                        <span style={{ color: themeData.theme === "dark" ? "#c9d1d9" : "black" }}>{header}</span>
                        <p style={{ color: themeData.theme === "dark" ? "#c9d1d9" : "black" }}>/t/{header}</p>
                    </div>
                </div>
                <div className="threads-bottom">
                    <div className="threads-container">
                        {threadData.threads.length === 0 ? <span style={{ textAlign: "center" }}>There are currently no threads.</span> :
                            threadData.threads.map((thread: Thread, i: number) => (
                                <>
                                    <Threads thread={thread} i={i} image={image} />
                                </>
                            ))
                        }

                    </div>
                    <div className="trendings-container">

                        {threadData.threads.length === 0 ? null : <TrendingCard />}
                        <RecentCard recents={recents} />
                    </div>
                </div>
            </div>}

        </>
    )
}

export default ThreadResults