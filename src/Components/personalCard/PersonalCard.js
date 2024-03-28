import React, { useState,useContext } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchMoviesWithQuery } from '../../redux/Movies/moviesAction';
import { IMDBContext } from '../../Context'
import "./card.css"
function PersonalCard({name,img,role,summary,dob,gender}) {
  const [show, setShow] = useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const{baseURL}=useContext(IMDBContext)
  return (
    <div>
        <Card sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={img}
          alt={name}
          style={{borderRadius:"5%"}}
          value={name}
          onClick={(e)=>{dispatch(fetchMoviesWithQuery(name));navigate(`/selMovie/${name}`)}}
        />
        <CardContent height="200">
          <Typography gutterBottom variant="p" component="div"
          style={{fontWeight:"bolder"}}>
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
      </CardActionArea>
    </Card>
    </div>
  )
}

export default PersonalCard