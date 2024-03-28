import React, { useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import "./ForgetPage.css"
import { useNavigate } from "react-router-dom";
import { IMDBContext } from "../../Context";


const emailValidation = yup.object({
  email: yup.string().required("Enter a Email"),
  
});

const ForgetPage = () => {
 const{baseUrl}=useContext(IMDBContext)
  const [showEmail, setShowEmail] = useState(false);
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        
      },
      validationSchema: emailValidation,
      onSubmit: (email) => {
        logInFunc(email);
      },
    });

  const logInFunc = async (email) => {
    try {
      const response = await fetch(`${baseUrl}/forgetpassword`, {
        method: "POST",
        body: JSON.stringify(email),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "Enter Valid Email") {
        
        setShowEmail(true);
        
      } else if(data.message === "mail sent successfully") {
       
        navigate("/login");
      } 
    } catch (error) {
      console.log("User LogIn Error : ", error);
    }
  };
  return (
  
    <div className="forgetPage">

      <div className="main-container">
      <div className="main-logo">
       
        <div>
          <h3 className="title-forget"
          onClick={()=>navigate("/")}
          style={{cursor:"pointer"}}>
          IMDB
          </h3>
        </div>
       
      </div>

      <div>
        <div>
        <h2 className="signIn-title">Froget Password Page</h2>
        <span style={{marginTop:"4rem",fontWeight:"bold"}}>Enter Registered Email to get password</span>
          <form onSubmit={handleSubmit} className="form-forget">
          <div className="input-div">
                <label class="textlabel" for="email">Enter Email</label>
              <input
                className="input"
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

              
          
            {showEmail?(
              <h6 style={{ color: "red" }}>
                Entered Email Is not available, please Signup 
              </h6>
            ) : (
              ""
            )}
           

            <div className="flex-container">
              <div className="w-100 m-1">
                
              </div>
              <div className="w-100 m-1">
                <button type="" className="forget-btn btn">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <p style={{marginTop:"5rem"}}>
          This site is protected by reCAPTCHA and the Google
          <span>
            <a
              href="https://policies.google.com/privacy"
              target={"_blank"}
              rel={"noreferrer"}
            >
              Privacy Policy
            </a>
          </span>
          and{" "}
          <span>
            <a
              href="https://policies.google.com/terms"
              target={"_blank"}
              rel={"noreferrer"}
            >
              Terms of Condition{" "}
            </a>
          </span>{" "}
          apply.
        </p>
        <hr></hr>
        <div className="footer_Newuser"></div>
      </div>
      </div>
    </div>
 
    
  );
};

export default ForgetPage;
