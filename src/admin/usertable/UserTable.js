import util from "../../util";
import "./style.css";
import React, { useEffect, useState } from "react";
import { Modal, Backdrop, Fade } from "@mui/material";
import moment from "moment";
import ReactPaginate from "react-paginate";
import Popup from 'reactjs-popup';
import HistoryTripAdmin from "../History_trip/HistoryTripAdmin";
const UserTable = ({
  index,
  getCurrentPageData,
  selectedField,
  searchText,
  handleCheckboxChange,
  getStatusColor,
  handlePendingApprovalClick,
  handleApprove,
  handleDeny,
  selectedRows,
  currentImageIndex,
  totalPages,
  currentPage,
  handlePageChange,
  selectAll,
  setSelectAll,
  handleSelectAllChange,
  selectedUsers,
  setSelectedUsers,
}) => {
  const highlightText = (text, search) => {
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(
      regex,
      (match) => `<span class="highlight">${match}</span>`
    );
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, [])

  const popupContentStyle = {
    width: windowWidth < 768 ? '85%' : '85%', 
    height: 'auto',
    padding: '0px',
    background: "rgba(255, 255, 255, 0)",
    borderRadius: '12px',
    boxShadow: "none"
};
  function handleCheckboxChange(userId) {
    console.log(selectedUsers);
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  }
  const [promos, setPromos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  useEffect(() => {
    fetchPromos();
  }, []);
  const fetchPromos = async () => {
    try {
      const response = await fetch("http://ridewizard.pro:9000/api/v1/promo");
      const data = await response.json();
      if (data.success) {
        setPromos(data.data);
      } else {
        console.error("Error fetching promos:", data.message);
      }
    } catch (error) {
      console.error("Error fetching promos:", error.message);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handlePromoSelection = async (promo) => {
    try {
      console.log(promo.id);
      console.log(selectedUsers);
      const response = await fetch(
        "http://ridewizard.pro:9000/api/v1/promo/user/add-promo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            promoID: promo.id,
            users: selectedUsers.map((userId) => ({ userID: String(userId) })),
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        util.showToastSuccess("Promo added successfully");
      } else {
        util.showToastSuccess(`Error adding promo: ${data.message}`);
      }
    } catch (error) {
      util.showToastSuccess(`Error adding promo: ${error.message}`);
    } finally {
      setSelectedUsers([]);
      setSelectedPromo(null);
      setSelectAll(false);
      closeModal();
    }
  };
  const [currentPagePromo, setCurrentPagePromo] = useState(1);
  const rowsPerPagePromo = 8;
  const totalPagesPromo = Math.ceil(promos.length / rowsPerPagePromo);
  const getCurrentPromoPageData = () => {
    const startIndex = (currentPagePromo - 1) * rowsPerPagePromo;
    const endIndex = startIndex + rowsPerPagePromo;
    return promos.slice(startIndex, endIndex);
  };
  const handlePagePromoChange = (newPage) => {
    setCurrentPagePromo(newPage);
  };
  return (
    <div className="table-container w-100  pb-2 px-4">
      <table className="w-100 background-table text-light">
        <thead className="">
          <tr>
            {index === 0 && (
              <th>
                <input
                  className="check"
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
            )}
            <th>ID</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Status</th>
            <th>Phone</th>
            <th>Email</th>
            {index === 1 && <th>Driver Status</th>}
            {index === 1 && <th>AVG Rate</th>}
            <th>Trips</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageData().map((user) => (
            <tr key={user.id} className="border-top py-5 text-light">
              {index === 0 && (
                <td>
                  <input
                    className="check"
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </td>
              )}
              <td>
                {(selectedField === "All" || selectedField === "id") &&
                  searchText &&
                  user.id.toString().includes(searchText) ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightText(user.id.toString(), searchText),
                    }}
                  />
                ) : (
                  user.id
                )}
              </td>
              <td>
                <img src={user.avatar} alt="Avatar" className="avatar-user" />
              </td>
              <td>
                {(selectedField === "All" || selectedField === "name") &&
                  searchText &&
                  user.name.toLowerCase().includes(searchText.toLowerCase()) ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightText(user.name, searchText),
                    }}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>{user.status}</td>
              <td>
                {(selectedField === "All" || selectedField === "phone") &&
                  searchText &&
                  user.phone.toLowerCase().includes(searchText.toLowerCase()) ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightText(user.phone, searchText),
                    }}
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td>
                {(selectedField === "All" || selectedField === "email") &&
                  searchText &&
                  user.email.toLowerCase().includes(searchText.toLowerCase()) ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightText(user.email, searchText),
                    }}
                  />
                ) : (
                  user.email
                )}
              </td>
              {index === 1 && (
                <td
                  style={{
                    color: getStatusColor(user.driverStatus),
                    cursor:
                      user.driverStatus === "Pending approval"
                        ? "pointer"
                        : "default",
                  }}
                  onClick={() =>
                    user.driverStatus === "Pending approval" &&
                    handlePendingApprovalClick(user.id)
                  }
                >
                  {user.driverStatus}
                </td>
              )}
              {index === 1 && (
                <td>
                  <div className="star-rating">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={index < user.avgRate ? "filled" : ""}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </td>
              )}
              <td>
                <Popup
                  trigger={
                    <button
                      className="button-style text-light px-5"> Detail
                    </button>
                                        
                  }
                  modal nested
                  contentStyle={popupContentStyle}
                >
                  {
                    close => (
                      <>
                        <HistoryTripAdmin
                          driverId={user.id}
                          isDriver={index === 1 ? true : false}
                        ></HistoryTripAdmin>
                      </>
                    )
                  }
                               
                </Popup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {index === 0 && (
        <button
          disabled={selectedUsers.length === 0}
          className="add_promo"
          onClick={openModal}
        >
          Add Promo
        </button>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalIsOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalIsOpen}>
          <div className="popup" id="pp1">
            <h2 id="transition-modal-title">Select Promo</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Discount</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPromoPageData().map((promo) => (
                  <tr
                    key={promo.id}
                    onClick={() => handlePromoSelection(promo)}
                  >
                    <td>{promo.id}</td>
                    <td>{promo.title}</td>
                    <td>{promo.discount}%</td>
                    <td>{moment(promo.startDate).format("DD/MM/YYYY")}</td>
                    <td>{moment(promo.endDate).format("DD/MM/YYYY")}</td>
                    <td>
                      <button>Select</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination-buttons">
              <button
                disabled={currentPagePromo === 1}
                onClick={() => handlePagePromoChange(currentPagePromo - 1)}
              >
                Previous
              </button>

              <span>{`Page ${currentPagePromo} of ${totalPagesPromo}`}</span>

              <button
                disabled={currentPagePromo === totalPagesPromo}
                onClick={() => handlePagePromoChange(currentPagePromo + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default UserTable;
