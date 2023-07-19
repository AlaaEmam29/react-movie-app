import React, { useState } from "react";
import { useGlobalContext } from "../Context/Context";
import Loading from "../Loading/Loading";

export default function Person({
  name,
  homepage,
  known_for_department,
  biography,
  birthday,
  place_of_birth,
  profile_path,
})
{
  birthday = String(birthday).split('-').map(e => e[0] === '0' ? e.slice(1) : e);


  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  const {imgPrefix,isLoading} = useGlobalContext()
const [seeMore,setSeeMore] = useState(false)

  return <>
{isLoading ? <Loading /> : <div className="container py-5 ">
<div className="row  gx-5">
<div className="col-md-4 ">
<figure>
<img     src={profile_path ? imgPrefix + profile_path : "https://via.placeholder.com/300x450"} alt={name} className="img rounded-circle  shadow-img" />
</figure>
</div>
<div className="col-md-8">
<article>
<h1 className="text-uppercase letter-spacing">{name}</h1>
<div className="brdr"></div>
{biography ?   <p className='my-4 btn-space'>{seeMore ?String(biography) :  `${String(biography).slice(0,400)} ....`} 
<button className='btn-more' onClick={()=>setSeeMore(!seeMore)}>
{seeMore? "Show Less":"See More"}
</button>
</p> : <p className="my-4 btn-space">NO INFORMATION</p>
}
<ul className="list-unstyled celeb">
<li>
<i class="fa-solid fa-calendar-days me-3"></i>
<span>{birthday[0]} {monthNames[birthday[1]-1]} {birthday[2]}
</span>
</li>
<li>  
<i class="fa-solid fa-flag me-3"></i>
<span>{place_of_birth}</span>
</li>
<li>
<i class="fa-solid fa-briefcase me-3"></i><span>{known_for_department}</span>
</li>
</ul>
</article>
</div>
<div className="col-12  text-center my-5">
{homepage && <a href={homepage} className="btn btn-primary  letter-spacing">Visit Website</a>}
</div>
</div>
</div>}
  
  
  </>;
}
