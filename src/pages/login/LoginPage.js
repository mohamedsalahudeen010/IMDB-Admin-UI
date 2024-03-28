import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import "./Login.css"

import {useDispatch} from "react-redux"
import { IMDBContext } from "../../Context";
import { fetchUserSuccess } from "../../redux/admin/adminAction";


const emailValidation = yup.object({
  email: yup.string().required("Enter an Email"),
  password: yup.string().required("Enter Password").min(8,"Enter Minimum Eight Characters"),
});

const LogInPage = () => {
  const [user,setUser]=useState()
  const [showPassword, setShowPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const[loader,setLoader]=useState(false)
  const navigate = useNavigate();
  const dispatch=useDispatch()
const {baseUrl}=useContext(IMDBContext)

const logInFunc = async (user) => {
  console.log("Hellooo")
  try {
    const response = await fetch(`${baseUrl}/adminLogin`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.message === "Admin logged in successfully") {
      setUser(data.admin)
      localStorage.setItem("admin-email",data.admin.email);
      localStorage.setItem("admin-name",data.admin.firstName);
      localStorage.setItem("admin-token",data.token);
      dispatch(fetchUserSuccess(data.admin.firstName))
      navigate("/landing");
    } else if(data.message === "invalid credentials password"){
      setShowPassword(true);
      setLoader(false)
    } else if(data.message === "invalid credentials email"){
      setShowEmail(true);
      setLoader(false)
    }
  } catch (error) {
    console.log("admin LogIn Error : ", error);
  
  }

};
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: emailValidation,
      onSubmit: (user) => {
        logInFunc(user);
      },
    });
   

      const setLoaderFunction =()=>{
      if(!values.email ||
        !values.password || (errors.password && touched.password)){
       return setLoader(false)
      }
      else{
        return setLoader(true)
      };
    }
  
  return (
   
    <div className="loginPage">
      
      <div className="login-main">

      <div>
        <div>
          <form onSubmit={handleSubmit} className="form-signIn">
            <div className="title-login-user"
            onClick={()=>navigate("/")}>IMDB</div>

          <div className="credentials"><span>UserId : admin123@gmail.com</span> || 
            
            <span>password : admin12345</span></div>

          <div className="input-div">
                <label className="textlabel-signIn" htmlFor="email"
                >Email <span style={{color:"brown"}}>*</span></label>
              <input
                className="input-login-user"
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
              ></input>
            </div>
            {errors.email && touched.email ? (
              <h6 style={{ color: "red" }}>{errors.email}</h6>
            ) : (
              ""
            )}

              <div className="input-div">
                <label className="textlabel-signIn" htmlFor="password">Password <span style={{color:"brown"}}>*</span></label>
              <input
                placeholder="Password"
                className="input-login-user"
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              ></input>
            </div>
            {errors.password && touched.password ? (
              <h6 style={{ color: "red" }}>{errors.password}</h6>
            ) : (
              ""
            )}
            {showEmail?(
              <h6 style={{ color: "red" }}>
                Entered Email Is not available, please Signup before login
              </h6>
            ) : (
              ""
            )}
            {showPassword ? (
              <h6 style={{ color: "red" }}>
                Password is incorrect
              </h6>
            ) : (
              ""
            )}

            <div className="flex-container">
              <div className="w-100 m-1">
               
            <p
            className="forget-password-login-user"
            onClick={() => navigate("/forget")}
            
          >
            Forget Password
          </p>
              </div>
              <div className="w-100 m-1">
                <button type="" className="login-btn-land"
                onClick={()=>setLoaderFunction()}
                >
                  {loader?<Spinner animation="border" variant="secondary" size="md" />:"Login"}
                </button>
              </div>
            </div>
            <div>
        <p>Click Here To SignUp <button onClick={()=>navigate("/signUp")}
        className="signUpNavigate">SignUp</button></p>
        </div>
          </form>
        </div>
        
        
  
        
      </div>
      </div>
    
    </div>
   
    
  );
};

export default LogInPage;
