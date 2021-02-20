import React, { useContext, useState } from 'react'
import "./navbar.scss"
import { Link, useHistory } from "react-router-dom";
import ThemeSwitch from "../switch/themeSwitch"
import { ThemeContext } from "../../context/contexts/themeContext"
import { IoMdSearch } from 'react-icons/io';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { AiFillThunderbolt } from 'react-icons/ai';
import { IoMdTrendingUp } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import categoryActions from "../../actions/actions"
import Loading from "../loading/navLoader"
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import HomeIcon from '@material-ui/icons/Home';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";




interface Props {

}

const useStyles = makeStyles({
    list: {
        width: "200px",
        display: "flex",

        // backgroundColor: "rgb(248, 248, 248)",


    },
    fullList: {
        width: '210px',
        display: "flex",
        backgroundColor: "rgb(248, 248, 248)",
        background: "rgb(248, 248, 248)",
        // padding: "5px",
        marginLeft: "5px",
        marginTop: "5px"

    },
    paper: {
        background: "rgb(248, 248, 248)",
        width: "200px",
        display: "flex",
        fontWeight: "bold",

    }

});

const Navbar: React.FC<Props> = ({ }) => {

    const { dispatch: themeDispatch, themeData } = useContext(ThemeContext);
    const [term, setTerm] = useState("")
    const { fetchTrends } = categoryActions();
    const [trends, setTrends] = useState([])
    const [loading, setLoading] = useState(true)
    const [typing, setTyping] = useState(false)
    const [state, setState] = useState(false)
    const history = useHistory();
    const isMobile = window.innerWidth < 801
    const classes = useStyles();

    const home = () => {
        history.push({
            pathname: `/`,

        });
        setState(false)
    }

    const handleThemeChange = () => {
        localStorage.setItem("theme", themeData.theme === "light" ? "dark" : "light")
        themeDispatch({
            type: "CHANGE_THEME",
            theme: themeData.theme === "light" ? "dark" : "light",
        })
    }


    const handleChange = async (event: React.ChangeEvent<{ value: string }>) => {
        setTerm(event.target.value);
        if (window.innerWidth > 750) {


            if (typing === false) {
                setTyping(true)

                const trendingArr = await fetchTrends()
                console.log("trendings", trendingArr)

                setLoading(false)
                setTrends(trendingArr)
            }
        } else {
            return
        }
        console.log("event", event.target.value)



    };


    const handleThreadRoute = async (trend: any) => {
        let thread_id = trend.thread_id
        setTerm("")
        history.push({
            pathname: `/t/${thread_id}/${trend.thread_title}`,
            state: { id: thread_id, image: trend.image },

        });
    }

    const handleTermClick = async () => {
        setTerm("")
        history.push({
            pathname: `/search/${term}`,
            state: { term: term },

        });
    }






    return (
        <>
            <React.Fragment >
                <div>
                    <Drawer classes={{ paper: classes.paper }} open={state} onClose={() => setState(false)}>

                        <ListItem className={classes.fullList} button key="Test" onClick={home} >
                            <ListItemIcon><HomeIcon style={{ color: "#d72e33" }} /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>


                        <Divider />
                    </Drawer>

                </div>
            </React.Fragment>
            <div className={`navbar-${themeData.theme}`}>

                <div className="nav-left">
                    {isMobile ? <span style={{ cursor: "pointer", fontSize: "35px", marginLeft: "15px", position: "relative", top: "2px", left: "5px" }}><GiHamburgerMenu onClick={() => setState(true)} /></span> : <span style={{ cursor: "pointer", marginLeft: "15px" }} onClick={home}>Springboards</span>}

                </div>
                <div className="nav-middle">
                    <form onSubmit={() => handleTermClick()}>
                        <input type="text" value={term} onChange={handleChange} />
                    </form>
                    {term !== "" && window.innerWidth > 750 && <div className="search-dropdown">
                        <div className="term-container">
                            <div className="term-icon-container">
                                <span><IoMdSearch /></span>
                            </div>
                            <div className="term-text-container" onClick={() => handleTermClick()}>
                                <span>
                                    {term}
                                </span>
                            </div>
                            <div className="close-term-container">
                                <span><IoIosCloseCircleOutline onClick={() => setTerm("")} /></span>
                            </div>
                        </div>
                        <div className="trending-header">
                            <span className="trending-icon"><AiFillThunderbolt /></span>
                            <span>Trending Threads</span>
                        </div>
                        <div className="trends-container">
                            {loading ? <Loading /> : <div className="trend-container">{trends.map((trend: any) => (
                                <div className="trend" onClick={() => handleThreadRoute(trend)}>
                                    <div className="trend-title">
                                        <span className="trend-chart-icon">
                                            <IoMdTrendingUp />
                                        </span>
                                        <span>
                                            {trend.thread_title}
                                        </span>
                                    </div>
                                    <div className="trend-body">
                                        <span>{trend.body}</span>
                                    </div>
                                    <div className="trend-footer">
                                        <div className="image-container">
                                            <img src={trend.image} />
                                        </div>
                                        <span>t/{trend.title.charAt(0).toUpperCase() + trend.title.slice(1)}</span>

                                    </div>
                                </div>
                            ))}</div>}
                        </div>
                    </div>}
                </div>
                <div className="nav-right">

                    <ThemeSwitch
                        size="medium"
                        onChange={handleThemeChange}
                        checked={themeData.theme === "light"}
                    />
                </div>
            </div>
        </>
    )
}

export default Navbar