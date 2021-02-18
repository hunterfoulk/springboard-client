export const searchReducer = (state: any, action: any) => {
    console.log("reducer action", action)

    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.searchResults
            };


        case 'OPEN_DROPDOWN':
            return {
                ...state,
                searchResults: state.searchResults.map((thread: Thread, i: number) =>
                    thread.thread_id === action.id ? { ...thread, sharing: true } : thread
                ),
            };


        case 'CLOSE_DROPDOWN':
            return {
                ...state,
                searchResults: state.searchResults.map((thread: Thread, i: number) =>
                    thread.thread_id === action.id ? { ...thread, sharing: false } : thread
                ),
            };


        default:
            return state;
    }
};