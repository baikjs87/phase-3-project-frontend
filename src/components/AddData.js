import { React, useState } from "react"
import './add-data.css'

function AddData({data}){
    const [city, setCity] = useState("")
    const [thingsToDo, setThingsToDo] = useState("")
    const [placesToGo, setPlacesToGo] = useState("")

    function handleCitySubmit(e) {
        e.preventDefault()
        console.log(city)
    }

    return(
        <div className="form-container card">
            <div class="card-body">
                <div className="new-interest-point">
                    <h5>Add Your New Interest Point</h5>
                    <form className="city-form" onSubmit={handleCitySubmit}>
                        <label className="">
                            <input type="text" value={city} placeholder="New City" onChange={(e) => setCity(e.target.value)} className="city-input" />
                        </label>
                        <button type="submit" className="btn">Add</button>
                    </form>
                </div>
                <div class="line"></div>
                <div>
                    {/* <h6>New Things To Do</h6> */}
                    <form className="city-form">
                        <label className="">
                            <input type="text" value={thingsToDo} placeholder="New Things To Do" onChange={(e) => setThingsToDo(e.target.value)} className="city-input" />
                            <select className="select city-input">
                                <option selected>Select City</option>
                                {data.map((data) => 
                                <option value={data.id}>{data.city}</option>)}
                            </select>
                        </label>
                        <button type="submit" className="btn">Add</button>
                    </form>
                </div>
                <div class="line"></div>
                <div>
                    {/* <h6>New Places To Go</h6> */}
                    <form className="city-form">
                        <label className="">
                            <input type="text" value={placesToGo} placeholder="New Places To Go" onChange={(e) => setPlacesToGo(e.target.value)} className="city-input" />
                            <select className="select city-input">
                                <option selected>Select City</option>
                                {data.map((data) => 
                                <option value={data.id}>{data.city}</option>)}
                            </select>
                        </label>
                        <button type="submit" className="btn">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddData;