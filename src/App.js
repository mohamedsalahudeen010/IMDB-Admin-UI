import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LogInPage from './pages/login/LoginPage';
import SignUpPage from './pages/signUp/SignUp';
import LandingPage from './pages/landing/LandingPage';

import WishList from './pages/Wishlist/WishList';
import { MovieDetails } from './pages/moviesDetails/MovieDetails';
import { MovieList } from './pages/movies/MoviesList';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IMDBContext } from './Context';
import { fetchMovies } from './redux/Movies/moviesAction';
import { fetchWishList } from './redux/wishList/wishListAction';
import Footer from './Components/Footer/Footer';
import ForgetPage from './pages/forgetPage/ForgetPage';
import Actor from './pages/Actor/Actor';
import Producer from './pages/Producer/Producer';
import { fetchActors } from './redux/Actors/actorAction';
import { fetchProducers } from './redux/Producers/producerAction';
import SelMovie from './pages/SelMovie/SelMovie';
import { useNavigate } from "react-router-dom";
import AddActor from './pages/Actor/AddActor/AddActor';
import AddProducer from './pages/Producer/AddProducer/AddProducer';
import UpdateProducer from './pages/Producer/updateProducer/UpdateProducer';
import UpdateActor from './pages/Actor/UpdateActor/UpdateActor';
import UpdateMovie from './pages/movies/UpdateMovie/UpdateMovie';
import AddMovie from './pages/movies/AddMovie/AddMovie';
import SuccessAlert from './Components/Alert/SuccessAlert';
import FailureAlert from './Components/Alert/FalilureAlert';


function App() {
  const dispatch=useDispatch()
  const {baseUrl,successCreateAlert,successDeleteAlert,successUpdateAlert,failureCreateAlert,failureUpdateAlert,failureDeleteAlert}=useContext(IMDBContext)
  const navigate=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("admin-email")){
      dispatch(fetchMovies(baseUrl))
    dispatch(fetchActors(baseUrl))
    dispatch(fetchProducers(baseUrl))
    }
     else if(!localStorage.getItem("admin-email")){
      navigate("/")
    }
  },[])
  return (
    <div className="App">
      {successCreateAlert||successDeleteAlert||successUpdateAlert?
      <div className='alert'><SuccessAlert/></div>:
      failureCreateAlert||failureUpdateAlert||failureDeleteAlert?
      <div className='alert'><FailureAlert/></div>:""}
     <Routes>
     <Route exact path="/" element={<LogInPage/>}/>
     <Route  path="/landing" element={<LandingPage/>}/>
     <Route path="/signUp" element={<SignUpPage/>}/>
     <Route path="/forget" element={<ForgetPage/>}/>
     <Route path="/movies" element={<MovieList/>} />
     <Route path="/movies/:id" element={<MovieDetails />} />
     <Route path="/selMovie/:id" element={<SelMovie/>}/>
     <Route path="/wishlist" element={<WishList/>}/>
     <Route path="/updateMovie/:id" element={<UpdateMovie/>}/>
     <Route path="/addMovie" element={<AddMovie/>}/>

     <Route path="/actor" element={<Actor/>}/>
     <Route path="/addActor" element={<AddActor/>}/>
     <Route path="/updateActor/:id" element={<UpdateActor/>}/>
     
     <Route path="/producer" element={<Producer/>}/>
     <Route path="/addProducer" element={<AddProducer/>}/>
     <Route path="/updateProducer/:id" element={<UpdateProducer/>}/>
     <Route path='*' element={<LogInPage/>} />        
     </Routes>
    </div>
  );
}

export default App;
