import {createStore} from "redux"

import { combineReducers } from "redux"
import { applyMiddleware } from "redux"
import logger from "redux-logger"
import {composeWithDevTools} from "@redux-devtools/extension"

import {thunk} from "redux-thunk"
import moviesReducer from "./Movies/moviesReducer.js"
import wishListReducer from "./wishList/wishListReducer.js"
import actorReducer from "./Actors/actorReducer.js"
import producersReducer from "./Producers/producerReducer.js"
import adminReducer from "./admin/adminReducer.js"




const reducer=combineReducers({
admin:adminReducer,
movies:moviesReducer,
wishlist:wishListReducer,
actors:actorReducer,
producer:producersReducer
})

 const store = createStore(reducer,
   composeWithDevTools(applyMiddleware(thunk)) )

 export default store