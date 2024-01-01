import React, { useState, useEffect } from "react";
import VehicleService from "../../../service/VehicleService";
import VehiclePopup from "../../../components/popup/VehiclePopup";
import Popup from "reactjs-popup";
import { motion } from "framer-motion";
import UpdateColorPopup from "../../../components/popup/UpdateColorPopup";
import ReactPaginate from "react-paginate";
import NoInternet from "../../../components/no_internet/NoInternet";
import Spinner from "../../../components/spinner/Spinner";
import util from "../../../util";
import './style.css'

export default function ColorVehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const itemsPerPage = 5;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const getVehicleColor = async () => {
    if (navigator.onLine) {
      setIsOnline(true);
      try {
        setLoading(true);
        let res = await VehicleService.getVehicleColor();
        console.log(res);

        if (res) {
          setVehicles(res.data.data.colors);
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

    getVehicleColor();
  }, []);
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
    getVehicleColor();
  };
  const pageCount = Math.ceil(vehicles.length / itemsPerPage);
  const currentItems = vehicles.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  return (
    <div>
      {isOnline ? (
        <div>
          {loading && (
            <div className="w-100 ">
              <Spinner />
            </div>
          )}
          <div className="container-content-history mt-4 d-flex flex-column">
            <UpdateColorPopup
              className={"btn btn-success float-end my-3"}
              value={"Add"}
              vehicle={null}
              callback={addItem}
            />
            <table className="background-table text-light">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Color</th>
                  <th scope="col">Description</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((vehical, index) => {
                  return (
                    <tr key={index} className="border-top">
                      <th scope="row">{vehical.id}</th>
                      <td>{vehical.color}</td>
                      <td>{vehical.des}</td>
                      <td>
                        {" "}
                        <UpdateColorPopup
                          vehicle={vehical}
                          callback={handleUpdateItem}
                          className={"btn btn-primary"}
                          value={"Update"}
                          
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
        <div className="container vh-100 bg-light">
          <NoInternet />
        </div>
      )}
    </div>
  );
}
