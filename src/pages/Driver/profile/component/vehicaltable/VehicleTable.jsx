import "./style.css";
import React, {useState, useEffect} from 'react'
import axios from "axios";


const VehicleTable = () => {
    const [user, setUser] = useState(() => {
        const localData = JSON.parse(localStorage.getItem("user"));
        return localData || null;
    });
    const [vehicles, setVehicles] = useState([])

    const initVehicles = async () => {
        const responses = await axios.get(`http://ridewizard.pro:9000/api/v1/drivers/vehicles?user_id=${user.user.id}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                "Content-Type": "application/json",
              },
        })
        setVehicles(responses.data.data.vehicles)
    }

    useEffect(() => {
        initVehicles();
    })


    return (
        <div className="table-container w-100  pb-3">
            <h4 className="text-light w-100 border-1 border-bottom border-light px-3 py-3">Vehicle</h4>
            <div className="mx-3">
                <table className="w-100 background-table text-light ">
                    <thead className="border-bottom ">
                        <tr className="">
                            <th scope="col"></th>
                            <th scope="col">Make</th>
                            <th scope="col">Class</th>
                            <th scope="col">Number</th>
                            <th scope="col">Year</th>
                            <th scope="col">Colour</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(vehicle => (
                            <tr className=" bg-transparent" key={vehicle.id}>
                                <th scope="row">
                                    <button class="delete-button">
                                        <img src="./images/bin.png" alt="Xóa" />
                                    </button>
                                </th>
                                <td>{vehicle.model.type}</td>
                                <td>{vehicle.model.model}</td>
                                <td>{vehicle.licensePlate}</td>
                                <td>{vehicle.MfgYear}</td>
                                <td>{vehicle.color.color}</td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
            
            
        </div>
    );
}

export default VehicleTable;