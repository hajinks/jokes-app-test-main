import { Component } from "react";
import { push } from "firebase/database";
import { jokesDb } from "./database";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Component for adding a new joke with 'joke' and 'genre' inputs
class NewJoke extends Component {
  constructor(props) {
    super(props);
    this.state = { newJoke: "", newGenre: "" };

    this.handleChange = this.handleChange.bind(this);
    this.addJoke = this.addJoke.bind(this);
  }

  // Create a new joke without a genre
  addJoke(event) {
    event.preventDefault();
    const genre =
      this.state.newGenre === "" ? ["uncategorised"] : [this.state.newGenre];
    const newJoke = { joke: this.state.newJoke, genre: genre };
    // Push to the database
    push(jokesDb, newJoke);
    // Clear inputs
    this.setState({ newJoke: "", newGenre: "" });
  }

  // Generic change handler for handling joke and genre changes
  handleChange(event) {
    let change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  render() {
    return (
      <div className="newJoke" style={{ width: "500px" }}>
        <h4>Create a new joke:</h4>
        <form onSubmit={this.addJoke}>
          <TextField
            fullWidth
            label="Joke"
            name="newJoke"
            value={this.state.newJoke}
            onChange={this.handleChange}
          ></TextField>
          <br></br>
          <TextField
            label="Genre"
            name="newGenre"
            value={this.state.newGenre}
            onChange={this.handleChange}
          ></TextField>
          <p>
            <Button variant="contained" type="submit" value="Submit">
              Submit
            </Button>
          </p>
        </form>
      </div>
    );
  }
}

export default NewJoke;

// Example as a function component
// function NewJoke() {
//   const [newJoke, setNewJoke] = useState("");
//   const [newGenre, setNewGenre] = useState("");

//   function addJoke(event) {
//     // Create a new joke without a genre
//     event.preventDefault();
//     const genre = newGenre === "" ? ["uncategorised"] : [newGenre];
//     const joke = { joke: newJoke, genre: genre };
//     push(jokesDb, joke);
//   }
//   function handleJoke(event) {
//     setNewJoke(event.target.newJoke);
//   }
//   function handleGenre(event) {
//     setNewGenre(event.target.newGenre);
//   }

//   return (
//     <div className="newJoke">
//       <form onSubmit={addJoke}>
//         <label>
//           Joke:
//           <input type="text" value={newJoke} onChange={handleJoke}></input>
//         </label>
//         <label>
//           Genre:
//           <input type="text" value={newGenre} onChange={handleGenre}></input>
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     </div>
//   );
// }

// export default NewJoke;
