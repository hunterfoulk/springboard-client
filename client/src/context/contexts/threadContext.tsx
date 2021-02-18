import React, { createContext, useReducer } from 'react';
import { threadReducer } from "../reducers/threadReducer"


export const ThreadContext = createContext<any>(undefined);

interface Props {
    children: any

}



export const ThreadContextProvider = ({ children }: Props) => {
    const initialState = {
        threads: [],
        trendings: [],
        thread: {},
        loading: true,
        header: ""
    };
    const [threadData, dispatch] = useReducer(threadReducer, initialState);

    return (
        <ThreadContext.Provider value={{ threadData, dispatch }}>
            { children}
        </ThreadContext.Provider>
    );
};