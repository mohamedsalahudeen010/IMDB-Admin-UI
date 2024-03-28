
import "./UpdateActor.css"
import Button from '@mui/material/Button';
import {  TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup"
import{useFormik} from "formik"
import { useDispatch, useSelector } from 'react-redux';
import {  fetchUpdateActor } from "../../../redux/Actors/actorAction";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useContext } from "react";
import { IMDBContext } from "../../../Context";

import Carousel from 'react-bootstrap/Carousel';

const producerValidationSchema=yup.object({
  name:yup.string().required("please fill the name"),
  gender:yup.string().required("please fill the Gender of the Producer"),
  image:yup.string().required("please fill the image of the Producer"),
  dob:yup.string().required("please fill the Date of Birth of the Producer"),
  Bio:yup.string().required("please fill the bio of the Producer"),
})

function UpdateActor() {
  const {id}=useParams()
  const{baseUrl,pics,handleSuccess,handleFailure}=useContext(IMDBContext)
  const navigate=useNavigate();
  const dispatch=useDispatch()
  let actor=useSelector((prod)=>prod.actors.actors.filter((ele)=>ele._id===id))
  console.log(actor)
  
  const{values,handleChange, handleSubmit,handleBlur,errors,touched}=useFormik({
    initialValues:{
      _id:actor[0]._id,
      name:actor[0].name,
      gender:actor[0].gender,
      image:actor[0].image,
      dob:actor[0].dob,
      Bio:actor[0].Bio
    },
    validationSchema:producerValidationSchema,
    onSubmit:(updateProducer)=>{
      console.log("onSubmit triggered",updateProducer)
      dispatch(fetchUpdateActor(baseUrl,updateProducer,handleSuccess,handleFailure));
      navigate("/actor")
    }
  })

    return(
        
<div className="containers addProducerPage ">
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
    <div className='heading'><h1>Update Producer</h1></div>
    <div className="input-section">
    <form onSubmit={handleSubmit} className='form-addPage'>
    <TextField  label={touched.name && errors.name?<p style={{color:"red"}}>{errors.name}
    </p>:"Enter The Name of the Actor"}
     id="filled" 
     variant="filled"
     style={{marginLeft:"1rem",
     marginTop:"1rem",
     width: '50ch'}}
     onChange={handleChange}
     value={values.name}
     onBlur={handleBlur}
     name= "name"
    
     />
     
    
    <TextField  label= {touched.gender && errors.gender?
    <p style={{color:"red"}}>{errors.gender}</p>:"Enter Gender of the Producer"}
     id="filled" 
     variant="filled"
     style={{marginLeft:"1rem",
     marginTop:"1rem",
     width: '50ch'}}
     onChange={handleChange}
     value={values.gender}
     onBlur={handleBlur}
     name= "gender"
     />
           
    <TextField 
     label={touched.image && errors.image?<p style={{color:"red"}}>{errors.image}</p>:
     "Enter The image of the Actor" }
    id="filled" 
    variant="filled"
    style={{marginLeft:"1rem",
    marginTop:"1rem",
    width: '50ch'}}
    onChange={handleChange}
     value={values.image}
     onBlur={handleBlur}
     name= "image" />
     
     <TextField  
     label={touched.dob && errors.dob?<p style={{color:"red"}}>{errors.dob}</p>:
     "Enter Date of Birth of Actor" }
    id="filled" 
    variant="filled"
    style={{marginLeft:"1rem",
    marginTop:"1rem",
    width: '50ch'}}
    onChange={handleChange}
     value={values.dob}
     onBlur={handleBlur}
     name= "dob" />

     <TextField  
     label={touched.Bio && errors.Bio?<p style={{color:"red"}}>{errors.Bio}</p>:
     "Enter Bio of Producer" }
    id="filled" 
    variant="filled"
    style={{marginLeft:"1rem",
    marginTop:"1rem",
    width: '50ch'}}
    onChange={handleChange}
     value={values.Bio}
     onBlur={handleBlur}
     name= "Bio" />

    <Button
          className="add-btn"
          color="success"
          type="submit"
          variant="contained"
          style={{display:"block",textAlign:"center",
        marginLeft:"25%",width:"50%",
      marginTop:"1rem"}}
         
        >
          Update Actor
        </Button>
        </form>

    </div>
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
       
    )
}


export default UpdateActor