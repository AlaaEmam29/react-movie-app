import React from 'react'
import { useGlobalContext } from '../Context/Context';
import { Link } from "react-router-dom";

export default function Item({trending}) {
    const {   imgPrefix } = useGlobalContext();
    const { media_type , id, title,vote_average, name,poster_path,overview}=trending
  return (
    <>
    <Link to={`/${media_type}/${id}`} className="wrapper ">
<img alt={name || title} className="" src={imgPrefix + poster_path} />
<div className="wrapper-cover   position-absolute w-100 h-100 top-0 start-0">
<h6 className="badge badge-trending  bg-danger">{Number(vote_average.toFixed(2))}</h6>

<div className="info h-100 d-flex flex-column align-items-center justify-content-center text-start">
<h6>{media_type}</h6>
<h2 className="text-center">{title || name}</h2>
<p>{overview}</p>
</div>
</div>
    </Link>
    </>
  )
}