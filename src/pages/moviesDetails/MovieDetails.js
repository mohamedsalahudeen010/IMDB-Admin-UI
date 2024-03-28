import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import React, { useState, useEffect, useContext } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./MovieDetails.css";
import PersonalCard from "../../Components/personalCard/PersonalCard";
import NavBar from "../../Components/NavBar/NavBar";
import RatingModal from "../../Components/Modal/RatingModal";
import Footer from "../../Components/Footer/Footer";
import { IMDBContext } from "../../Context";
export function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const{baseUrl}=useContext(IMDBContext)
  const navigate = useNavigate();
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  
  useEffect(() => {
    fetch(`${baseUrl}/movies/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((movies) => setMovie(movies));
  }, []);
  const styles = {
    color: movie.rating > 8.5 ? "green" : "red",
  };

  return (
    <div className="movie-detail-page">
      <NavBar></NavBar>
      <div className="movie-detail-page-main">
      <div className="movie-detail-page-poster">
      <img src={movie.poster} alt={movie.name}
      width="100%"
      height="600"></img>
      </div>
      <div>
      <iframe
        width="100%"
        ipp
        height="600"
        src={movie.trailer}
        title={movie.name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      </div>
      </div>

<div className="movie-detail row">

<div className="col"><PersonalCard name={movie.leadActorName} img={movie.leadActorImage}
        role={"Actor"}/></div>
        <div className="col"><PersonalCard name={movie.actorName} img={movie.actorImage}
        role={"Actor"}/></div>
        <div className="col"><PersonalCard name={movie.directorName} img={movie.directorImage}
        role={"Director"}/></div>
        <div className="col"><PersonalCard name={movie.musicDirectorName} img={movie.musicDirectorImage}
        role={"Music Director"}/></div>
        <div className="col"><PersonalCard name={movie.producerName} img={movie.producerImage}
        role={"Producer"}/></div>
       
</div>
    
      <div className="movie-detail row">
        <div className="movie-detail-container ">
          <div className="movie-specs col">
            <h2 className="movie-name">{movie.movieName}</h2>
            <p style={styles} className="movie-rating">
              ⭐{movie.rating}{" "}<span>/10</span>
            </p>
            <p className="your-rating"
            onClick={()=>setShow(!show)}>
              <span>Your Rating </span>
              ⭐
            </p>
          </div>
          <p className="movie-summary">{movie.summary}</p>
          <Button
            startIcon={<KeyboardBackspaceIcon />}
            variant="contained"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </div>
        <div className="movie-detail-container ">
          <div className="movie-specs col">
            <h2 className="movie-name">{movie.name}</h2>
            
          </div>
          <p className="movie-summary">{movie.summary}</p>
          <Button
            startIcon={<KeyboardBackspaceIcon />}
            variant="contained"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </div>
      </div>
     {show? <div className="rating-paper">
      <RatingModal
      show={show}
      handleClose={handleClose}
      movie={movie}/>
      </div>:null}
      <Footer/>
    </div>
  );
}
