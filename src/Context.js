
import React, { createContext, useState } from 'react'
export const IMDBContext=createContext(null)


function Context(props) {
  let pics=[ 
    "https://assets-in.bmscdn.com/discovery-catalog/events/et00037263-edrwmekjgf-landscape.jpg",
    "https://m.media-amazon.com/images/S/aplus-media-library-service-media/a84f13d5-8c39-46dd-b3e3-cd2ece56d755.__CR0,0,970,300_PT0_SX970_V1___.jpg",
    "https://webneel.com/daily/sites/default/files/images/daily/01-2019/11-movie-poster-design-indian-tamil-8thottakkal-prathoolnt.jpg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e2e96a15688385.56295b595f62d.jpg",
    "https://cdn.idntimes.com/content-images/post/20170320/meme-beauty-and-the-beast-10-a27f8795a5a120f1fe6b5750d556dfcb.jpg",
    "https://i.redd.it/zmhjtnbw64s81.jpg",
     "https://whatsondisneyplus.b-cdn.net/wp-content/uploads/2022/04/209377206_134297865445213_258963816793399223_n.jpg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg",
     "https://gumlet-images.assettype.com/afaqs/2021-04/4fd27397-e8b9-4264-ada3-47a6576b940c/RadheComboOffer_Horizontal.jpg?auto=format,compress&fmt=webp&format=webp&w=1200&h=900&dpr=1.0"
             ] 

    const[successCreateAlert,setSuccessCreateAlert]=useState(false)
    const[failureCreateAlert,setFailureCreateAlert]=useState(false)
    const[successUpdateAlert,setSuccessUpdateAlert]=useState(false)
    const[failureUpdateAlert,setFailureUpdateAlert]=useState(false)
    const[successDeleteAlert,setSuccessDeleteAlert]=useState(false)
    const[failureDeleteAlert,setFailureDeleteAlert]=useState(false)
    const [openCom, setOpenCom] = useState(false);
    const [openLand, setOpenLand] = useState(false);
    const baseUrl="https://imdb-server-4vwp.onrender.com";

    const handleSuccess=(type)=>{
      console.log("handleSuccess.............................")
      if(type==="Create"){
        setSuccessCreateAlert(true)
      setTimeout(()=>setSuccessCreateAlert(false),2000)
      }
      if(type==="Update"){
        setSuccessUpdateAlert(true)
      setTimeout(()=>setSuccessUpdateAlert(false),2000)
      }
      if(type==="Delete"){
        setSuccessDeleteAlert(true)
      setTimeout(()=>setSuccessDeleteAlert(false),2000)
      }
     
      
      
    }
    const handleFailure=(type)=>{
      console.log("handleFailure.............................")
      if(type==="Create"){
        setFailureCreateAlert(true)
      setTimeout(()=>setFailureCreateAlert(false),2000)
      }
      if(type==="Update"){
        setFailureUpdateAlert(true)
      setTimeout(()=>setFailureUpdateAlert(false),2000)
      }
      if(type==="Delete"){
        setFailureDeleteAlert(true)
      setTimeout(()=>setFailureDeleteAlert(false),2000)
      }
    }
  return (
    <IMDBContext.Provider value={{pics,openCom,setOpenCom,openLand,setOpenLand,baseUrl,
  handleSuccess,handleFailure,successCreateAlert,successDeleteAlert,successUpdateAlert,failureCreateAlert
  ,failureUpdateAlert,failureDeleteAlert}}>
        {props.children}
    </IMDBContext.Provider>
  )
}

export default Context
