import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Loader from './Loader';

const MovieModal = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState({});
    const movieId = props.movieId;

    const getMovieDetails = (movieId) => {
      const api_key = process.env.REACT_APP_OMDB_API_KEY
      const api_url = process.env.REACT_APP_OMDB_URL
      const url = `${api_url}/?i=${movieId}&apikey=${api_key}`;

      fetch (
        url
      ).then(response => {
        return response.json();
      }).then( data=> {
        setMovieDetails(data);
        console.log(data);
      });


      // const response = await fetch(url);
      // responseJson = await response.json();

      // if (responseJson){
      //   console.log(responseJson);
      //   setMovieDetails(responseJson);
      // }

    };

    useEffect(() => {
        setIsLoading(true);
        if (props.open) {
          getMovieDetails(movieId);
        }
        setIsLoading(false);
    },[props.open]);

  if (isLoading) {
    console.log("loading...");
    return (
      <Modal size="lg" >
        <Modal.Header >
          <Modal.Title>Loading...</Modal.Title>
        </Modal.Header>
      </Modal>
    )
  }
  // if (isLoading) {
  //   console.log("loading...")
  // }
  return (
    <Modal size="lg" show={props.open} onHide={props.onClose}>
      <Modal.Header closeButton>
        {isLoading ? <Modal.Title>Loading...</Modal.Title> : <Modal.Title>{movieDetails.Title}</Modal.Title>}
        {/* <Modal.Title>{movieDetails.Title}</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
          <Image
              src={movieDetails.Poster}
              rounded
              className="m-3 mx-auto d-block"
              style={{border: "1px solid #555"}}
          />
          <Table hover>
          <thead>
              {/* <tr>
              <th>First Name</th>
              <th>Last Name</th>
              </tr> */}
          </thead>
          <tbody>
              <tr>
                  <td><b>Cast</b></td>
                  <td>{movieDetails.Actors}</td>
              </tr>
              <tr>
                  <td><b>Plot</b></td>
                  <td>{movieDetails.Plot}</td>
              </tr>
              <tr>
                  <td><b>Writer</b></td>
                  <td>{movieDetails.Writer}</td>
              </tr>
              <tr>
                  <td><b>Genre</b></td>
                  <td>{movieDetails.Genre}</td>
              </tr>
              <tr>
                  <td><b>Release Date</b></td>
                  <td>{movieDetails.Released}</td>
              </tr>
          </tbody>
          </Table>
      </Modal.Body>
    </Modal>
  );
}

export default MovieModal;