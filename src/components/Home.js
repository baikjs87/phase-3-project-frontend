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

	 function newCity(city) {
		setLocation([...location, city])
	 }

	 function handleCityDelete(deletedCity) {
		const deleteCity = location.filter((city) => city.id !== deletedCity.id)
		setLocation(deleteCity)
	 }
	 
		  function handleActivityDelete(deletedActivity) {
			 setLocation(deletedActivity)
		  }
	 
		  function onPlaceDelete(deletedPlace) {
			 setLocation(deletedPlace)
		  }
	 
    return (
        <div>
            <div className="header container">
                	<h3 className="title">tripaholic</h3>
            </div>
			<div className="line"></div>
			<div className="sub-header container">
                <h1 className="quote display-6">Explore Your Next Vacation Destinations!</h1>
			</div>
			<div className="add-data container">
				<AddData data={location} cityAdded={newCity} setLocation={setLocation} />
			</div>
            <div className="contents container">
                <Body data={location} onCityDelete={handleCityDelete} onActivityDelete={handleActivityDelete} onPlaceDelete={onPlaceDelete} />
            </div>
        </div>
    )
}
 
export default Home