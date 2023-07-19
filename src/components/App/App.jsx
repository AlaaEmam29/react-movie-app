import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import Movies from "../Movies/Movies";
import People from "../People/People";
import Tv from "../Tv/Tv";
import NotFound from "../NotFound/NotFound";
import Login from "../Login/Login";
import Register from "../Register/Register";
import jwt_decode from "jwt-decode";

import Navbar from "../Navbar/Navbar";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import ProtectedRoutesAuth from "../ProtectedRoutesAuth/ProtectedRoutesAuth";
import SingleItem from "../SingleItem/SingleItem";

export default function App() {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState(null);
  const getUSerInfo = () => {
    const decoded = jwt_decode(localStorage.getItem("userToken"));
    setLoginUser(decoded);
  };
  const logoutUSer = () => {
    localStorage.removeItem("userToken");
    setLoginUser(null);
    navigate("/login");
  };
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUSerInfo();
    }
    else {
            navigate("/login");

    }
  }, []);

  return (
    <React.Fragment>
      
      <Navbar loginUser={loginUser} logoutUSer={logoutUSer} />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route
            path="home"
            element={
              <Home />
            }
          />
          <Route
            path="tv"
            element={
              <Tv />
            }
          />
          <Route
            path="movies"
            element={
              <Movies />
            }
          />
          <Route
            path="people"
            element={
              <People />
            }
          />
          <Route
            path="/:media_type/:id"
            element={
              <SingleItem />
            }
          />


        </Route>
        <Route element={<ProtectedRoutesAuth />}>
          <Route path="register" element={
            <Register />
          } />
          <Route path="login" element={

            <Login getUSerInfo={getUSerInfo} />
          } />

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}
