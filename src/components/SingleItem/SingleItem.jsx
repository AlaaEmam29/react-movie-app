import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../Context/Context";
import Person from "../Person/Person";

import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../Loading/Loading";

export default function SingleItem() {
  const { media_type, id } = useParams();
  const [singleItem, setSingleItem] = useState([]);
  let [cast, setCast] = useState([]);
  let [similar, setSimilar] = useState([]);
if(cast && similar )  
{
  cast = cast.slice(0, 20) ; 
  similar = similar.slice(0, 20);
}

  const { fetchData, imgPrefix ,isLoading } = useGlobalContext();
  const getSimilarInfo = async (media_type, id) => {
    const API_ENDPOINT = `https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`;
    let ANOTHER_API_ENDPOINT = `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
    try {
      Promise.all([
        fetch(API_ENDPOINT).then((resp) => resp.json()),
        fetch(ANOTHER_API_ENDPOINT).then((resp) => resp.json()),
      ]).then((allResponses) => {
        setSimilar(allResponses[0].results);
        setCast(allResponses[1].cast);
      });

    } catch (error) {
      console.log(error);

    }
  };
  useEffect(() => {
    fetchData(media_type, setSingleItem, true, id);
    getSimilarInfo(media_type, id);
  }, []);
 
  let {
    backdrop_path,
    genres,
    title,
    homepage,
    overview,
    vote_average,
    vote_count,
    tagline,
    popularity,
    release_date,
    first_air_date,
    name,
    
  } = singleItem;
  vote_average = Number(vote_average).toFixed(2);
  return (
    <>
     
 {isLoading ? <Loading />:  <React.Fragment>
 {media_type === 'movie' || media_type === 'tv'? <>
   
 <section
 className="single-item "
 style={{ backgroundImage: `url(${imgPrefix}${backdrop_path})` }}
>
 <div className="container letter-spacing container-item  h-100">
   <h2 className="h4">{name || title}</h2>
   <p className="text-dark">{tagline}</p>
   <div className="generes d-flex align-items-center ">
     {genres &&
       genres.map((item) => (
         <span key={item.id} className="badge mx-2 p-2 ">
           {item.name}
         </span>
       ))}
   </div>
   <div className="single-item-info  my-4">
     <span className="rating">
       <i className="fa-solid fa-star"></i> {vote_average}
     </span>
     <h6>Vote Count : {vote_count}</h6>
     <h6>Popularity : {popularity}</h6>
     <h6>Release Data : {release_date || first_air_date}</h6>
   </div>
   <p className="description">{overview}</p>
   {homepage && (
     <a
       href={homepage}
       target="_blank"
       className="btn btn-primary btn-color text-center" 
     >
       Visit Website
     </a>
   )}
 </div>
</section>
<div className=" letter-spacing container my-5 py-5 ">
 <h3 className="text-uppercase">Cast {media_type}</h3> <br />
 <Swiper
   watchSlidesProgress={true}
   slidesPerView={3}
   className="mySwiper"
 >
   {cast &&
     cast.map((item, index) => (
       <SwiperSlide key={index}>
         <Link target='_blank' to={`/person/${item.id}`} >
           <figure className="wrapper  w-75">
             <img
               src={`${imgPrefix}${item.profile_path}`}
               alt=""
               className=" rounded rounded-1 shadow"
             />

             <div className="wrapper-cover position-absolute w-100 h-100 top-0 start-0   ">
               <div className="playerOne  d-flex align-items-center justify-content-center  h-100 bg-primary py-5 ">
                 <i className="fa-solid fa-play "></i>
               </div>
             </div>
           </figure>
         </Link>
       </SwiperSlide>
     ))}
 </Swiper>
 <h3 className="text-uppercase">Similar {media_type ==='movie' ? 'movies' : 'tv Shows'}</h3> <br />

 <Swiper
   watchSlidesProgress={true}
   slidesPerView={3}
   className="mySwiper"
 >
   {similar &&
     similar.map((item) => (
       <SwiperSlide key={item.id}>
         <Link target='_blank'    to={`/${media_type}/${item.id}`} >
           <figure className="wrapper  ">
           <img
           src={`${imgPrefix}${item.backdrop_path}`}
           alt=""
           className=" img rounded rounded-1 shadow"
         />

         <div className="wrapper-cover position-absolute w-100 h-100 top-0 start-0   ">
           <div className="playerOne  d-flex align-items-center justify-content-center  h-100 bg-primary py-5 ">
             <i className="fa-solid fa-play "></i>
           </div>
         </div>
           </figure>
         </Link>
       </SwiperSlide>
     ))}
 </Swiper>
</div>
 </> :<Person {...singleItem}/>}
 </React.Fragment> }
    
    </>
  );
}
