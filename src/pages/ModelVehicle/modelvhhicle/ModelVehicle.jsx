import React, { useState, useEffect } from "react";
import VehicleService from "../../../service/VehicleService";
import VehiclePopup from "../../../components/popup/VehiclePopup";
import Popup from "reactjs-popup";
import { motion } from "framer-motion";
import AddUpdateVehiclePopup from "../../../components/popup/AddUpdateVehiclePopup";
import ReactPaginate from "react-paginate";
import NoInternet from "../../../components/no_internet/NoInternet";
import Spinner from "../../../components/spinner/Spinner";
import './style.css'
export default function ModelVehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const itemsPerPage = 6;
  const pageCount = Math.ceil(vehicles.length / itemsPerPage);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  // const [types,setTypes] = useState([]);
  const getVehicleModels = async () => {
    if (navigator.onLine) {
      setIsOnline(true);
      try {
        setLoading(true);
        let res = await VehicleService.getVehicleModels();
        console.log(res);

        if (res) {
          setVehicles(res.data.data.models);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    } else {
      setIsOnline(false);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // console.log(VehicleService.getVehicleColor());

    getVehicleModels();
  }, []);
  const currentItems = vehicles.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const popupContentStyle = {
    width: windowWidth < 768 ? "85%" : "50%",
    height: "auto",
    padding: "0px",
    background: "rgba(255, 255, 255, 0)",
    borderRadius: "12px",
    boxShadow: "none",
  };
  const handleUpdateItem = (newRow) => {
    setVehicles((data) =>
      data.map((row) => {
        // console.log(row);
        // row.id === newRow.id ? newRow : row
        if (row.id === newRow.id) {
          console.log(newRow);
          return newRow;
        }
        return row;
      })
    );
  };
  const addItem = (newRow) => {
    getVehicleModels();
  };
  const types = [
    {
      type: "car7",
      name: "Car 7",
    },
    {
      type: "car",
      name: "Car",
    },
    {
      type: "motorcycles",
      name: "Motorcycles",
    },
  ];

  return (
    <div>
      {isOnline ? (
        <div>
          {loading && (
            <div className="container   ">
              <Spinner />
            </div>
          )}
          <div className="container-content-history mt-4 d-flex flex-column">
            <AddUpdateVehiclePopup
              className={"btn btn-success float-end my-3"}
              value={"Add"}
              vehicleModel={null}
              callback={addItem}
            />
            <table className="background-table text-light">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Model</th>
                  <th scope="col">Type</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((vehicle, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{vehicle.id}</th>
                      <td>{vehicle.model}</td>
                      <td>{vehicle.type}</td>
                      <td>
                        <AddUpdateVehiclePopup
                          className={"btn btn-primary"}
                          value={"Update"}
                          vehicleModel={vehicle}
                          callback={handleUpdateItem}
                        />{" "}
                      </td>
                      <td>
                        <button type="button" class="btn btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {vehicles.length > itemsPerPage && (
              <div className="d-flex flex-row justify-content-center">
                <ReactPaginate
                  pageCount={pageCount}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageClick}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="container vh-100 bg-light ">
          <NoInternet />
        </div>
      )}
    </div>
  );
}
