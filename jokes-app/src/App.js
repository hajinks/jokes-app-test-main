import "./App.css";
import { useState } from "react";
import NewJoke from "./newJoke";
import { jokesDb } from "./database";
import { onValue /*, update*/ } from "firebase/database";
import Button from "@mui/material/Button";
import JokeList from "./jokeList";

// React app
function App() {
  // Get a random joke
  function getJoke(jokes) {
    const jokesKeys = Object.keys(jokes);
    const i = Math.floor(Math.random() * jokesKeys.length);
    const idx = jokesKeys[i];

    return jokes[idx];
  }

  // Display the next random joke
  function nextJoke() {
    const { joke, genre } = getJoke(jokes);
    setJoke(joke);
    setGenre(genre);
  }

  // Read database and listen for realtime updates
  let jokes;
  onValue(jokesDb, (snapshot) => {
    jokes = snapshot.val();
  });

  // Update a joke (add a genre) example
  // const updateJoke = function(genre, idx, joke, db) {
  //   const updates = {}
  //   const newGenre = [genre, ...joke['genre']]
  //   if (newGenre.length > 1 && newGenre.includes('uncategorised')) {
  //     newGenre.pop('uncategorised')
  //   }
  //   // const newGenre = [genre, ...joke['genre']]
  //   // if (genre != 'uncategorised' && newGenre.includes('uncategorised')) {
  //   //   newGenre.pop('uncategorised')
  //   // }
  //   updates[idx + '/genre'] = newGenre
  //   return update(db, updates)
  // }
  // updateJoke('new', '1', jokes['1'], jokesDb)

  // Initialise joke states
  const [joke, setJoke] = useState("Press Next to get a joke");
  const [genre, setGenre] = useState("");

  // Toggle displaying all jokes
  const [showAll, setShowAll] = useState(false);
  function toggleShow() {
    setShowAll(!showAll);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Joke: {joke}</p>
        {genre !== "" && <p>Genre: {genre}</p>}
        <Button variant="contained" onClick={nextJoke}>
          Next
        </Button>
        <NewJoke />
        <Button variant="contained" onClick={toggleShow}>
          {showAll ? "Hide" : "Show"} All
        </Button>
        {showAll && <JokeList jokes={jokes} />}
      </header>
    </div>
  );
}

export default App;
