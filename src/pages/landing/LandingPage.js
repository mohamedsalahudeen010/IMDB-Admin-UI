import React, { useContext } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import Carousel from 'react-bootstrap/Carousel';
import "./LandingPage.css"
import { IMDBContext } from '../../Context';
import Footer from '../../Components/Footer/Footer';

function LandingPage() {
  const{pics}=useContext(IMDBContext)
  return (
    <div className='landingPage'>
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
    <Footer/>
   </div>

        
  )
}

export default LandingPage