import React, { useState,useContext, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, IconButton } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchMoviesWithQuery } from '../../redux/Movies/moviesAction';
import { IMDBContext } from '../../Context'
import { fetchdeleteOneProducer } from '../../redux/Producers/producerAction';
import { fetchdeleteOneActor } from '../../redux/Actors/actorAction';
import "./card.css"
function AdminPersonalCard({name,img,role,summary,dob,gender,id,yes}) {
  const [show, setShow] = useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const{baseUrl,handleSuccess,handleFailure}=useContext(IMDBContext)
  
  const deleteProducerfunc=(id)=>{
  dispatch(fetchdeleteOneProducer(baseUrl,id,handleSuccess,handleFailure))
  }
  const deleteActorfunc=(id)=>{
    dispatch(fetchdeleteOneActor(baseUrl,id,handleSuccess,handleFailure))
  }
  return (
    <div >
        <Card sx={{ maxWidth: 250 }}
        className='card'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={img}
          alt={name}
          style={{borderRadius:"5%"}}
          value={name}
          onClick={(e)=>{dispatch(fetchMoviesWithQuery(baseUrl,name));navigate(`/selMovie/${name}`)}}
        />
        <CardContent height="200"
        className='card-content'>
          <Typography gutterBottom variant="p" component="div"
          style={{fontWeight:"bolder"}} dark >
            {name}
          </Typography>
          <Typography gutterBottom variant="p" component="div">
            {role}
          </Typography>
          {dob?<Typography gutterBottom variant="p" component="div">
            Data of Birth :{ dob}
          </Typography>:""}
          {gender?<Typography gutterBottom variant="p" component="div">
            Gender : { gender}
          </Typography>:""}
          {summary?<IconButton color="primary" onClick={() => setShow(!show)} 
                    aria-label="toggle summary">
                        {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>:""}
          
          {show ? <p className='movie-summary'>{summary}</p> : null}
        </CardContent>
        <CardActions style={{display:"flex"}}>
        {yes?<div style={{flex:"1"}}><button type="" className='btn-update'
            onClick={()=>navigate(`/updateProducer/${id}`)}>Update</button></div>:
            <div style={{flex:"1"}}><button type="" className='btn-update'
            onClick={()=>navigate(`/updateActor/${id}`)}>Update</button></div>}
            
         {yes?<div style={{flex:"1"}}><button type="" className='btn-delete'
         onClick={()=>deleteProducerfunc(id)}>Delete</button></div>:
         <div style={{flex:"1"}}><button type="" className='btn-delete'
         onClick={()=>deleteActorfunc(id)}>Delete</button></div>
         }   
               </CardActions>
      </CardActionArea>
    </Card>
    </div>
  )
}

export default AdminPersonalCard