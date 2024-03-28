
export const fetchMoviesRequest=()=>{
    return{
        type:"FETCH_MOVIES_REQUEST"
    }
}

export const fetchMoviesSuccess=(data)=>{
    return{
        type:"FETCH_MOVIES_SUCCESS",
        payload:data
    }
}
export const fetchMoviesFailure=(error)=>{
    return{
        type:"FETCH_MOVIES_FAILURE",
        payload:error
    }
}
export const addMovie=(data)=>{
    
    return{
        type:"ADD_MOVIE",
        payload:data
    }
}
export const updateMovie=(data)=>{
   
   return{
       type:"UPDATE_MOVIE",
       payload:data
   }
}

export const deleteOneMovie=(data)=>{

    return{
        type:"DELETE_ONE_MOVIE",
        payload:data
    }
}

export const deleteAllMovie=()=>{
    return{
        type:"DELETE_ALL_MOVIE",
        
    }
}



export const fetchMovies=(baseUrl)=>{
    return async (dispatch)=>{
        dispatch(fetchMoviesRequest())
        try {
            const response=await fetch(`${baseUrl}/movies`,{
                method:"GET",
            })
            const data=await response.json()
            console.log(data)
            dispatch(fetchMoviesSuccess(data))
        } catch (error) {
            console.log(error)
            dispatch(fetchMoviesFailure(error))
        }
    }
}


export const fetchMoviesWithSearch=(baseUrl,query)=>{
    console.log(query)
    console.log(baseUrl)
    return async (dispatch)=>{
        dispatch(fetchMoviesRequest())
        try {
            const response=await fetch(`${baseUrl}/movies?search=${query}`,{
                method:"GET"
            })
            const data=await response.json()
            console.log(data)
            dispatch(fetchMoviesSuccess(data))
        } catch (error) {
            console.log(error)
            dispatch(fetchMoviesFailure(error))
        }
    }
}


export const fetchMoviesWithQuery=(baseUrl,query)=>{
    console.log(query)
    return async (dispatch)=>{
        dispatch(fetchMoviesRequest())
       
        try {
            const response=await fetch(`${baseUrl}/movies/one?search=${query}`,{
                method:"GET"
            })
            const data=await response.json()
            console.log(data)
            dispatch(fetchMoviesSuccess(data))
        } catch (error) {
            console.log(error)
            dispatch(fetchMoviesFailure(error))
        }
    }
}




export const updateRating=(baseUrl,movie,rating)=>{
    const data={rating:rating}
    const id=movie._id
    console.log(typeof rating)
    
    return async (dispatch)=>{        
        try {
            const response=await fetch(`${baseUrl}/movies/rating/${id}`,{
                method:"PUT",
                body:rating,
                headers:{
                    "Content-Type":"application/json",    
                 }
            })   
         const data=await response.json()
            console.log("PUT",data)
            
           
        } catch (error) {
            console.log(error)
           
        }
    }
}

export const fetchAddMovie=(baseUrl,movie,handleSuccess,handleFailure)=>{
    return async (dispatch)=>{
        dispatch(addMovie(movie))     
        try {
            const response=await fetch(`${baseUrl}/moviesAdmin`,{
                method:"POST",
                body:JSON.stringify(movie),
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
            else if(data.message==="Movie Already Exist"){
                handleFailure("Create")
            }
            else if(data.message==="Movie added Successfully"){
                handleSuccess("Create")
            }

           
        } catch (error) {
            console.log(error)
           
        }
    }
}


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Update Movie >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
export const fetchUpdateMovie=(baseUrl,movie,handleSuccess,handleFailure)=>{
   
    const id=movie._id
    return async (dispatch)=>{
        dispatch(updateMovie(movie))
        
        try {
            const response=await 
            fetch(`${baseUrl}/moviesAdmin/${id}`,{
                method:"PUT",
                body:JSON.stringify(movie),
                headers:{
                    "Content-Type":"application/json",
                    "x-auth-token":localStorage.getItem("admin-token")
                 }
            })
            const data=await response.json()
            if(data.message==="Internal Server Error"){
                handleFailure("Update")
            }
            else if(data.message==="Couldn'nt update Movie"){
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


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Delete one Movie >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
export const fetchdeleteOneMovie=(baseUrl,id,handleSuccess,handleFailure)=>{
    
   
    return async (dispatch)=>{
        try {
            dispatch(deleteOneMovie(id))
            const response=await fetch(`${baseUrl}/moviesAdmin/${id}`,{
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
            else if(data.message==="Couldn'nt delete Movie"){
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




//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Delete All Movies >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
export const deleteMovies=(baseUrl,handleSuccess,handleFailure)=>{
    
    
    return async (dispatch)=>{
        try {
           dispatch(deleteAllMovie())
            const response=await fetch(`${baseUrl}/moviesAdmin`,{
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
            else if(data.message==="Couldn'nt delete Movie"){
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
