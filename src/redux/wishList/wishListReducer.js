

const initialState={
    loading:true,
    name:"",
    email:"",
    movies:[],
    error:""
}

const wishListReducer=(state=initialState,action)=>{
    switch(action.type){
        case "FETCH_WISHLIST_REQUEST":return{
            loading:true,
            name:"",
            email:"",
            movies:[],
            error:""
        }
        case "FETCH_WISHLIST_SUCCESS":return{
            loading:false,
            name:action.payload.name,
            email:action.payload.email,
            movies:action.payload.movies,
            error:""
        }
        case "FETCH_WISHLIST_FAILURE":return{
            loading:false,
            name:"",
            email:"",
            movies:[],
            error:"error"
        }
        case "ADD_TO_WISHLIST":
          return{
            ...state.movies,...action.payload.movies,    
             }
        
        case "DELETE_ONE_FROM_WISHLIST":
          
            const data= state.movies.filter((item) =>(item._id !== action.payload))   
            return{
                ...state.movies,...data
             }

            case "DELETE_ALL_FROM_WISHLIST":
              return {
                loading:false,
                name:action.payload.name,
               email:action.payload.email,
                order:[],
                error:""
                
              }
           
           
        default : return state
    }
}


export default wishListReducer
