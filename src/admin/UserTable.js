import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        toast.success("Promo added successfully");
      } else {
        toast.error(`Error adding promo: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Error adding promo: ${error.message}`);
    } finally {
      setSelectedUsers([]);
      setSelectedPromo(null);
      setSelectAll(false);
      closeModal();
    }
  };

  return (
    <div>
      <table className="user-table">
        <thead>
          <tr>
            {index === 0 && (
              <th style={{ textAlign: "center" }}>
                <input
                  className="check"
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
            )}
            <th>ID</th>
            <th></th>
            <th>Name</th>
            <th>Status</th>
            <th>Phone</th>
            <th>Email</th>
            {index === 1 && <th>Driver Status</th>}
            {index === 1 && <th>AVG Rate</th>}
          </tr>
        </thead>
        <tbody>
          {getCurrentPageData().map((user) => (
            <tr key={user.id}>
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
                <img src={user.avatar} alt="Avatar" />
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
            </tr>
          ))}
        </tbody>
      </table>
      <button
        disabled={selectedUsers.length === 0}
        className="add_promo"
        onClick={openModal}
      >
        Add Promo
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Select Promo"
        className="custom-modal" // Add the custom-modal class here
      >
        <h2>Select Promo</h2>
        <ul>
          {promos.map((promo) => (
            <li key={promo.id}>
              <label>
                <input
                  type="radio"
                  name="promo"
                  value={promo.id}
                  checked={selectedPromo?.id === promo.id}
                  onChange={() => handlePromoSelection(promo)}
                />
                {promo.title}
              </label>
            </li>
          ))}
        </ul>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default UserTable;
