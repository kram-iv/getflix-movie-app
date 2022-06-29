import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchBox from './components/SearchBox';
import MovieList from './components/MovieList';
import './App.css';

const App = () => {
	const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState('star wars');

  const getMovieRequest = async() => {
    const api_key = process.env.REACT_APP_OMDB_API_KEY
    const api_url = process.env.REACT_APP_OMDB_URL
    const url = `${api_url}/?s=${searchMovie}&page=1&apikey=${api_key}`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search){
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest();
  },[searchMovie]);

  return (
		<>
      <Navbar variant="light" expand="lg" sticky="top" className="mb:3 color-nav">
        <Container fluid>
          <Navbar.Brand href="/" color="white">Getflix</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
            ></Nav>
            <SearchBox searchValue={searchMovie} setSearchValue={setSearchMovie} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <MovieList movies={movies} setMovies={setMovies}  searchValue={searchMovie}/>
    </>
  );
}

export default App;