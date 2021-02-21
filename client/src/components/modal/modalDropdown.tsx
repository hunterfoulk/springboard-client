import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { GoPlus } from 'react-icons/go';
import "../modal/modal.scss"
import { ThemeContext } from "../../context/contexts/themeContext"

interface Props {
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>

}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 160,
            color: "red"

        },
        selectEmpty: {
            marginTop: theme.spacing(2),


        },
    }),
);

const Dropdown: React.FC<Props> = ({ category, setCategory }) => {
    const classes = useStyles();


    const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
        setCategory(event.target.value);

        console.log("event", event.target.value)
    };


    console.log("this is the state", category)

    return (
        <div className="modal-dropdown-container">
            <FormControl className={classes.formControl}>
                <NativeSelect
                    value={category}
                    onChange={handleChange}
                    // className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'age' }}
                >
                    <option value={0}>None</option>
                    <option value={2}>Technology</option>
                    <option value={1}>Fitness</option>
                    <option value={3}>Science</option>
                    <option value={6}>Finance</option>
                    <option value={4}>Travel</option>
                    <option value={5}>Books</option>
                    <option value={8}>Programming</option>
                    <option value={9}>Art</option>
                    <option value={10}>Gaming</option>
                    <option value={11}>Sports</option>

                </NativeSelect>
                <FormHelperText>Change Category</FormHelperText>
            </FormControl>
        </div>
    );
}
export default Dropdown