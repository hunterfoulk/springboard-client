import React, { createContext, useReducer } from 'react';
import { searchReducer } from "../reducers/searchReducer"


export const SearchContext = createContext<any>(undefined);

interface Props {
    children: any

}



export const SearchContextProvider = ({ children }: Props) => {
    const initialState = {
        searchResults: [],


    };
    const [searchData, dispatch] = useReducer(searchReducer, initialState);

    return (
        <SearchContext.Provider value={{ searchData, dispatch }}>
            { children}
        </SearchContext.Provider>
    );
};