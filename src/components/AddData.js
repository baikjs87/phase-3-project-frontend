import { React, useState } from "react"
import './add-data.css'

function AddData({ data, cityAdded, setLocation }){
    const [city, setCity] = useState("")
    const [URL, setURL] = useState("")
    const [thingsToDo, setThingsToDo] = useState("")
    const [placesToGo, setPlacesToGo] = useState("")
    const [thingsCitySelect, setThingsCitySelect] = useState()
    const [placesCitySelect, setPlacesCitySelect] = useState()

    const handleCitySubmit = (e) => {
        e.preventDefault()
        setCity("")
        setURL("")
        const newCity = { city, URL }

        fetch("http://localhost:9292/locations", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newCity),
		})
			.then((r) => r.json())
			.then((newCityCreated) => cityAdded(newCityCreated))

            .catch((err) => (console.log(err)))

        console.log(newCity)
        }

    const handleNewThings = (e) => {
        e.preventDefault()
        setThingsToDo("")
        console.log(thingsCitySelect)
        const newThing = { "activity": thingsToDo, "location_id": thingsCitySelect }

        fetch("http://localhost:9292/things_to_do", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newThing),
		})
			.then((r) => r.json())
			.then((newThingCreated) => {
                console.log(newThingCreated)
                let copyArr = JSON.parse(JSON.stringify(data))
                copyArr.map((location) => {
                    if(location.id === newThingCreated.location_id) {
                        location.things_to_dos.push(newThingCreated)
                    }
                    return location
                })
                setLocation(copyArr)
            })

            .catch((err) => (console.log(err)))

        console.log(newThing)
    }

    const handleNewPlaces = (e) => {
        e.preventDefault()
        setPlacesToGo("")
        const newPlace = { "place": placesToGo, "location_id": placesCitySelect }

        fetch("http://localhost:9292/places_to_go", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newPlace),
		})
			.then((r) => r.json())
			.then((newPlaceCreated) => {
                console.log(newPlaceCreated)
                let copyPlacesArr = JSON.parse(JSON.stringify(data))
                copyPlacesArr.map((location) => {
                    if(location.id === newPlaceCreated.location_id) {
                        location.places_to_gos.push(newPlaceCreated)
                    }
                    return location
                })
                setLocation(copyPlacesArr)
            })

            .catch((err) => (console.log(err)))

        console.log(newPlace)
    }

    function reset() {
        const dropdown = document.getElementById("dropdown")
    }

    return(
        <div className="card accordion" id="accordionExample">
            <div className="accordion-item">
                <div className="new-interest-point">
                    <h5>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Add Your New Interest Point
                        </button>
                        </h5>
                    <form className="accordion-collapse collapse newCity" id="collapseOne" onSubmit={handleCitySubmit}>
                        <label className="accordion-body">
                            <input type="text" value={city} placeholder="New City" onChange={(e) => setCity(e.target.value)} className="city-input new-city" required/>
                        </label>
                        <label className="">
                            <input type="text" value={URL} placeholder="City Image URL" onChange={(e) => setURL(e.target.value)} className="city-input" />
                        </label>
                        <button type="submit" className="add-button">Add</button>
                    </form>
                </div>
                <div className="line accordion-collapse collapse" id="collapseOne"></div>
                <div>
                    {/* <h6>New Things To Do</h6> */}
                    <form className="accordion-collapse collapse newThings" id="collapseOne" onSubmit={handleNewThings}>
                        <label className="accordion-body">
                            <input type="text" value={thingsToDo} placeholder="New Things To Do" onChange={(e) => setThingsToDo(e.target.value) } className="city-input" required/>
                            <select className="select city-input" onChange={(e) => {setThingsCitySelect(e.target.value)}} required>
                                <option value="default" >Select City</option>
                                {data.map((data) => 
                                <option value={data.id} key={data.id}>{data.city}</option>)}
                            </select>
                        </label>
                        <button type="submit" className="add-button" onClick={reset()}>Add</button>
                    </form>
                </div>
                <div className="line accordion-collapse collapse" id="collapseOne"></div>
                <div>
                    {/* <h6>New Places To Go</h6> */}
                    <form className="accordion-collapse collapse newPlaces" id="collapseOne" onSubmit={handleNewPlaces}>
                        <label className="accordion-body">
                            <input type="text" value={placesToGo} placeholder="New Places To Go" onChange={(e) => setPlacesToGo(e.target.value)} className="city-input" required/>
                            <select className="select city-input" onChange={(e) => {setPlacesCitySelect(e.target.value)}}  required>
                                <option value="default" defaultValue>Select City</option>
                                {data.map((data) => 
                                <option value={data.id} key={data.id}>{data.city}</option>)}
                            </select>
                        </label>
                        <button type="submit" className="add-button" onClick={reset()}>Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddData;