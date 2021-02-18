import React, { useContext } from 'react'
import "./cards.scss"
import Moment from 'react-moment';
import { triggerAsyncId } from 'async_hooks';
import { Link, useHistory } from "react-router-dom";
import { ThemeContext } from "../../context/contexts/themeContext"

interface Props {
    card: Category
    setState: React.Dispatch<React.SetStateAction<string>>

}

const Card: React.FC<Props> = ({ card, setState }) => {
    const history = useHistory();
    const { dispatch: themeDispatch, themeData } = useContext(ThemeContext);

    const handleRoute = async (card: any) => {
        let category = card.title.charAt(0).toUpperCase() + card.title.slice(1)
        console.log("PUSH", category)
        console.log("id", card.category_id)
        // await setState(category)
        history.push({
            pathname: `/c/${card.category_id}/${category}`,
            state: { category: card.category_id, header: category, dropdownState: category },

        });

    }

    const handleThreadRoute = async (thread: Thread) => {

        history.push({
            pathname: `/t/${thread.thread_id}/${thread.thread_title}`,
            state: { id: thread.thread_id },

        });

    }


    return (
        <>
            <div className={`card-${themeData.theme}`}>
                <div className="card-left">
                    <div className="image-container">

                        <img src={card.image} />

                    </div>
                    <div className="title-container">
                        <span onClick={() => handleRoute(card)}>{card.title.charAt(0).toUpperCase() + card.title.slice(1)}</span>
                        <p>{card.details}</p>
                    </div>
                </div>
                <div className="card-right">
                    <div className="recent-threads-text">
                        <span>
                            Recent Threads
                        </span>


                    </div>
                    <div className="recent-threads-container">

                        {card.threads.length === 0 ? <span className="no-threads">No threads currently posted.</span> :
                            card.threads.map((thread) => {
                                card.threads.length = 3
                                const output = thread.thread_title.split('', 26).reduce((o, c) => o.length === 25 ? `${o}${c}...` : `${o}${c}`, '')
                                return (
                                    <div className="recent-thread">

                                        <span className="recent-thread-title" onClick={() => handleThreadRoute(thread)}>{output}</span>
                                        <Moment fromNow className="date">{thread.date}</Moment>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card