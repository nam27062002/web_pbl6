import React, { useEffect, useState } from 'react';
import './style.css'
import TripService from "../../../service/TripService";
import moment from 'moment';
import groovyWalkAnimation from '../../../lotti/HistoryAnimation.json';
import Lottie from "lottie-react";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import util from '../../../util';



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
  const [searchData, setSearchData] = useState([])
  const [selectedDate, setSelectedDate] = useState('');
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
  const handleDateChange = (event) => {
    const newDateValue = event.target.value;
    setSelectedDate(newDateValue);
    console.log(newDateValue);
    setSearchData(() => {
      return trips.filter(item => {
        return item.createdAt.includes(newDateValue)
      })
    })
    console.log(searchData);
  };

  return (
    <div className="container-history ">
        
      <h3 className="mx-3 my-2 text-light">Trip History</h3>
      <div className="container-content-history">
        {loading1 ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className={`filter-container `}>

              <label className="text-light mx-3">
                Address:
                <input
                  className="form-item-history text-light ms-3 "
                  type="text"
                  placeholder="Search..."
                  value={address}
                  onChange={(event) => handleSearch(event.target.value)}
                />
              </label>
                

                
              <label className="filter-label text-light">
                Time:
                <input
                  className=" text-light form-item-history ms-3"
                  type="date"
                  checked={selectedDate}
                  onChange={handleDateChange}
                />
              </label>
            </div>
            {trips.length > 0 ? (
              <div className="table-container  pb-3">
                <div className="mx-3 table-scroll">
                  <table className=" background-table text-light  ">
                
                    <thead className="">
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
                        <tr key={trip.id} className={trip.status === 'completed' ? 'completed border-top' : 'canceled border-top'}>
                          <td>{trip.id}</td>
                          <td >{trip.pickupAddress}</td>
                          <td>{trip.destinationAddress}</td>
                          <td className="status">{trip.status}</td>
                          <td>{moment(trip.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                        </tr>
                      ))}
                                          
                    </tbody>
                  </table>
                </div>
                
              </div>
              
            ) : (
              <div className="d-flex flex-column align-items-center">
                <h3 className="text-light">No trip</h3>
                <Lottie animationData={groovyWalkAnimation} loop={true} className='lottie' />
              </div>
            )
            }
                        
          </>
                    
            
        )}
      </div>

          
    </div>
  );
}

export default HistoryTrip