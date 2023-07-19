import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
 
export default function Login({getUSerInfo}) {

  const navigation = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userNotRegister, setUserNotRegister] = useState('');
  let [errorList, setErrorList] = useState({   
});

  const loginUser = (e) => {
    let userData = { ...user };
    userData[e.target.name] = e.target.value;
    setUser(userData);
  };

  const validateLoginData = () => {
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

    const schema = Joi.object({
      
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .messages({
          "string.email":
            'Invalid Email Address && /$w.@/w/.com$/, "Should be a .com or .net domain"',
          "string.empty": `"Email Address" cannot be an empty field`,
          "any.required": `"Email Address" is a required.`,
        }),
    password: Joi.string()
      .pattern(passwordPattern, 'Password must be at least 8 characters long and contain at least one letter, one number, and special characters @$!%*?&')
      .required()
      .messages({
        "string.pattern.base": 'Password must be at least 8 characters long and contain at least one letter, one number, and special characters @$!%*?&',
        "any.required": "Password is required",
      }),



    });
    return schema.validate(user, { abortEarly: false });
  };

  const sendLoginData = async () => {
    const { data } = await axios.post(
      "https://route-ecommerce.onrender.com/api/v1/auth/signin",
      user
    );

    if (data.message === "success") {
      setIsLoading(false);
      localStorage.setItem("userToken", data.token);
      getUSerInfo();
      navigation("/home");
    } else {
      setIsLoading(false);
    setUserNotRegister(data.message);
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let validation = validateLoginData();
    const { error } = validation;
    const errList ={...errorList};
    if (error) {
      setIsLoading(false);
      error.details.map(err => errList[err.path[0]] =  err.message)
      setErrorList(errList)
    }
     else {
      sendLoginData();

    }
  };

  return (
    <>
    <div className="container">

    <div className="w-75 mx-auto py-5 btn-space">
      <h1 className="h2 text-center ">Login Now</h1>
      <form onSubmit={submitForm}>
      {userNotRegister && (
        <div className="my-3  alert alert-danger">{userNotRegister}</div>
      )}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input onChange={loginUser} name="email" type="email" className="form-control" />
          {errorList.email && <div className="my-2 text-danger">{errorList.email}</div>}

        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={loginUser} name="password" type="password"   className="form-control" />
          {errorList.password && <div className="my-2 text-danger">{errorList.password}</div>}

        </div>
        <button
        type="submit"
        className="btn btn-space  btn-outline-info px-5 mt-3"
      >
        {isLoading ? (
          <i className="fa-solid fa-sync fa-spin"></i>
        ) : (
          "Login"
        )}
      </button>
      </form>
    </div>
    </div>
  </>
  )
}
