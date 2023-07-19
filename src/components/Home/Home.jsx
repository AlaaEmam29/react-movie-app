import React from "react";
import { useGlobalContext } from "../Context/Context";
import ListOfItems from "../ListOfItems/ListOfItems";
import Loading from "../Loading/Loading";
import SliderAutoPlay from "../SliderAutoPlay/SliderAutoPlay";

export default function Home() {
  let { people, movies, tvShows ,isLoading} = useGlobalContext();
 movies = movies.slice(0,12);
 people = people.slice(0,12);
 tvShows = tvShows.slice(0,12);
  return (
    <>
{isLoading ? <Loading /> :    <section className="container">
<SliderAutoPlay />

     
<div  className='row my-5 row-cols-lg-4  row-cols-md-3
row-cols-sm-2 row-cols-1 gy-5 align-items-center '>
{movies.map((item) => <ListOfItems key={item.id} data ={item} />)}

</div>
<div  className='row my-5 row-cols-lg-4 row-cols-md-3
row-cols-sm-2 row-cols-1 gy-5 align-items-center'>
{tvShows.map((item) => <ListOfItems key={item.id} data ={item} />)}
</div>
<div  className='row my-5 row-cols-lg-4 row-cols-md-3
row-cols-sm-2 row-cols-1 gy-5 align-items-center'>
{people.map((item) => <ListOfItems key={item.id} data ={item} />)}
</div>

</section>
 }
 
    </>
  )}