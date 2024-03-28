import React from 'react'
import "./Footer.css"
import footer from "./image/footer.png"

import Insta from '@iconscout/react-unicons/icons/uil-instagram'
import Linkedin from '@iconscout/react-unicons/icons/uil-linkedin'
import Github from '@iconscout/react-unicons/icons/uil-github'
import Email from '@iconscout/react-unicons/icons/uil-mailbox'
import Phone from '@iconscout/react-unicons/icons/uil-phone'

function Footer() {
  return (
    <div className='footer'>
        <div className='row'>
        <img src={footer} alt=""></img>
            
            
            <div className='footer-content'>
        <span>Mohamed Salahudeen</span>
    <span><Email color="black" size="1.5rem"/> writetosala10@gmail.com</span>
    <span><Phone color="black" size="1.5rem"/> 9659339624 / 9626219624</span>
    <div>
        <div className='footer-icons'>
        <a href='https://www.instagram.com/sala_insta.10/' target='_blank'>
            <Insta color="black" size="2rem"/></a> 

         <a href='https://www.linkedin.com/in/mohamed-salahudeen-j-598789265/' 
         target={'_blank'}>
        <Linkedin color="black" size="2rem" />
                </a> 
        <a href='https://github.com/mohamedsalahudeen010' target={'_blank'} >
        <Github color="black" size="2rem" /> </a>
        </div>
           
        </div>
        
        

    </div>

        </div>
    </div>
  )
}

export default Footer