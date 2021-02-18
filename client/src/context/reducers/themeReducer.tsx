export const themeReducer = (state: any, action: any) => {
    console.log("reducer action", action)

    switch (action.type) {
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: action.theme
            };



        default:
            return state;
    }
};