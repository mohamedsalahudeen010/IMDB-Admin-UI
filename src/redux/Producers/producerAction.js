
export const fetchProducerRequest=()=>{
    return{
        type:"FETCH_PRODUCER_REQUEST"
    }
}

export const fetchProducerSuccess=(data)=>{
    return{
        type:"FETCH_PRODUCER_SUCCESS",
        payload:data
    }
}

export const fetchProducerFailure=(error)=>{
    return{
        type:"FETCH_PRODUCER_FAILURE",
        payload:error
    }
}
export const addProducer=(producer)=>{
    
    return{
        type:"ADD_TO_PRODUCER",
        payload:producer
    }
}
export const updateProducer=(producer)=>{
    
    return{
        type:"UPDATE_PRODUCER",
        payload:producer
    }
}


export const deleteOneProducer=(id)=>{

    return{
        type:"DELETE_ONE_PRODUCER",
        payload:id
    }
}

export const deleteAllProducer=()=>{
    return{
        type:"DELETE_ALL_PRODUCER",
        
    }
}


export const fetchProducers=(baseUrl)=>{
    
    return async (dispatch)=>{
        dispatch(fetchProducerRequest())
        try {
            const response=await fetch(`${baseUrl}/producer`,{
                method:"GET",
            })
            const data=await response.json()
            console.log(data)
            dispatch(fetchProducerSuccess(data))
        } catch (error) {
            console.log(error)
            dispatch(fetchProducerFailure(error))
        }
    }
}




//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Add Producer >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
export const fetchAddProducer=(baseUrl,producer,handleSuccess,handleFailure)=>{
    return async (dispatch)=>{
        dispatch(addProducer(producer))     
        try {
            const response=await fetch(`${baseUrl}/producerAdmin`,{
                method:"POST",
                body:JSON.stringify(producer),
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
            else if(data.message==="Producer  Already Exist"){
                handleFailure("Create")
            }
            else if(data.message==="Producer added Successfully"){
                handleSuccess("Create")
            }
          
        } catch (error) {
            console.log(error)
           
        }
    }
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Update Producer >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
export const fetchUpdateProducer=(baseUrl,producer,handleSuccess,handleFailure)=>{
   
    const id=producer._id
    return async (dispatch)=>{
        dispatch(updateProducer(producer))
        
        try {
            const response=await 
            fetch(`${baseUrl}/producerAdmin/${id}`,{
                method:"PUT",
                body:JSON.stringify(producer),
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
            else if(data.message==="Couldn'nt update your data"){
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


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Delete one producer >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
export const fetchdeleteOneProducer=(baseUrl,id,handleSuccess,handleFailure)=>{
    
   
    return async (dispatch)=>{
        try {
            dispatch(deleteOneProducer(id))
            const response=await fetch(`${baseUrl}/producerAdmin/${id}`,{
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
            else if(data.message==="Couldn'nt delete Producer"){
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




//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Delete All Producer >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
export const deleteProducers=(baseUrl,handleSuccess,handleFailure)=>{
    
    
    return async (dispatch)=>{
        try {
           dispatch(deleteAllProducer())
            const response=await fetch(`${baseUrl}/producerAdmin`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "x-auth-token":localStorage.getItem("admin-token")
                 }
            })
            const data=await response.json()
            
            console.log(data)
            if(data.message==="Internal Server Error"){
                handleFailure("Delete")
            }
            else if(data.message==="Couldn'nt delete"){
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
