

import React, { useEffect, useState } from 'react';
import './style.css'
import TripService from "../../service/TripService";
import moment from 'moment';
import groovyWalkAnimation from '../../lotti/HistoryAnimation.json';
import Lottie from "lottie-react";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import util from '../../util';
import { BiSolidMessage } from "react-icons/bi";



const HistoryTripAdmin = ({ driverId, isDriver }) => {
  const [trips, setTrips] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [localData, setLocalData] = useState(() => {
    const localData = JSON.parse(localStorage.getItem('user'));
    console.log(localData);
    return localData || null
  });
  const [accessToken, setAccessToken] = useState(localData.accessToken);
  const [userId, setUserId] = useState(driverId);
  const [address, setAddress] = useState("");
  const [searchData, setSearchData] = useState([])
  const [selectedDate, setSelectedDate] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  const getTrips = async () => {
    if (navigator.onLine) {
      let res;
      if (isDriver) {
        res = await TripService.getHistoryDriverTrip(accessToken, userId);
      } else {
        res = await TripService.getHistoryPassengerTrip(accessToken, userId);
      }
      console.log(res);
      if (res) {
        setTrips(res.data.data)
        console.log(res.data);
      }
      setLoading1(false)
    } else {
      util.showToastWarning("Check your connection")
    }

  }
  useEffect(() => {
    getTrips()
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const popupContentStyle = {
    width: windowWidth < 768 ? '85%' : '50%',
    height: 'auto',
    padding: '0px',
    background: "rgba(255, 255, 255, 0)",
    borderRadius: '12px',
    boxShadow: "none"
  };
  const handleSearch = (address) => {
    setAddress(address)
  }
  const highlightText = (text, search) => {
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(
      regex,
      (match) => `<span class="highlight1">${match}</span>`
    );
  };
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

  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 4;
  const totalPages = Math.ceil(trips.length / issuesPerPage);
  const startIndex = (currentPage - 1) * issuesPerPage;
  const endIndex = startIndex + issuesPerPage;
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const currentHistoryTrips = () => {
    const filteredData = trips.filter((trip) => {
      const isMatchingaddress = trip.id.toString().includes(address) ||
        trip.destinationAddress.toLowerCase().includes(address.toLowerCase()) ||
        trip.pickupAddress.toLowerCase().includes(address.toLowerCase()) ||
        trip.status.toLowerCase().includes(address.toLowerCase()) ||
        moment(trip.createdAt).format("DD/MM/YYYY HH:mm").toLowerCase().includes(address.toLowerCase());
      return isMatchingaddress;
    });
    return filteredData.slice(startIndex, endIndex);
  };

  return (
    <div className="container-history ">

      <div className="container-content-history">
        <h3 className="mx-3 my-2 text-light">Trip History</h3>

        {loading1 ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className={`filter-container `}>

              <label className="text-light mx-3">
                Search:
                <input
                  className="form-item-history text-light ms-3 "
                  type="text"
                  placeholder="Search..."
                  value={address}
                  onChange={(event) => handleSearch(event.target.value)}
                />
              </label>




            </div>
            {trips.length > 0 ? (
              <div className="table-container  pb-3">
                <div className="px-3 table-scroll">
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

                      {currentHistoryTrips().map((trip) => (
                        <tr className={trip.status === 'completed' ? 'completed border-top' : 'canceled border-top'}>
                          <td>
                            {address &&
                              trip.id.toString().includes(address) ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(trip.id.toString(), address),
                                }}
                              />
                            ) : (
                              trip.id
                            )}
                          </td>
                          <td >
                            {address &&
                              trip.pickupAddress
                                .toLowerCase()
                                .includes(address.toLowerCase()) ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(trip.pickupAddress, address),
                                }}
                              />
                            ) : (
                              trip.pickupAddress
                            )}
                          </td>
                          <td>
                            {address &&
                              trip.destinationAddress
                                .toLowerCase()
                                .includes(address.toLowerCase()) ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(trip.destinationAddress, address),
                                }}
                              />
                            ) : (
                              trip.destinationAddress
                            )}</td>
                          <td className="status">
                            {address &&
                              trip.status
                                .toLowerCase()
                                .includes(address.toLowerCase()) ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(trip.status, address),
                                }}
                              />
                            ) : (
                              trip.status
                            )}
                          </td>
                          <td>
                            {address &&
                              moment(trip.createdAt).format("DD/MM/YYYY HH:mm")
                                .toLowerCase()
                                .includes(address.toLowerCase()) ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(moment(trip.createdAt).format("DD/MM/YYYY HH:mm"), address),
                                }}
                              />
                            ) : (
                              moment(trip.createdAt).format("DD/MM/YYYY HH:mm")
                            )}
                          </td>
                          {/* <td ><PopupIssue
                            id={trip.id}
                            pickUpPoint={trip.pickupAddress}
                            destinationPoint={trip.destinationAddress}
                            token={accessToken}
                          ></PopupIssue></td> */}
                        </tr>
                      ))}

                    </tbody>
                  </table>
                  <div className="pagination-buttons">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>

                    <span>{`Page ${currentPage} of ${totalPages}`}</span>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </div>
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


    </div >
  );
}

export default HistoryTripAdmin