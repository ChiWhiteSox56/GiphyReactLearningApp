import React, { Component, Fragment } from "react";
import "./styles.css";
import { Button, Card } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      images: []
    };
  }

  componentDidMount() {
    this.onlaunch();
  }

  onlaunch = (event) => {
    const api_key = "pHvHgkYW4YG4BvZP2PFxTt92GsxdwhqR";
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&&rating=g&lang=en`;
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

  onChange = (event) => {
    this.setState({ term: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const api_key = "pHvHgkYW4YG4BvZP2PFxTt92GsxdwhqR";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${this.state.term}&rating=g&lang=en`;
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

    const renderCard = (gif, index) => {
      return (
        <Card border="info" key={index} className="card">
          <Card.Img
            variant="top"
            key={index}
            src={gif.images.original.url}
            alt={gif.title}
          />
          <Card.Body>
            <Card.Title>{gif.title}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Copy URL</Button>
          </Card.Body>
        </Card>
      );
    };

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

        <div className="grid">{images.map(renderCard)}</div>
      </Fragment>
    );
  }
}

export default App;
