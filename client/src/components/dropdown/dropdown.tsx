import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import "./dropdown.scss"
import { GoPlus } from 'react-icons/go';
import useFetch from "../../hooks/useFetch"
import CategoryActions from "../../actions/actions"
import { Link, useHistory } from "react-router-dom";
import { ThemeContext } from "../../context/contexts/themeContext"

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setState: React.Dispatch<React.SetStateAction<string>>,
  state: string


}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 160,

    },
    selectEmpty: {
      marginTop: theme.spacing(2),


    },
  }),
);

const Dropdown: React.FC<Props> = ({ setOpen, setState, state }) => {
  const classes = useStyles();
  const history = useHistory();
  const { dispatch: themeDispatch, themeData } = useContext(ThemeContext);
  const isMobile = window.innerWidth < 801



  const onStateChange = async (event: React.ChangeEvent<{ value: string }>) => {


    switch (event.target.value) {
      case '0':
        console.log('all was chosen');

        history.push({
          pathname: `/`,

        });
        setState("All")

        break;
      case '2':
        console.log('tech was chosen');

        let technology = 'Technology'
        setState(technology)
        console.log("VALUE", event.target.value)

        history.push({
          pathname: `/c/${event.target.value}/${technology}`,
          state: { category: event.target.value, header: technology, dropdownState: technology },

        });
        break;

      case '1':
        console.log('fitness was chosen');

        let fitness = 'Fitness'
        setState(fitness)

        console.log("VALUE", event.target.value)
        history.push({
          pathname: `/c/${event.target.value}/${fitness}`,
          state: { category: event.target.value, header: fitness, dropdownState: fitness },

        });
        break;

      case '3':
        console.log('sci was chosen');
        let science = 'Science'
        setState(science)
        history.push({
          pathname: `/c/${event.target.value}/${science}`,

          state: { category: event.target.value, header: science, dropdownState: science },

        });
        break;

      case '6':
        console.log('finance was chosen');
        let finance = 'Finance'
        setState(finance)
        history.push({
          pathname: `/c/${event.target.value}/${finance}`,

          state: { category: event.target.value, header: finance, dropdownState: finance },

        });
        break;

      case '4':
        console.log('travel was chosen');
        let travel = 'Travel'
        setState(travel)
        history.push({
          pathname: `/c/${event.target.value}/${travel}`,

          state: { category: event.target.value, header: travel, dropdownState: travel },

        });
        break;

      case '5':
        console.log('books was chosen');
        let books = 'Books'
        setState(books)
        history.push({
          pathname: `/c/${event.target.value}/${books}`,

          state: { category: event.target.value, header: books, dropdownState: books },

        });
        break;

      case '7':
        console.log('politics was chosen');
        let politics = 'Politics'
        setState(politics)
        history.push({
          pathname: `/c/${event.target.value}/${politics}`,
          state: { category: event.target.value, header: politics, dropdownState: politics },

        });
        break;

      case '8':
        console.log('programming was chosen');
        let programming = 'Programming'
        setState(programming)
        history.push({
          pathname: `/c/${event.target.value}/${programming}`,
          state: { category: event.target.value, header: programming, dropdownState: programming },

        });
        break;
      case '9':
        console.log('art was chosen');
        let art = 'Art'
        setState(art)
        history.push({
          pathname: `/c/${event.target.value}/${art}`,
          state: { category: event.target.value, header: art, dropdownState: art },

        });
        break;
      case '10':
        console.log('gaming was chosen');
        let gaming = 'Gaming'
        setState(gaming)
        history.push({
          pathname: `/c/${event.target.value}/${gaming}`,
          state: { category: event.target.value, header: gaming, dropdownState: gaming },

        });
        break;
      case '11':
        console.log('sports was chosen');
        let sports = 'Sports'
        setState(sports)
        history.push({
          pathname: `/c/${event.target.value}/${sports}`,
          state: { category: event.target.value, header: sports, dropdownState: sports },

        });
        break;
      default:
        break;
    }


  }




  const handleCreateThread = () => {

    history.push({ pathname: "/submit" });

  }

  return (
    <div className="dropdown-container">
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={state}
          onChange={onStateChange}
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'age' }}
          style={{ color: themeData.theme === "dark" ? ' #c9d1d9' : "black" }}
        >
          <option label="All" value="0">All</option>
          <option style={{ color: "black" }} label="Technology" value="2">Technology</option>
          <option style={{ color: "black" }} label="Fitness" value="1">Fitness</option>
          <option style={{ color: "black" }} label="Science" value="3">Science</option>
          <option style={{ color: "black" }} label="Finance" value="6">Finance</option>
          <option style={{ color: "black" }} label="Travel" value="4">Travel</option>
          <option style={{ color: "black" }} label="Books" value="5">Books</option>
          <option style={{ color: "black" }} label="Politics" value="7">Politics</option>
          <option style={{ color: "black" }} label="Programming" value="8">Programming</option>
          <option style={{ color: "black" }} label="Art" value="9">Art</option>
          <option style={{ color: "black" }} label="Gaming" value="10">Gaming</option>
          <option style={{ color: "black" }} label="Sports" value="11">Sports</option>

        </NativeSelect>

        <FormHelperText style={{ color: themeData.theme === "dark" ? ' #c9d1d9' : "black" }}>Change Category</FormHelperText>
      </FormControl>
      <button className="new-thread-button" onClick={() => handleCreateThread()}>
        <GoPlus style={{ position: "relative", right: "4px" }} /> New Thread
    </button>
    </div>
  );
}
export default Dropdown