import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import MovieModal from './MovieModal';
import Loader from './Loader';

const MovieList = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [movieId, setMovieId] = useState('');
    const [hasMore, sethasMore] = useState(true);
    const [page, setpage] = useState(2);

    const fetchNextMovies = async () => {
      const api_key = process.env.REACT_APP_OMDB_API_KEY
      const api_url = process.env.REACT_APP_OMDB_URL
      const res = await fetch(
        `${api_url}/?s=${props.searchValue}&page=${page}&apikey=${api_key}`
      );
      const nextPageMovies = await res.json();
      return nextPageMovies;
    };

    const fetchData = async () => {
      const nextPageMovies = await fetchNextMovies();
      if (nextPageMovies.Error) {
        sethasMore(false);
        return;
      }
      console.log(nextPageMovies.Search);

      props.setMovies([...props.movies, ...nextPageMovies.Search]);
      if ( nextPageMovies.Search.length === 0 || nextPageMovies.Search.length < 10 ) {
        sethasMore(false);
      }
      setpage(page + 1);
    };

    function setMovieHandler(movieId) {
        setMovieId(movieId);
    }

    function showModalHandler(movieId) {
        setModalIsOpen(true);
        setMovieId(movieId);
    }

    function closeModalHandler() {
        setModalIsOpen(false);
    }

	return (
		<>
      <InfiniteScroll
      dataLength={props.movies.length} //This is important field to render the next data
      next={fetchData}
      hasMore={hasMore}
      loader={<Loader/>}
      endMessage={
          <p style={{ textAlign: 'center', color:'white' }}>
          <b>Yay! You have seen it all</b>
          </p>
      }
      >
        <Container fluid="sm">
          <Row>
            {props.movies.map((movie, index) => (
              // <div key={movie.imdbID} className='image-container d-flex justify-content-start m-3'>
              // 	<img src={movie.Poster} alt='movie'></img>
              // </div>
                  <Card border="secondary"
                    key={movie.imdbID}
                    style={{ width: '18rem', paddingLeft: 0, paddingRight: 0, cursor: "pointer" }}
                    className="m-3 card"
                    onClick={() => {showModalHandler(movie.imdbID)}}  // setMovieHandler(movie.imdbID)
                  >
                  <Card.Img style={{  height: '100%', width:'100%' }} border="secondary" variant="top" src={movie.Poster} />
                  <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Text>
                      {movie.Year}
                      </Card.Text>
                  </Card.Body>
                  </Card>
            ))}
          </Row>
        </Container>
      </InfiniteScroll>
        {modalIsOpen && <MovieModal movieId={movieId} open={modalIsOpen} onClose={closeModalHandler} />}
		</>
	);
};

export default MovieList;