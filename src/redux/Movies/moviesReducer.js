

const initialState={
    loading:true,
    movies:[],
    error:""
}

const moviesReducer=(state=initialState,action)=>{
    switch(action.type){
        case "FETCH_MOVIES_REQUEST":return{
            loading:true,
            movies:[],
             error:""
        }
        case "FETCH_MOVIES_SUCCESS":return{
            loading:false,
            movies:action.payload,
            error:""
        }
        case "FETCH_MOVIES_FAILURE":return{
            loading:false,
            movies:[],
            error:action.payload
        }
        case "ADD_MOVIE":
            const alreadyExists = state.movies.filter(
                (item) => (item.movieName === action.payload.movieName) &&  
                (item.language === action.payload.language)
              );

              if (!alreadyExists) {
                return {
                  ...state.movies,...action.payload
                  
                };
              } 
              else {
              
          
                return {
                  ...state,
                  
                };
              }
              case "UPDATE_MOVIE" :
                return{
                    ...state.movies,...action.payload
            }
        case "DELETE_ONE_MOVIE":
            return {
              ...state,
              movies: state.movies.filter(
                (item) => item._id !== action.payload
              ),
            }

            case "DELETE_ALL_MOVIE":
              return {
                loading:true,
                movies:[],
                error:""
                
              }
        default : return state
    }
}



export default moviesReducer
