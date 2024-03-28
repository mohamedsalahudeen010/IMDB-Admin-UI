import React, { useContext, useEffect, useState } from 'react'
import "./Producer.css"
import NavBar from '../../Components/NavBar/NavBar'
import Carousel from 'react-bootstrap/Carousel';
import { IMDBContext } from '../../Context';
import { useDispatch, useSelector } from 'react-redux';
import AdminPersonalCard from '../../Components/personalCard/AdminPersonalCard';
import { useNavigate } from 'react-router-dom';
import { fetchProducers } from '../../redux/Producers/producerAction';
import Footer from '../../Components/Footer/Footer';
function Producer() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const{pics,baseUrl}=useContext(IMDBContext)
    const[yes,setYes]=useState(true)
    const producer=useSelector((producer)=>producer.producer.producers)
    useEffect(()=>{
        dispatch(fetchProducers(baseUrl))
      
       if(!localStorage.getItem("admin-email")){
        navigate("/")
      }
    },[])
  return (
    <div className='actor-page'>
        <NavBar/>
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
    <div className='heading'><h1>Producers</h1></div>
    <div> <button className="add-btn" onClick={()=>navigate("/addProducer")}>
      Add Producer
    </button></div>
    <div className='row'>
        {producer&&producer.map((person)=>(
             <div key={person._id} className='col'>
             <AdminPersonalCard
              name={person.name}
              img={person.image}
              gender={person.gender}
              dob={person.dob}
              summary={person.bio}
              id={person._id}
              yes={yes}/>
         </div>
        ))}
    </div>
    <Footer/>
    </div>
  )
}

export default Producer