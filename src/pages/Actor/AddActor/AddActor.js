
import "./AddActor.css"
import Button from '@mui/material/Button';
import {  TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Carousel from 'react-bootstrap/Carousel';

import * as yup from "yup"
import{useFormik} from "formik"
import { useDispatch } from 'react-redux';
import {  fetchAddActor } from "../../../redux/Actors/actorAction";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { IMDBContext } from "../../../Context";


const studentValidationSchema=yup.object({
  name:yup.string().required("please fill the name"),
  gender:yup.string().required("please fill the Gender of the Actor"),
  image:yup.string().required("please fill the image of the Actor"),
  dob:yup.string().required("please fill the Date of Birth of the Actor"),
  Bio:yup.string().required("please fill the bio of the Actor"),
})

function AddActor() {
  const{baseUrl,pics,handleSuccess,handleFailure}=useContext(IMDBContext)
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const{values,handleChange, handleSubmit,handleBlur,errors,touched}=useFormik({
    initialValues:{
      name:"",
      gender:"",
      image:"",
      dob:"",
      Bio:""
    },
    validationSchema:studentValidationSchema,
    onSubmit:(newActor)=>{
      console.log("onSubmit triggered",newActor)
      dispatch(fetchAddActor(baseUrl,newActor,handleSuccess,handleFailure));
      navigate("/actor")
    }
  })

    return(
        
<div className="containers addProductPage ">
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
    <div className='heading'><h1>Add Actor</h1></div>
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
    <p style={{color:"red"}}>{errors.gender}</p>:"Enter Gender of the Actor"}
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
     "Enter The image of the product" }
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
     "Enter Bio of Actor" }
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
          Add Actor
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


export default AddActor