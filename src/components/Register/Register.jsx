import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi";

export default function Register() {
  const navigation = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rePassword :"",
    phone: "",
  });
  const [registeredBefore, setRegisteredBefore] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let [errorList, setErrorList] = useState({   });

  const RegisterUser = (e) => {
    let userData = { ...user };
    userData[e.target.name] = e.target.value;
    setUser(userData);
  };

  const validateRegisterData = (user) => {
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required().messages({
      "string.alphanum": "Username should only contain letters and numbers",
      "string.min": "Username minLength is 3",
      "string.max": "Username maxLength is 20",
      "any.required": "Username is required",
    }),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .messages({
        "string.email": "Invalid Email Address",
        "any.required": "Email is required",
      }),

    password: Joi.string()
      .pattern(passwordPattern, 'Password must be at least 8 characters long and contain at least one letter, one number, and special characters @$!%*?&')
      .required()
      .messages({
        "string.pattern.base": 'Password must be at least 8 characters long and contain at least one letter, one number, and special characters @$!%*?&',
        "any.required": "Password is required",
      }),

    rePassword: Joi.valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords do not match",
        "any.required": "rePassword is required",
      }),

    phone: Joi.string()
      .pattern(new RegExp("^01[0125][0-9]{8}$"))
      .required()
      .messages({
        "string.pattern.base": "Phone number must be an Egyptian number (e.g., 010/011/012/015) with a total of 11 digits",
        "any.required": "Phone is required",
      }),
  });

  return schema.validate(user, { abortEarly: false });
};



  const sendRegisterData = async () => {
    console.log(user , "-------user- -----------")
    const { data } = await axios.post(
      "https://route-ecommerce.onrender.com/api/v1/auth/signup",
      user
    );

    if (data.message === "success") {
      setIsLoading(false);
      navigation("/login");
    } else {
      setIsLoading(false);

      let errorMessage = data.message.split(":");
      if (errorMessage.length === 3) {
        errorMessage = errorMessage[errorMessage.length - 1];
      } else {
        errorMessage = `${errorMessage[errorMessage.length - 2]} ${
          errorMessage[errorMessage.length - 1]
        }`;
      }
      setRegisteredBefore(errorMessage);
    }
  };
  const submitForm = (e) => {
    e.preventDefault();

    setIsLoading(true);
    let validation = validateRegisterData();
    console.log(validation)
    const { error } = validation;
    
    const errList = { ...errorList };
    if (error) {
      setIsLoading(false);
      error.details.map(err => errList[err.path[0]] =  err.message)
      setErrorList(errList)
    }
     else {
      sendRegisterData();

    }
  };
  useEffect(() => {
      console.log("errList" , errorList)

} , [])
  return (
    <>
    <div className="container">

      <div className="w-75 mx-auto py-3 btn-space">
        <h1 className="h2 text-center ">Register Now</h1>
        <form onSubmit={submitForm}>
          {registeredBefore && (
            <div className="my-3  alert alert-danger">{registeredBefore}</div>
          )}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
               Name
            </label>
            <input
              onChange={RegisterUser}
              name="name"
              type="text"
              className="form-control"
            />
            {errorList.first_name && <div className="my-2 text-danger">{errorList.name}</div>}
          </div>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              onChange={RegisterUser}
              name="email"
              type="email"
              className="form-control"
            />
            {errorList.email && <div className="my-2 text-danger">{errorList.email}</div>}

          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={RegisterUser}
              className="form-control"
              
            />
            {errorList.password && <div className="my-2 text-danger">{errorList.password}</div>}</div>

                      <div className="mb-3">
            <label htmlFor="rePassword" className="form-label">
              Confirm password
            </label>
            <input
              name="rePassword"
              type="password"
              onChange={RegisterUser}
              className="form-control"
              
            />
            {errorList.rePassword && <div className="my-2 text-danger">{errorList.rePassword}</div>}</div>

            <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Phone Number
            </label>
            <input
              name="phone"
              type="text"
              className="form-control"
              onChange={RegisterUser}
            />
            {errorList.phone && <div className="my-2 text-danger">{errorList.phone}</div>}

          </div>
          <button
            type="submit"
            className="btn btn-space  btn-outline-info px-5 mt-3"
          >
            {isLoading ? (
              <i className="fa-solid fa-sync fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
