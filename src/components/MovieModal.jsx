import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Loader from './Loader';

const MovieModal = (props) => {
    const [movieDetails, setMovieDetails] = useState({});
    const movieId = props.movieId;
    let responseJson;

    const getMovieDetails = async(movieId) => {
      const api_key = process.env.REACT_APP_OMDB_API_KEY
      const api_url = process.env.REACT_APP_OMDB_URL
      const url = `${api_url}/?i=${movieId}&apikey=${api_key}`;
      const response = await fetch(url);
      responseJson = await response.json();

      if (responseJson){
        console.log(responseJson);
        setMovieDetails(responseJson);
      }

    };

    useEffect(() => {
        if (props.open) {
          getMovieDetails(movieId);
        }
    },[props.open]);

    // useEffect(() => {
    //     if (null === movieDetails) {
    //         return;
    //     }
    // }, [movieDetails]);
  return (
    <>
      <Modal size="lg" show={props.open} onHide={props.onClose}>
        <Modal.Header closeButton>
          { !movieDetails ? <Loader/> : null}
          <Modal.Title>{movieDetails.Title}</Modal.Title>
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

    </>
  );
}

export default MovieModal;