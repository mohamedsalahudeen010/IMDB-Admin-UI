

const initialState={
    loading:true,
    producers:[],
    error:""
}

const producersReducer=(state=initialState,action)=>{
    switch(action.type){
        case "FETCH_PRODUCER_REQUEST":return{
            loading:true,
            producers:[],
             error:""
        }
        case "FETCH_PRODUCER_SUCCESS":return{
            loading:false,
            producers:action.payload,
            error:""
        }
        case "FETCH_PRODUCER_FAILURE":return{
            loading:false,
            producers:[],
            error:action.payload
        }
        case "ADD_PRODUCER":
            const alreadyExists = state.producers.filter(
                (item) => item._id === action.payload._id
              );
        
              if (!alreadyExists) {
                return {
                  ...state.producers,...action.payload
                  
                };
              } 
              else {
                console.log("producer already exist")
                console.log("producer Added")
                console.log(state.producers)
                return {
                  ...state,
                  
                };
              }
        case "UPDATE_PRODUCER" :
            return{
                ...state.producers,...action.payload
        }
        case "DELETE_ONE_PRODUCER":
            return {
              ...state,
              producers: state.producers.filter(
                (item) => item._id !== action.payload
              ),
            }

            case "DELETE_ALL_PRODUCER":
              return {
                loading:true,
                actors:[],
                error:""
                
              }
        default : return state
    }
}


export default producersReducer
