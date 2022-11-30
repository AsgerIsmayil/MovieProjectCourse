import React, { Component } from "react";
import "./Favorites.css";
import { connect } from "react-redux";
import {removeToMovie} from "../../redux/action/action";
import {Link} from "react-router-dom"

class Favorites extends Component {
  state = {
    title: "",
    textLink: '#',
    inputActive: true,
    linkActive: false
  };



  handleInput = (e) => {
    this.setState({title: e.target.value});
  };

  handleSaveList = () => {
    this.setState({
      inputActive: false,
      linkActive: true
    });
    this.saveMovies();
  };


  saveMovies = () => {
    fetch("https://acb-api.algoritmika.org/api/movies/list",
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          "title": this.state.title,
          "movies": this.props.listMovies.map(el => el.imdbID)
        })
      })
      .then(res => res.json())
      .then(data => {
        this.setState({textLink: data.id})
      })
  };




  render() {
    return (
      <div className="favorites">
        <input value={this.state.title} onChange={this.handleInput}
              disabled={this.state.inputActive ? null : "disabled"}  className="favorites__name" placeholder="Создать список" />
        <ul className="favorites__list">
          {this.props.listMovies.map((item) => {
            return (
              <li className="favorites__list--item" key={item.imdbID}>
                <p className="favorites__list--title">{item.Title} {item.Year}</p>
                <button className="favorites__list--delete" onClick={() => this.props.removeMovie(item.imdbID)}>X</button>
              </li>
            );
          })}
        </ul>
        <button type="button" onClick={() => this.handleSaveList()}
                disabled= {!this.state.title || this.props.listMovies.length === 0}
                className={`favorites__save ${this.state.linkActive ? "link__none" : null}`}>
          Сохранить список
        </button>
        <Link to={`list/${this.state.textLink}`}
           className={`link__none ${this.state.linkActive ? "link__block" : null}` } target='_blank'
           >Поделиться с друзьями</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listMovies: state.listMovies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeMovie: (id) => dispatch(removeToMovie(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);