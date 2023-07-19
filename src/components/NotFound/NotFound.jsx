import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
	<div className="container">

    <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>404</h1>
			</div>
			<h2 className='text-white mb-3'>Oops, The Page you are looking for can't be found!</h2>
		
			<NavLink to='/login'><span className="arrow"></span>Return To MainPage</NavLink>
		</div>
	</div>
	</div>
    </>
  )
}
