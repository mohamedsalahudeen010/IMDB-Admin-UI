

const initialState={
    loading:true,
    admin:[],
    error:""
}

const adminReducer=(state=initialState,action)=>{
    switch(action.type){
        case "FETCH_ADMIN_REQUEST":return{
            loading:true,
             admin:[],
             error:""
        }
        case "FETCH_ADMIN_SUCCESS":return{
            loading:false,
            admin:action.payload,
            error:""
        }
        case "FETCH_ADMIN_FAILURE":return{
            loading:false,
            admin:[],
            error:action.payload
        }
        case "FETCH_ADMIN_LOGOUT":return{
            loading:false,
            admin:[],
            error:action.payload
        }
        default : return state
    }
}


export default adminReducer
