
import { useContext, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Counter } from '../counter/Counter';
import "./MovieCard.css"
import { useDispatch } from 'react-redux';
import {  fetchdeleteOneMovie } from '../../redux/Movies/moviesAction';
import { IMDBContext } from '../../Context';



export function MovieCard({ movie, id , wishList}) {

    const dispatch=useDispatch()
    const{baseUrl,handleSuccess,handleFailure}=useContext(IMDBContext)

    const styles = {
        color: movie.rating >= 8.5 ? "green" :movie.rating >=5?"orange":"red"
    };

    const handleDelete=(id)=>{
        dispatch(fetchdeleteOneMovie(baseUrl,id,handleSuccess,handleFailure))
        navigate("/movies")
    }
    const [show, setShow] = useState(false);
    const[user,setUser]=useState("")
    const navigate = useNavigate();
    useEffect(()=>{
        setUser(localStorage.getItem("name"))
    },[])

    return (
        <Card className='movie-container'>
            <img src={movie.poster} alt={movie.name} className='movie-poster'
            onClick={() => navigate(`/movies/${id}`)}></img>
            <CardContent>
            <div className='movie-specs'>
                <h2 className='movie-name'>{movie.name}
                    <IconButton color="black" onClick={() => setShow(!show)} 
                    aria-label="toggle summary">
                        {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    <IconButton color="primary" 
                    onClick={() => navigate(`/movies/${id}`)}aria-label="toggle summary"
                    >
                        <InfoIcon />
                    </IconButton>
                </h2>
                <p style={styles} className='movie-rating'> ⭐{movie.rating}</p>
            </div>
            {/* conditional rendering */}
            {show ? <p className='movie-summary'>{movie.summary}</p> : null}
            </CardContent>
            <CardActions style={{display:"flex"}}>
            <div style={{flex:"1"}}><button type="" className='btn-update'
            onClick={()=>navigate(`/updateMovie/${id}`)}>Update</button></div>
            <div style={{flex:"1"}}><button type="" className='btn-delete'
            onClick={()=>{handleDelete(id)}}>Delete</button></div>
            </CardActions>
        </Card>
    );
}