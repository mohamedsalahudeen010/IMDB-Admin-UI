
export const fetchActorsRequest=()=>{
    return{
        type:"FETCH_ACTOR_REQUEST"
    }
}

export const fetchActorsSuccess=(data)=>{
    return{
        type:"FETCH_ACTOR_SUCCESS",
        payload:data
    }
}

export const fetchActorsFailure=(error)=>{
    return{
        type:"FETCH_ACTOR_FAILURE",
        payload:error
    }
}
 
 export const addActor=(actor)=>{
    
     return{
         type:"ADD_ACTOR",
         payload:actor
     }
 }
 export const updateActor=(data)=>{
    
    return{
        type:"UPDATE_ACTOR",
        payload:data
    }
}
 
 export const deleteOneActor=(actor)=>{
 
     return{
         type:"DELETE_ONE_ACTOR",
         payload:actor
     }
 }
 
 export const deleteAllActor=()=>{
     return{
         type:"DELETE_ALL_ACTOR",
         
     }
 }
 
export const fetchActors=(baseUrl)=>{
    return async (dispatch)=>{
        dispatch(fetchActorsRequest())
        try {
            const response=await fetch(`${baseUrl}/actor`,{
                method:"GET",
            })
            const data=await response.json()
            console.log(data)
            dispatch(fetchActorsSuccess(data))
        } catch (error) {
            console.log(error)
            dispatch(fetchActorsFailure(error))
        }
    }
}



//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Add Actor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
export const fetchAddActor=(baseUrl,actor,handleSuccess,handleFailure)=>{
    return async (dispatch)=>{
        console.log(actor)
        dispatch(addActor(actor))     
        try {
            const response=await fetch(`${baseUrl}/actorAdmin`,{
                method:"POST",
                body:JSON.stringify(actor),
                headers:{
                    "Content-Type":"application/json",
                    "x-auth-token":localStorage.getItem("admin-token")
                 }
            })
            const data=await response.json()
            console.log("POST",data)
            if(data.message==="Internal Server Error"){
                handleFailure("Create")
            }
            else if(data.message==="Actor Already Exist"){
                handleFailure("Create")
            }
            else if(data.message==="Actor data added Successfully"){
                handleSuccess("Create")
            }

        } catch (error) {
            console.log(error)
           
        }
    }
}


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Update Actor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
export const fetchUpdateActor=(baseUrl,actor,handleSuccess,handleFailure)=>{
   
    const id=actor._id
    return async (dispatch)=>{
        dispatch(updateActor(actor))
        
        try {
            const response=await 
            fetch(`${baseUrl}/actorAdmin/${id}`,{
                method:"PUT",
                body:JSON.stringify(actor),
                headers:{
                    "Content-Type":"application/json",
                    "x-auth-token":localStorage.getItem("admin-token")
                 }
            })
            const data=await response.json()
            console.log("PUT",data)
            localStorage.setItem("cartItems",JSON.stringify(data.cart))
            if(data.message==="Internal Server Error"){
                handleFailure("Update")
            }
            else if(data.message==="Couldn'nt update your content"){
                handleFailure("Update")
            }
            else if(data.message==="updated Successfully"){
                handleSuccess("Update")
            }
        } catch (error) {
            console.log(error)
           
        }
    }
}



//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Delete one Actor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
export const fetchdeleteOneActor=(baseUrl,id,handleSuccess,handleFailure)=>{
    
    
    return async (dispatch)=>{
        try {
            dispatch(deleteOneActor(id))
            const response=await fetch(`${baseUrl}/actorAdmin/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "x-auth-token":localStorage.getItem("admin-token")
                 }
            })
            const data=await response.json()
            console.log("DELETE",data)
            if(data.message==="Internal Server Error"){
                handleFailure("Delete")
            }
            else if(data.message==="Couldn'nt delete your content"){
                handleFailure("Delete")
            }
            else if(data.message==="Deleted Successfully"){
                handleSuccess("Delete")
            }
            
        } catch (error) {
            console.log(error)
           
        }
    }
}



//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Delete All Actor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
export const deleteWholeActor=(baseUrl,handleSuccess,handleFailure)=>{
    
    
    return async (dispatch)=>{
        try {
           dispatch(deleteAllActor())
            const response=await fetch(`${baseUrl}/actorAdmin/`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "x-auth-token":localStorage.getItem("admin-token")
                 }
            })
            const data=await response.json()
            
            console.log(data)
        } catch (error) {
            console.log(error)
           
        }
    }
}