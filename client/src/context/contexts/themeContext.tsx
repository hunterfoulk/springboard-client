import React, { createContext, useReducer, useEffect } from 'react';
import { themeReducer } from "../reducers/themeReducer"


export const ThemeContext = createContext<any>(undefined);

interface Props {
    children: any

}



export const ThemeContextProvider = ({ children }: Props) => {
    const initialState = {
        theme: "light"
    };
    const [themeData, dispatch] = useReducer(themeReducer, initialState);



    useEffect(() => {
        let theme = localStorage.getItem("theme")
        if (theme)
            dispatch({
                type: "CHANGE_THEME",
                theme: theme,
            })
    }, [])



    return (
        <ThemeContext.Provider value={{ themeData, dispatch }}>
            { children}
        </ThemeContext.Provider>
    );
};