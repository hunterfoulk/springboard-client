export const threadReducer = (state: any, action: any) => {
    console.log("reducer action", action)

    switch (action.type) {
        case 'UPDATE_THREADS':
            return {
                ...state,
                threads: action.threads,
                trendings: action.threads

            };

        case 'OPEN_DROPDOWN':
            return {
                ...state,
                threads: state.threads.map((thread: Thread, i: number) =>
                    thread.thread_id === action.id ? { ...thread, sharing: true } : thread
                ),
            };


        case 'CLOSE_DROPDOWN':
            return {
                ...state,
                threads: state.threads.map((thread: Thread, i: number) =>
                    thread.thread_id === action.id ? { ...thread, sharing: false } : thread
                ),
            };


        case 'SET_THREAD':
            return {
                ...state,
                thread: action.thread
            };


        case 'OPEN_REPLY':
            return {
                ...state,
                thread: {
                    ...state.thread,
                    comments: state.thread.comments.map((comment: Comment, i: number) =>
                        comment.comment_id === action.id ? { ...comment, replying: true } : comment
                    ),
                }
            };

        case 'CLOSE_REPLY':
            return {
                ...state,
                thread: {
                    ...state.thread,
                    comments: state.thread.comments.map((comment: Comment, i: number) =>
                        comment.comment_id === action.id ? { ...comment, replying: false } : comment
                    ),
                }
            };

        case 'OPEN_REPLIES':
            return {
                ...state,
                thread: {
                    ...state.thread,
                    comments: state.thread.comments.map((comment: Comment, i: number) =>
                        comment.comment_id === action.id ? { ...comment, repliesShow: !comment.repliesShow } : comment
                    ),
                }
            };

        case 'SET_COMMENTS':
            return {
                ...state,
                thread: {
                    ...state.thread,
                    comments: action.comments
                }
            };


        case 'SORT_COMMENTS_REPLIES':
            return {
                ...state,
                thread: {
                    ...state.thread,
                    comments: state.thread.comments.sort(function (b: any, a: any) {
                        return a.replies.length - b.replies.length;
                    })
                }
            };


        case 'SORT_COMMENTS_DATE':
            return {
                ...state,
                thread: {
                    ...state.thread,
                    comments: state.thread.comments.sort(function (b: any, a: any) {
                        return a.comment_id - b.comment_id;
                    })
                }
            };



        case 'CLEAR_RESULTS':
            return {
                ...state,
                trendings: [],
                threads: []
            };


        default:
            return state;
    }
};