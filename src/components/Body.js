import { React, useState } from "react"
import "./body.css"
 
function Body({data}) {
    const [thingsHover, setThingsHover] = useState(false)
    const [placesHover, setPlacesHover] = useState(false)
    console.log(data)

	 function onClickDelete(e) {
		console.log(e)
	 }

     function handleThingsHover(){
        setThingsHover(true)
     }

     function handleThingsOut(){
        setThingsHover(false)
     }

     function handlePlacesHover(){
        setPlacesHover(true)
     }

     function handlePlacesOut(){
        setPlacesHover(false)
     }

    return(
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {data.map((data) => (
                <div className="col">
                    <div className="card h-100">
                        <img src={data.url} className="img card-img-top" alt={data.city}/>
                        <div className="card-body">
                            <h4 className="card-title" key={data.id}>{data.city}</h4>
                            <div class="line"></div>
                            <h6 className="list-contents">Things To Do</h6>
                            <ul>
                                {data.things_to_dos.map((things) =>
                                    <li className="list" key={things.id} onMouseOver={handleThingsHover} onMouseOut={handleThingsOut}>{things.activity}
                                        {thingsHover && 
                                            <span className="">
                                            <button className="button">
                                                🗑️
                                            </button>
                                            <button className="button">
                                                ✏️
                                            </button>
                                        </span>}
                                    </li>
                                )}
                            </ul>
                            <h6>Places To Go</h6>
                            <ul>
                                {data.places_to_gos.map((places) =>
                                    <li className="list" key={places.id} onMouseOver={handlePlacesHover} onMouseOut={handlePlacesOut}>{places.place}
                                    {placesHover && 
                                    <span className="">
                                            <button className="button">
                                                🗑️
                                            </button>
                                            <button className="button">
                                                ✏️
                                            </button>
                                        </span>}
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