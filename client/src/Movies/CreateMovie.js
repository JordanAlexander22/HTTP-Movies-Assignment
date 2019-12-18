import React, { Component } from "react";
import axios from "axios";
class CreateMovie extends Component {
  state = {
    title: "",
    director: "",
    metaScore: 0,
    actor: "",
    stars: []
  };
  handleAddstars = () => {
    const { stars } = this.state;
    stars.push(this.state.actor);
    this.setState({ actor: "", stars });
  };
  handleTextInput = event => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmitMovie = () => {
    const { stars, title, metaScore, director } = this.state;
    const newMovie = { stars, title, metaScore, director };
    axios
      .post("http://localhost:3333/api/movies", newMovie)
      .then(response => {
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Movie Title"
          value={this.state.title}
          onChange={this.handleTextInput}
          name="title"
        />
        <input
          type="text"
          placeholder="Director"
          value={this.state.director}
          onChange={this.handleTextInput}
          name="director"
        />
        <input
          type="text"
          placeholder="Meta Score"
          value={this.state.metaScore}
          onChange={this.handleTextInput}
          name="metaScore"
        />
        <input
          type="text"
          placeholder="..Add actor"
          value={this.state.actor}
          onChange={this.handleTextInput}
          name="actor"
        />
        <button onClick={this.handleAddstars}>Add Actor to List</button>
        <button onClick={this.handleSubmitMovie}>Save Movie</button>
        {this.state.stars.map(actor => {
          return <div>{actor}</div>;
        })}
      </div>
    );
  }
}
export default CreateMovie;