import React, { useEffect, useState } from "react"
import Body from './Body'
import AddData from "./AddData"
import './home.css'
 
function Home() {
    const [location, setLocation] = useState([])
 	console.log(location)

    useEffect(() => {
      fetch("http://localhost:9292/locations")
      .then((r) => r.json())
      .then((data) => setLocation(data));
     }, [])

 
    return (
        <div>
            <div className="header container">
                	<h3 className="title">tripaholic</h3>
            </div>
			<div class="line"></div>
			<div className="sub-header container">
                <h1 className="quote display-6">Explore Your Next Vacation Destinations!</h1>
			</div>
			<div className="add-data container">
				<AddData data={location} />
			</div>
            <div className="contents container">
                <Body data={location} />
            </div>
        </div>
    )
}
 
export default Home