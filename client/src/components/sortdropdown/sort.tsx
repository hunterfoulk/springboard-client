import React, { useContext, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { ThreadContext } from "../../context/contexts/threadContext"
import { ThemeContext } from "../../context/contexts/themeContext"


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 70,
            height: 50,
            fontSize: "10px",
            padding: "0px",


        },
        selectEmpty: {
            marginTop: theme.spacing(2),
            padding: "0px",
            // backgroundColor: "green",
            height: 20,
            fontSize: "14px"
        },
    }),
);

export default function NativeSelects() {
    const classes = useStyles();
    const [state, setState] = React.useState<{ age: string | number; name: string }>({
        age: '',
        name: 'hai',
    });
    const { dispatch: threadDispatch, threadData } = useContext(ThreadContext);
    const { dispatch: themeDispatch, themeData } = useContext(ThemeContext);


    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof state;
        setState({
            ...state,
            [name]: event.target.value,
        });

        switch (event.target.value) {
            case "New":
                console.log("NEW FIRED")


                threadDispatch({ type: 'SORT_COMMENTS_DATE' })

                break;
            case "Top":
                console.log("TOP FIRED")
                threadDispatch({ type: 'SORT_COMMENTS_REPLIES' })

                break;
            default:
                break;
        }
    };



    return (

        <FormControl className={classes.formControl}>
            <NativeSelect
                value={state.age}
                onChange={handleChange}
                name="age"
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'age' }}
                style={{ color: themeData.theme === "dark" ? ' grey' : "black" }}
            >
                <option value="Top">Top</option>
                <option value="New">New</option>

            </NativeSelect>
            <FormHelperText style={{ color: themeData.theme === "dark" ? ' grey' : "black" }}>Sort by</FormHelperText>
        </FormControl>
    )
}