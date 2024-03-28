
import { useState, useEffect, useContext } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { IMDBContext } from "../../Context";
import IconButton from '@mui/material/IconButton';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { MovieCard } from "../../Components/Movie/MovieCard";
import "./MoviesList.css"
import NavBar from "../../Components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { addWishList} from "../../redux/wishList/wishListAction";
import { fetchMovies } from "../../redux/Movies/moviesAction";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

export function MovieList() {

    const navigate=useNavigate()
    const [wish, setWish] = useState(false)
    const{pics,baseUrl}=useContext(IMDBContext)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchMovies(baseUrl))
       
      },[])
    const movieList=useSelector((movies)=>movies.movies.movies)
    const wishList=useSelector((wish)=>wish.wishlist.movies)

   console.log(movieList)
   console.log(wishList)

   const handleWish=(id)=>{
    let wish=movieList.filter((movie,idx)=>(movie._id===id))

    let updatedWishList=wish
    
    dispatch(addWishList(baseUrl,updatedWishList))
   }
    
    return (
        <div className="movieListPage">
            <NavBar></NavBar>
            <div className='carousel-land'>
           <Carousel >
           { pics.map((img,idx)=>(
           <Carousel.Item key={idx} >
           <img
           className="d-block"
            src={img}
            alt="First slide"
          style={{width:"100vw",height:"40vh"}}></img>
         </Carousel.Item>
      )) }
   
    </Carousel>
    </div>
    <div className='heading'><h1>Movies</h1></div>
    <div> <button className="add-btn" 
    onClick={()=>navigate("/addMovie")}>
      Add Movies
    </button></div>
            <div className='movie-list'>
               
                {movieList && movieList.map((movie) => (
                    <div key={movie._id}>
                        <MovieCard
                            movie={movie}
                            id={movie._id}
                            wishList={
                                <IconButton 
                                sx={{marginLeft: "auto"}}
                                aria-label="wishlist"
                                 color={wish?"secondary":"primary"}
                                 onClick={()=>handleWish(movie._id)}>
                                   <PlaylistAddCheckCircleIcon/>
                                </IconButton>
                            } />
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
}