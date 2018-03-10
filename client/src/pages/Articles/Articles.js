import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import moment from "moment";
// import { Link } from "react-router-dom";
import { Col, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    title: "",
    url: "",
    synopsis: "",
    date: "",
    startYear: "",
    endYear: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", url: "", synopsis: "", date: "",})
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSaveArticle = event => {
    event.preventDefault();
    if (this.state.title && this.state.url) {
      API.saveArticle({
        title: this.state.title,
        url: this.state.url,
        synopsis: this.state.synopsis,
        date: this.state.date
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

  handleNYTScrape = (event) => {
    event.preventDefault();
    const {startYear, endYear, title} = this.state
    const articleParams = {
      startYear,
      endYear,
      title
    }
    API.scrapeArticles(articleParams).then((articleData) => {
      console.log(articleData);
      this.setState({articles: articleData.data});
    })
  }

  render() {
    return (
      <Container fluid>
        <Jumbotron id="search">
          <Col size="md-12 sm-12">
              <h1 id="header">Search</h1>
                <form>
                  <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Topic (required)"
                  />
                  <Input
                    value={this.state.startYear}
                    onChange={this.handleInputChange}
                    name="startYear"
                    placeholder="Start Year (required)"
                  />
                  <Input
                    value={this.state.endYear}
                    onChange={this.handleInputChange}
                    name="endYear"
                    placeholder="End Year (required)"
                  />
                  <FormBtn
                    disabled={!(this.state.title && this.state.startYear && this.state.endYear)}
                    onClick={this.handleNYTScrape}
                  >
                    Search
                  </FormBtn>
                </form>
            </Col>
        </Jumbotron>

          <Col size="md-12 sm-12">
              <h1>Results</h1>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                      <h3>{`${article.headline.main}`}</h3>
                      <h4>{`${moment(article.pub_date).fromNow()}`}</h4>
                      <p>{`${article.snippet}`}</p>
                      <a href={`${article.web_url}`}>
                          <strong>
                            {`${article.web_url}`}
                          </strong>
                      </a>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
      </Container>
    );
  }
}

export default Articles;
