import React, { Component } from 'react';
import './App.css';
import Movie from './Movie.js';


// API1 한국영화진응원
// const API_KEY1 ="9a3ba8e87a8eaa8eacca8ed50f16f7ea";

// API2 The movie DB v3 auth
const API_KEY2 ="39c569be9c413ae8a3f9b9132f02cf18";
// API3 The movie DB 읽기 Access 토큰 
// const API_KEY3 ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWM1NjliZTljNDEzYWU4YTNmOWI5MTMyZjAyY2YxOCIsInN1YiI6IjVjOTE5MDkyYzNhMzY4NjExMTUxYWJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lO1bKvxTzduh_v839h9MjDFIgJVQHKKAUV3CLj5HNok"


class App extends Component {

  // Render : componentWillMount() -> render()  -> componentDidMount()
  // Update : componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate -> render() -> componentDidUpdate

  state = {};
  
  componentDidMount(){
    this._getMovies();
  }

  _renderMovies = () => {
    const _yy = (serchKey,objArr) => {
      const resultArr = objArr.filter(g => g.id === serchKey)
      return resultArr[0].name
    }
    const gnames = this.state.genresNames
    const movies = this.state.movies.map( movie => {
      return ( 
              <Movie 
                title={movie.title} 
                poster={"https://image.tmdb.org/t/p/w500".concat(movie.poster_path)} 
                key={movie.id}
                genres={movie.genre_ids.map(id => _yy(id,gnames))}
                overview={movie.overview}
              />
      )
    })
    return movies
  }

  _getMovies = async () => {
    const genresNames = await this._callGenresApi(); 
    const movies = await this._callApi()
    this.setState({
      movies,
      genresNames
    })
  }

  _callGenresApi = () => {
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?language=ko&api_key=${API_KEY2}`)
   .then(response => response.json())
   .then(json => json.genres) 
   .catch(err => console.log(err))
  }

  _callApi = () => {
    return fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY2}&page=1`)
    .then(response => response.json())
    .then(json => json.results)
    .catch(err => console.log(err))
  }


  render() {
    const { movies } = this.state;
    return (
      <div className= {movies ? "App" : "App-loading"}>
        {movies ? this._renderMovies() : 'Loading' }
      </div>
    );
  }
}



export default App;
