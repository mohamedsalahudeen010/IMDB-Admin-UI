import React, { useContext, useEffect, useState } from 'react'
import "./WishList.css"
import NavBar from '../../Components/NavBar/NavBar'
import Carousel from 'react-bootstrap/Carousel';
import { IMDBContext } from '../../Context'
import { IconButton } from '@mui/material';
import { MovieCard } from '../../Components/Movie/MovieCard';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {  deleteWishList, fetchWishList } from '../../redux/wishList/wishListAction';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';

function WishList() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const[movies,setMovies]=useState("")
  const{baseUrl,pics}=useContext(IMDBContext)
  const movieList=useSelector((movies)=>movies.movies.movies)
  let wishList=useSelector((wish)=>wish.wishlist.movies)
 console.log("uuuuuuuuuuuuuuuuu",wishList)
 
  useEffect(()=>{
    if(localStorage.getItem("email")){
      dispatch(fetchWishList(baseUrl,localStorage.getItem("email")))
    }
  },[])

  const handleWishDelete=(id)=>{
    setMovies(wishList)
    dispatch(deleteWishList(baseUrl,id))
    navigate("/movies")
   }
  return (
    <div className='wishList'>
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
    <div className='heading'><h1>Wish List</h1></div>
    <div className='movie-list'>
                {/*  {parents-> child (props)} */}
                {wishList && wishList.map((movie) => (
                    <div key={movie._id}>
                        <MovieCard
                            movie={movie}
                            id={movie._id}
                            wishList={
                                <IconButton 
                                sx={{marginLeft: "auto"}}
                                onClick={() => handleWishDelete(movie._id)} 
                                aria-label="delete"
                                 color="error">
                                   <DeleteIcon/>
                                </IconButton>
                            } />
                    </div>
                ))}
            </div>
            <Footer/>
    </div>
  )
}

export default WishList