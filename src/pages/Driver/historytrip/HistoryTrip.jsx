import "../../../styles/Pages/Home.css"
import "../../../styles/Pages/Admin.css"
import React, { useEffect, useState } from 'react';
import TripService from "../../../service/TripService";
import moment from 'moment';
import groovyWalkAnimation from '../../../lotti/driver_banner.json';
import Lottie from "lottie-react";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const HistoryTrip = () => {
    const [trips, setTrips] = useState([]);
    const [loading1, setLoading1] = useState(true);
    const [localData, setLocalData] = useState(() => {
        const localData = JSON.parse(localStorage.getItem('user')); 
        console.log(localData);
        return localData || null
    });
    const [accessToken, setAccessToken] = useState(localData.accessToken);
  const [userId, setUserId] = useState(localData.user.id);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(null);
  const [searchData, setSearchData] = useState([])
    const getTrips = async () => {

        const res = await TripService.getHistoryTrip(accessToken, userId);
        console.log(res);
        if (res) {
            setTrips(res.data.data)
            console.log(res.data);
        }
        setLoading1(false)
    }
    useEffect(() => {
        getTrips()
    }, [])
  
  
  const handleSearch = (address) => {
    setAddress(address)
    setSearchData(() => {
      return trips.filter(item => item.pickupAddress.includes(address)||item.destinationAddress.includes(address))
    })
    console.log(searchData);
  }

    return (
        <div className="A22A">
          {loading1 ? (
            <p>Loading...</p>
            ) : (
            <>
              <div className={`filter-container `}>

                <label className="filter-label">
                    Address: 
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search..."
                        value={address}
                        onChange={(event) => handleSearch(event.target.value)}
                    />
                </label>

                {/* {index === 1 && (
                    <label className="filter-label">
                        Driver Status:
                        <select className="filter-dropdown" value={selectedDriverStatus} onChange={(e) => setSelectedDriverStatus(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Insufficient verification information">Insufficient verification information</option>
                            <option value="Insufficient authentication information">Insufficient authentication information</option>
                            <option value="Pending approval">Pending approval</option>
                            <option value="Approved">Approved</option>
                        </select>
                    </label>
                )} */}

                {/* {index === 1 && (
                    <label className="filter-label">
                        Average Rate:
                        <select className="filter-dropdown" value={selectedAvgRate} onChange={(e) => setSelectedAvgRate(e.target.value)}>
                            <option value="All">All</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </label>
                )} */}

                <label className="filter-label">
                    Tine :
                    <input
                        className="exact-match-checkbox"
                        type="date"
                        // checked={exactMatch}
                        // onChange={() => setExactMatch(!exactMatch)}
                    />
                </label>
            </div>
                        {trips.length > 0 ? (
                            <table className="trip-table">
                
                            <thead>
                              <tr > 
                                <th>ID</th>
                                <th>Pickup Address</th>
                                <th>Destination Address</th>
                                <th>Status</th>
                                <th>Created At</th>
                              </tr>
                            </thead>
                            <tbody>
                              
                                {trips.map((trip) => (
                                  <tr key={trip.id} className={trip.status === 'completed' ? 'completed' : 'canceled'}>
                                    <td>{trip.id}</td>
                                    <td>{trip.pickupAddress}</td>
                                    <td>{trip.destinationAddress}</td>
                                    <td className="status">{trip.status}</td>
                                    <td>{moment(trip.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                                  </tr>
                                ))}
                                          
                            </tbody>
                          </table>
                        ) : (
                                <div className="d-flex flex-column align-items-center">
                                    <Lottie animationData={groovyWalkAnimation} loop={true} className='lottie' />
                                    <h3>No trip</h3>
                            </div>
                        )
                    }
                        
                    </>
                    
            
          )}
        </div>
      );
}

export default HistoryTrip