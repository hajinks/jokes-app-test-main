import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { unrefDb } from "./database";
import { set, ref } from "firebase/database";

// Full list of all jokes in the database
function JokeList(props) {
  const jokes = props.jokes;
  const jokeList = Object.entries(jokes).map(([idx, jokeItem]) => (
    <ListItemDelete key={idx} idx={idx} jokeItem={jokeItem} />
  ));

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={10} style={{ margin: "auto" }}>
        <List>{jokeList}</List>
      </Grid>
    </Grid>
  );
}

// Extension of MUI ListItem that includes a delete button
function ListItemDelete(props) {
  // Deletes the joke row from the database
  function deleteJoke() {
    set(ref(unrefDb, props.idx), null);
  }

  return (
    <ListItem>
      <Button onClick={deleteJoke}>❌</Button>
      {props.jokeItem.joke}, {props.jokeItem.genre}
    </ListItem>
  );
}

export default JokeList;
