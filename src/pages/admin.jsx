import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import '../styles/Pages/Admin.css';
import Modal from 'react-modal';

export const Admin = () => {
    const [userData, setUserData] = useState([]);
    const [index, setIndex] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        uploadTable(0);
    }, []);

    const getListPhotoVerifyData = async (id) => {
        try {
            const response = await fetch(`http://ridewizard.pro:9000/api/v1/drivers/identification/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug',
                },
            });
            console.log("admin " +response);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setlistPhotoVerify(data);
            console.log(listPhotoVerify.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [listPhotoVerify, setlistPhotoVerify] = useState(null);
    const handlePendingApprovalClick = (id) => {
        setSelectedItemId(id);
        getListPhotoVerifyData(id);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setCurrentImageIndex(0);
        setIsModalOpen(false);
    };
    const fetchUserData = async (url, headers, filterFunction) => {
        try {
            const response = await axios.get(url, { headers });
            const users = response.data.data.users.filter(filterFunction);
            return users.map(user => ({
                id: user.id,
                avatar: user.avatar || "/images/avatar/avt.png",
                name: user.fullName || "",
                status: user.status || "On going",
                phone: user.phNo || "",
                email: user.email || "",
                driverStatus: user.driverStatus || "",
                avgRate: 4,
            }));
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    const uploadTable = async (index) => {
        const headers = {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug',
        };
        const url = 'http://ridewizard.pro:9000/api/v1/users';
        if (index === 0) {
            setSelectedDriverStatus("All");
            const filterFunction = user => user.driverStatus === 'You are not a driver' && user.fullName !== '';
            const updatedUserData = await fetchUserData(url, headers, filterFunction);
            setUserData(updatedUserData);
        }
        else if (index === 1) {
            const filterFunction = user => user.driverStatus !== 'You are not a driver' && user.driverStatus !== 'Admin'
                && user.fullName !== '';
            const updatedUserData = await fetchUserData(url, headers, filterFunction);
            setUserData(updatedUserData);
        }
    };
    const [activeItem, setActiveItem] = useState('Account');
    const handleItemClick = async (itemName) => {
        setActiveItem(itemName);
        setUserData([]);
        setCurrentPage(1);
        if (itemName === "Drivers") {
            setIndex(1);
            uploadTable(1);

        } else if (itemName === "Account") {
            setIndex(0);
            uploadTable(0);
        }

    };
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 8;
    const [selectedField, setSelectedField] = useState("All");
    const [exactMatch, setExactMatch] = useState(false);
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;

        const filteredData = userData.filter((user) => {
            const isMatchingSearchText = exactMatch ?
                user.id.toString() === searchText ||
                user.name.toLowerCase() === searchText.toLowerCase() ||
                user.phone.toLowerCase() === searchText.toLowerCase() ||
                user.email.toLowerCase() === searchText.toLowerCase() :
                user.id.toString().includes(searchText) ||
                user.name.toLowerCase().includes(searchText.toLowerCase()) ||
                user.phone.toLowerCase().includes(searchText.toLowerCase()) ||
                user.email.toLowerCase().includes(searchText.toLowerCase());

            const isMatchingDriverStatus = selectedDriverStatus === "All" || user.driverStatus === selectedDriverStatus;

            const isMatchingAvgRate = selectedAvgRate === "All" || user.avgRate.toString() === selectedAvgRate;

            if (selectedField === "All") {
                return isMatchingSearchText && isMatchingDriverStatus && isMatchingAvgRate;
            } else {
                const isMatchingField = user[selectedField].toString().toLowerCase().includes(searchText.toLowerCase());
                return isMatchingField && isMatchingDriverStatus && isMatchingAvgRate;
            }
        });

        return filteredData.slice(startIndex, endIndex);
    };
    const [selectedRows, setSelectedRows] = useState([]);

    const handleCheckboxChange = (userId) => {
        if (selectedRows.includes(userId)) {
            setSelectedRows(selectedRows.filter(id => id !== userId));
        } else {
            setSelectedRows([...selectedRows, userId]);
        }
    };
    const totalPages = Math.ceil(userData.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };



    const [selectedAvgRate, setSelectedAvgRate] = useState("All");
    const [selectedDriverStatus, setSelectedDriverStatus] = useState("All");
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };
    const highlightText = (text, search) => {
        const regex = new RegExp(`(${search})`, "gi");
        return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
    };
    function getStatusColor(driverStatus) {
        switch (driverStatus) {
            case "Insufficient verification information":
                return "#ff0000"; // Red
            case "Insufficient authentication information":
                return "#ffa500"; // Orange
            case "Pending approval":
                return "#007acc"; // Yellow
            case "Approved":
                return "#008000"; // Green
            default:
                return "#000000"; // Black (or any default color)
        }
    }
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handleApprove = async () => {
        try {
            const response = await fetch(`http://ridewizard.pro:9000/api/v1/drivers/driver/approve?user_id=${selectedItemId}&type=${currentImageIndex + 1}`, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to approve image');
            }

            console.log('Image approved');

            await getListPhotoVerifyData(selectedItemId);
        } catch (error) {
            console.error('Error denying image:', error);
        }
    };



    const handleDeny = async () => {
        try {
            const response = await fetch(`http://ridewizard.pro:9000/api/v1/drivers/driver/deny?user_id=${selectedItemId}&type=${currentImageIndex + 1}`, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to deny image');
            }

            console.log('Image Denied');

            await getListPhotoVerifyData(selectedItemId);
        } catch (error) {
            console.error('Error denying image:', error);
        }
    };
    return (
        <div>
            <div className="content">
                <div className="sidebar-collapse">
                    <ul className="sidebar-list">
                        <li>
                            <a
                                href="#"
                                className={activeItem === 'Account' ? 'active' : ''}
                                onClick={() => handleItemClick('Account')}
                            >
                                <img src="images/user.png" className="sidebar-icon" />Account
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={activeItem === 'Drivers' ? 'active' : ''}
                                onClick={() => handleItemClick('Drivers')}
                            >
                                <img src="images/driver.png" className="sidebar-icon" />Drivers
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={activeItem === 'Vehicles' ? 'active' : ''}
                                onClick={() => handleItemClick('Vehicles')}
                            >
                                <img src="images/car.png" className="sidebar-icon" />Vehicles
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='content-right'>
                    <div className={`filter-container ${index === 1 ? 'index-1' : ''}`}>
                        <label className="filter-label">
                            Field:
                            <select className="filter-dropdown" value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
                                <option value="All">All</option>
                                <option value="id">ID</option>
                                <option value="name">Name</option>
                                <option value="phone">Phone</option>
                                <option value="email">Email</option>
                            </select>
                        </label>

                        <label className="filter-label">
                            Search:
                            <input
                                className="search-input"
                                type="text"
                                placeholder="Search..."
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                        </label>

                        {index === 1 && (
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
                        )}

                        {index === 1 && (
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
                        )}

                        <label className="filter-label">
                            Exact Match:
                            <input
                                className="exact-match-checkbox"
                                type="checkbox"
                                checked={exactMatch}
                                onChange={() => setExactMatch(!exactMatch)}
                            />
                        </label>
                    </div>
                    <table className="user-table">
                        <thead>
                            <tr>
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
                            {getCurrentPageData().map(user => (
                                <tr key={user.id}>
                                    <td>
                                        {(selectedField === "All" || selectedField === "id") && searchText && user.id.toString().includes(searchText) ? (
                                            <span dangerouslySetInnerHTML={{ __html: highlightText(user.id.toString(), searchText) }} />
                                        ) : (
                                            user.id
                                        )}
                                    </td>
                                    <td>
                                        <img src={user.avatar} alt="Avatar" />
                                    </td>
                                    <td>
                                        {(selectedField === "All" || selectedField === "name") && searchText && user.name.toLowerCase().includes(searchText.toLowerCase()) ? (
                                            <span dangerouslySetInnerHTML={{ __html: highlightText(user.name, searchText) }} />
                                        ) : (
                                            user.name
                                        )}
                                    </td>
                                    <td>{user.status}</td>
                                    <td>
                                        {(selectedField === "All" || selectedField === "phone") && searchText && user.phone.toLowerCase().includes(searchText.toLowerCase()) ? (
                                            <span dangerouslySetInnerHTML={{ __html: highlightText(user.phone, searchText) }} />
                                        ) : (
                                            user.phone
                                        )}
                                    </td>
                                    <td>
                                        {(selectedField === "All" || selectedField === "email") && searchText && user.email.toLowerCase().includes(searchText.toLowerCase()) ? (
                                            <span dangerouslySetInnerHTML={{ __html: highlightText(user.email, searchText) }} />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                    {index === 1 && (
                                        <td
                                            style={{
                                                color: getStatusColor(user.driverStatus),
                                                cursor: user.driverStatus === 'Pending approval' ? 'pointer' : 'default',
                                            }}
                                            onClick={() => user.driverStatus === 'Pending approval' && handlePendingApprovalClick(user.id)}
                                        >
                                            {user.driverStatus}
                                        </td>

                                    )}
                                    {index === 1 && (
                                        <td>
                                            <div className="star-rating">
                                                {[...Array(5)].map((_, index) => (
                                                    <span key={index} className={index < user.avgRate ? 'filled' : ''}>★</span>
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination-buttons">
                        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                        </button>

                        <span>{`Page ${currentPage} of ${totalPages}`}</span>

                        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Pending Approval Modal"
            >
                <div className="modal-header">
                    <div className="title-container">
                        <h2>Pending Approval Details</h2>
                    </div>
                    <div className="close-button" onClick={closeModal}>
                        X
                    </div>
                </div>

                {listPhotoVerify ? (
                    <div className="modal-content">
                        <div className="image-container">
                            <img src={listPhotoVerify.data[`type_${currentImageIndex + 1}`]} alt={`Type ${currentImageIndex + 1}`} />
                            <div className="image-status">
                                <p className='status_txt' style={{ color: listPhotoVerify.data[`type_${currentImageIndex + 1}_status`] === 'Approved' ? 'green' : 'deepskyblue' }}>
                                    Status: {listPhotoVerify.data[`type_${currentImageIndex + 1}_status`]}
                                </p>
                                {listPhotoVerify.data[`type_${currentImageIndex + 1}_status`] === 'Pending approval' && (
                                    <div className='B11'>
                                        <button onClick={() => handleApprove()} className='btn_approve'>
                                            Approve
                                        </button>
                                        <button onClick={() => handleDeny()} className='btn_deny'>
                                            Deny
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="pagination-buttons" id='B12'>
                            <button disabled={currentImageIndex === 0} onClick={() => setCurrentImageIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0))}>
                                Previous
                            </button>

                            <span>{`Page ${currentImageIndex + 1} of 18`}</span>

                            <button disabled={currentPage === 17} onClick={() => setCurrentImageIndex(prevIndex => (prevIndex < 17 ? prevIndex + 1 : 17))}>
                                Next
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal>





        </div>

    )
}