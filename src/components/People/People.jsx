import React from 'react'
import { useGlobalContext } from '../Context/Context'
import ListOfItems from '../ListOfItems/ListOfItems'
import Loading from '../Loading/Loading'

export default function People() {
  const {isLoading , people} = useGlobalContext()
  return (
    <>
    {isLoading ? <Loading /> : <section className="container">
    <div className="row my-5 row-cols-lg-4 row-cols-md-3">
    {people.map((item) => <ListOfItems key={item.id} data ={item} />)}
    </div>
    </section>}
    </>
  )

}
