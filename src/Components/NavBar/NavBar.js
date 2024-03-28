import React, { useEffect, useState } from 'react'
import "./NavBar.css"
import Collapse from 'react-bootstrap/Collapse';
import Dot from "@iconscout/react-unicons/icons/uil-bars"
import { useNavigate } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar';
import { useDispatch } from 'react-redux';
import { fetchUserLogOut } from '../../redux/admin/adminAction';

function NavBar() {
   const[open,setOpen]=useState(false)
   const[show,setShow]=useState(false)
   const[admin,setAdmin]=useState("")
   const navigate=useNavigate()
   const dispatch=useDispatch();
   useEffect(()=>{
      setAdmin(localStorage.getItem("admin-name"))
      console.log(admin)
   },[])
   console.log()
   const logOut=()=>{
    localStorage.clear();
    setAdmin("")
    navigate("/")
   }
  return (
   
 <div className='nav-wrapper'>
        <div className='nav-left'>
            <div >
               <button onClick={()=>navigate("/landing")} className='btn nav-btn'>IMDB</button>
            </div>
            <div >
               <button className='btn nav-btn'>Admin</button>
            </div>
            {admin?<div>{admin}</div>:""}
        </div>
        <div className='nav-centre'>
         <SearchBar/>
        </div>
        <div className='nav-right'>
                <div className='nav-list'>
                     <ul>
                        
                        <li onClick={()=>navigate("/movies")}>
                            Movies
                        </li>
                        
                   
                        {admin?<li onClick={()=>navigate("/actor")}>
                           Actor
                        </li>:""}
                        {admin?<li onClick={()=>navigate("/producer")}>
                           Producer
                        </li>:""}
                      
                        {admin?<li onClick={()=>logOut()}>
                           Logout
                        </li>:<li onClick={()=>navigate("/login")}>
                           Sign In
                        </li>} 
                        
                    
                     </ul>
                     
                </div>
         
            
                    
        </div>
        <div className='nav-check'>
          <input type="checkbox" id="check-land" name="" value="" style={{display:"none"}}></input>
          <label htmlFor='check-land' className='check-label'
          style={open?{transform:"rotate(90deg)",transition:"all 0.6s"}:
          {transform:"rotate(0deg)",transition:"all 0.6s"}}><Dot
          onClick={()=>setOpen(!open)} size={"2.5rem"}/></label>
        </div>

        <div className='land-dot-list'>
        <Collapse in={open}>
        <div id="example-collapse-text" className='view-nav-list'>
          <ul>
          
          <li><span onClick={()=>{setOpen(!open);navigate("/movies")}}>Movies</span></li>
              

          {admin?<li><span onClick={()=>{setOpen(!open);navigate("/actor")}}>Actor</span></li>:""}
          {admin?<li><span onClick={()=>{setOpen(!open);navigate("/producer")}}>Producer</span></li>:""}
           

            {admin?<li><span onClick={()=>{setOpen(!open);logOut()}}>Logout</span></li>
           :<li><span onClick={()=>{setOpen(!open);navigate("/login")}}>Sign In</span></li>
          }
          
          
          
            
          </ul>
        </div>
      </Collapse>
      </div>
    </div>
  
   
  )
}

export default NavBar