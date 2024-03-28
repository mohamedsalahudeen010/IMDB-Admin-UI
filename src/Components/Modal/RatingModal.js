import React, { useContext, useState } from 'react'
import { Button, Modal } from "react-bootstrap";
import Rating from '@mui/material/Rating';
import "./RatingModal.css"
import { Typography } from '@mui/material';
import { IMDBContext } from '../../Context';
import { updateRating } from '../../redux/Movies/moviesAction';
import { useDispatch } from 'react-redux';

function RatingModal({movie,show,handleClose}) {
  const [value, setValue] = useState(1);
  const {baseUrl}=useContext(IMDBContext)
const dispatch=useDispatch()
  const handleSubmit=()=>{
    let rating=(value+movie.rating)/2
    dispatch(updateRating(baseUrl,movie,rating))
  }
  return (
     <div className='project-modal' 
     style={show?{ display:'block'}:{display:"none"}}>

<Modal
     show={show} onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton
      className='modal-header' color='gold'>
        <Modal.Title id="contained-modal-title-vcenter"  className='modal-header-title'>
          Enter Your Rating
        </Modal.Title>
      </Modal.Header>
      <Modal.Body  className='modal-body' >
        <div className='row'>

          <div className='col-6 modal-body-left'>
        <img src= {movie.poster} alt={movie.name}></img>
          </div>

          <div className='col-6 modal-body-right'>
            <h2 className='movie-name'>{movie.movieName}</h2>
          <h3>Rate This</h3>
            <Rating
        name="customized-10" defaultValue={1} max={10}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      /> 
<div>
            <button type="submit" className='modal-footer-btn' onClick={()=>{handleSubmit()}}>Submit</button>
          </div>
          </div>
          
        </div>
      

        <div className='row'>

        <div className='modal-description'>
         

            </div>
          
        </div>
      </Modal.Body>
      <Modal.Footer
      className='modal-footer'>
        <Button onClick={handleClose} className='modal-footer-btn '>Close</Button>
      </Modal.Footer>
    </Modal>
          
          
     </div>
  )
}

export default RatingModal