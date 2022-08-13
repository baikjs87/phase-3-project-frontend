import { React, useState } from "react"
import "./body.css"
 
function Body({ data, onCityDelete, onActivityDelete, onPlaceDelete }) {

     function sortData (x, y) {
        return x.city.localeCompare(y.city)
     }

     const sortedData = data.sort(sortData)

	 function handleActivityDelete(activity) {
		fetch(`http://localhost:9292/things_to_do/${activity.id}`, {
            method: "DELETE",
        })
        .then((r) => r.json())
        .then((deletedActivity) => {
     
            console.log(deletedActivity)
                    
            let copyActivitiesArr = JSON.parse(JSON.stringify(data))
            copyActivitiesArr.map((location) => {
                if(location.id === deletedActivity.location_id) {
                    const deleteActivity = location.things_to_dos.filter((act) => act.id !== deletedActivity.id)
                    location.things_to_dos = deleteActivity
                }
                return copyActivitiesArr
            })
            onActivityDelete(copyActivitiesArr)
        });
    }

	 function handlePlaceDelete(place) {
		fetch(`http://localhost:9292/places_to_go/${place.id}`, {
            method: "DELETE",
        })
        .then((r) => r.json())
        .then((deletedPlace) => {
     
            console.log(deletedPlace)
                    
            let copyPlacesArr = JSON.parse(JSON.stringify(data))
            copyPlacesArr.map((location) => {
                if(location.id === deletedPlace.location_id) {
                    const deletePlace = location.places_to_gos.filter((pl) => pl.id !== deletedPlace.id)
                    location.places_to_gos = deletePlace
                }
                return copyPlacesArr
            })
            onPlaceDelete(copyPlacesArr)
        });
    }

    function handleCityDelete(card) {
        fetch(`http://localhost:9292/locations/${card.id}`, {
            method: "DELETE",
        })
        .then((r) => r.json())
        .then((deletedCity) => onCityDelete(deletedCity));
        }
 
    return(
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {sortedData.map((city) => (
                <div className="col" key={city.id}>
                    <div className="card h-100">
                        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => handleCityDelete(city)} />
                        <img src={city.url} className="img card-img-top" alt={city.city} onError={event => {
                        event.target.src = "https://images.unsplash.com/photo-1502301197179-65228ab57f78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80"
                        event.onerror = null
                        }} />
                        <div className="card-body">
                            <h4 className="card-title" key={city.id}>{city.city}</h4>
                            <div className="line"></div>
                            <h6 className="list-contents">Things To Do</h6>
                            <ul>                                    
                                {city.things_to_dos.map((things) =>
                                    <li className="list" key={things.id}>{things.activity}
                                            <span className="">
                                            <button className="button" onClick={()=>(handleActivityDelete(things))}>
                                                🗑️
                                            </button>
                                            {/* <button className="button">
                                                ✏️
                                            </button> */}
                                        </span>
                                    </li>
                                )}
                            </ul>
                            <h6>Places To Go</h6>
                            <ul>
                                {city.places_to_gos.map((places) =>
                                    <li className="list" key={places.id}>{places.place}
                                    <span className="">
                                            <button className="button" onClick={()=>(handlePlaceDelete(places))}>
                                                🗑️
                                            </button>
                                            {/* <button className="button">
                                                ✏️
                                            </button> */}
                                        </span>
                                    </li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
 
export default Body