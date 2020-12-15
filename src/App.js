import React, { Component, Fragment } from "react";
import "./styles.css";
import { Button } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      images: []
    };
  }

  onChange = (event) => {
    this.setState({ term: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const api_key = "pHvHgkYW4YG4BvZP2PFxTt92GsxdwhqR";
    // const url = `http://api.giphy.com/v1/gifs/search?q=${this.state.term}&api_key=${api_key}`;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${this.state.term}&limit=25&offset=0&rating=g&lang=en`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          term: "",
          images: response.data
        });
      })
      .catch((e) => console.log("error", e));
  };

  render() {
    const { images } = this.state;

    return (
      <Fragment>
        <div className="App">
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.term} onChange={this.onChange} />
            <Button className="btnSearch" variant="info" type="submit">
              Search!
            </Button>
          </form>
        </div>

        <div className="gifs">
          {images.map((gif) => (
            <div className="card" key={gif.id}>
              <img src={gif.images.original.url} alt={gif.title} />
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default App;
