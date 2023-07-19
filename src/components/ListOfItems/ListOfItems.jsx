import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context/Context";

export default function ListOfItems({ data }) {
  const { imgPrefix } = useGlobalContext();
  const {
    id,
    media_type,
    title,
    name,
    first_air_date,
    poster_path,
    release_date,
    profile_path,
    original_title,
    original_name,
  } = data;
  const getmediaType = () => {
    if (original_title) {
      return "movie";
    } else if (original_name && media_type !== "person") {
      return "tv";
    } else {
      return "person";
    }
  };
  const getPicture = () => {
    if (getmediaType() === "movie") {
      return imgPrefix + poster_path;
    } else if (getmediaType() === "tv") {
      return imgPrefix + poster_path;
    } else if (!profile_path) {
      return "https://via.placeholder.com/300x450";
    } else if (getmediaType() === "person") {
      return imgPrefix + profile_path;
    }
  };

  return (
    <>
      <Link
        to={`/${getmediaType()}/${id}`}
        className={`col  ${getmediaType()}`}
      >
        <article >
          <figure className="wrapper">
            <img
              src={getPicture()}
              alt=""
              className="img rounded rounded-1 shadow"
            />
            {getmediaType() === "person" ? (
              <div className="wrapper-cover position-absolute w-100 h-100 top-0 start-0   ">
              <div className="  d-flex align-items-center justify-content-center  h-100 text-uppercase letter-spacing py-5 ">
              celebrity blog
              </div>
            </div>

            ) : (
              <div className="wrapper-cover position-absolute w-100 h-100 top-0 start-0   ">
                <div className="playerOne  d-flex align-items-center justify-content-center  h-100 bg-primary py-5 ">
                  <i className="fa-solid fa-play "></i>
                </div>
              </div>
            )}
          </figure>
          <div className="item-info">
            <h3 className="text-white h6 btn-space text-muted">
              {title || name}
            </h3>
            {getmediaType() !== "person" && (
              <div className="show-info d-flex align-items-center justify-content-between">
                <p className="py-1 text-muted ">
                  {getmediaType() === "movie"
                    ? release_date !== null
                      ? release_date + " "
                      : "unknown "
                    : first_air_date !== null
                    ? first_air_date + " "
                    : "unknown "}
                </p>
                <div className="bg-black rounded-3  px-2 pb-1 btn-space">
                  {getmediaType()}
                </div>
              </div>
            )}
          </div>
        </article>
      </Link>
    </>
  );
}
