import { IconButton, Paper } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import "./SearchBar.css"
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Collapse from 'react-bootstrap/Collapse';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMoviesWithSearch } from '../../redux/Movies/moviesAction';
import { IMDBContext } from '../../Context';

function SearchBar() {
  const[open,setOpen]=useState(false)
    const [query,setQuery]=useState("");
    const[user,setUser]=useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const{baseUrl}=useContext(IMDBContext)

    const searchFunction=()=>{
      let timer
      return function(e){
        e.preventDefault()
        clearTimeout(timer)
      timer=setTimeout(()=>
      {dispatch(fetchMoviesWithSearch(baseUrl,e.target.value))}
      ,300)
      }
    }
    let mainSearch=searchFunction()

    useEffect(()=>{
      setUser(localStorage.getItem("name"))
      console.log(user)
   },[])

    
  return (
    <div className='search-bar'>
      <Paper
    component="form"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:"40%",color:"black", 
     boxShadow:'0.5rem 0.5rem 0.8rem black',
     position:"fixed",
    top:"2.2vh",
     }}
  >

<MenuIcon className='menu-icon'  style={open?{transform:"rotate(90deg)",transition:"all 0.6s",color:"black"}:
          {transform:"rotate(0deg)",transition:"all 0.6s",color:"black"}}
          onClick={()=>setOpen(!open)}/>
<Divider/>
    <InputBase
      sx={{ ml: 1, flex: 1,fontWeight:"bold"}}
      placeholder="Search IMDB"
      inputProps={{ 'aria-label': 'search google maps' }}
      onKeyUp={(e)=>{
        mainSearch(e)}}
      onClick={()=>navigate("/movies")}
    />
    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon/>
    </IconButton>
   
    {open?<div className='search-list'>
    <Collapse in={open}>
        <div id="example-collapse-text" className='view-search-list'>
          <ul>
          <li><span onClick={()=>{setOpen(!open);navigate("/movies")}}>Movies</span></li>
         <li><span onClick={()=>{setOpen(!open);navigate("/actor")}}>Actors</span></li>
           <li><span onClick={()=>{setOpen(!open);navigate("/producer")}}>Producer</span></li>
          </ul>
        </div>
      </Collapse>
   </div>:null}
  </Paper>
    </div>
    
  )
}

export default SearchBar