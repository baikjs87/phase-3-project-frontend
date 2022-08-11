import React from "react"
import { NavLink } from "react-router-dom"

function NavBar() {
	return (
		<div className="navbar">
			<ul>
				<li>
					<NavLink to="/" exact>
						Home
					</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default NavBar
