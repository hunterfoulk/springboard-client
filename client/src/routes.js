
import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Navbar from "./components/navbar/navbar"
import Homepage from "./pages/homepage"
import ThreadResults from "./pages/threadResults"
import { createBrowserHistory } from "history";
import ThreadModal from "./components/modal/modal"
import Dropdown from "./components/dropdown/dropdown"
import Thread from "./pages/thread"
import Search from "./pages/search"
import { ThemeContext } from "./context/contexts/themeContext"
import CreateThread from "./pages/createThread"

function Routes() {
    const [open, setOpen] = useState(false)
    const [state, setState] = useState('All')
    const [recents, setRecents] = useState([])
    const { dispatch: themeDispatch, themeData } = useContext(ThemeContext);

    return (
        <Router >

            <div style={{ minHeight: "100%", width: "100%", display: "flex", alignItems: "center", flexDirection: 'column', backgroundColor: themeData.theme === 'light' ? 'rgb(248, 248, 248)' : '#121212' }}>
                <Navbar />
                <Dropdown setOpen={setOpen} setState={setState} />
                <ThreadModal open={open} setOpen={setOpen} />
                < Switch >
                    <Route path='/' component={Homepage} exact setState={setState} />
                    <Route path="/c/:category_id/:category" render={(props) => (
                        <ThreadResults {...props} setState={setState} state={state} recents={recents} setRecents={setRecents} />
                    )} exact />
                    <Route path='/t/:thread_id/:thread' component={Thread} exact setState={setState} recents={recents} setRecents={setRecents} />
                    <Route path='/search/:term' component={Search} exact />
                    <Route path='/submit' component={CreateThread} exact />

                </Switch>

            </div>

        </Router>
    );
}

export default Routes;