

const initialState={
    loading:true,
    actors:[],
    error:""
}

const actorReducer=(state=initialState,action)=>{
    switch(action.type){
        case "FETCH_ACTOR_REQUEST":return{
            loading:true,
            actors:[],
             error:""
        }
        case "FETCH_ACTOR_SUCCESS":return{
            loading:false,
            actors:action.payload,
            error:""
        }
        case "FETCH_ACTOR_FAILURE":return{
            loading:false,
            actors:[],
            error:action.payload
        }
        case "ADD_ACTOR":
            const alreadyExists = state.actors.filter(
                (item) => item.name === action.payload.name
              );
console.log(alreadyExists)        
              if (!alreadyExists) {
                return {
                  ...state.actors,...action.payload
                  
                };
              } 
              else {
                return {
                  ...state,
                  
                };
              }
              case "UPDATE_ACTOR" :
                return{
                    ...state.actors,...action.payload
            }
        case "DELETE_ONE_ACTOR":
            return {
              ...state,
              actors: state.actors.filter(
                (item) => item._id !== action.payload
              ),
            }

            case "DELETE_ALL_ACTOR":
              return {
                loading:true,
                actors:[],
                error:""
                
              }
        default : return state
    }
}


export default actorReducer
