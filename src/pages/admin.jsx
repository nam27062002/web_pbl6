import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import '../styles/Pages/Admin.css';
const Avatar = ({ src, alt, size }) => {

    return (
        <img
            className={`avatar ${size ? `avatar-${size}` : ''}`}
            src={src}
            alt={alt}
        />
    );
};

export const Admin = () => {
    const [userTarget, setUserTarget] = useState(null);
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://ridewizard.pro:9000/api/v1/users', {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug',
                    },
                });

                let users = response.data.data.users.filter(user => user.driverStatus === 'You are not a driver');
                const updatedUserData = users.map(user => ({
                    id: user.id,
                    avatar: user.avatar || "/images/avatar/avt.png",
                    name: user.fullName || "",
                    status: "On going",
                    phone: user.phNo || "",
                    email: user.email || "",
                    avgRate: 4,
                }));
                setUserData(updatedUserData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const [activeItem, setActiveItem] = useState('Account');
    const handleItemClick = async (itemName) => {
        setActiveItem(itemName);
        if (itemName === "Drivers"){
            setUserData([])
            try {
                const response = await axios.get('http://ridewizard.pro:9000/api/v1/users', {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug',
                    },
                });

                let users = response.data.data.users.filter(user => user.driverStatus !== 'You are not a driver');
                const updatedUserData = users.map(user => ({
                    id: user.id,
                    avatar: user.avatar || "/images/avatar/avt.png",
                    name: user.fullName || "",
                    status: "On going",
                    phone: user.phNo || "",
                    email: user.email || "",
                    avgRate: 4,
                }));
                setUserData(updatedUserData);
            } catch (error) {
                console.error(error);
            }
        }
        else if (itemName === "Account"){
            setUserData([])
            try {
                const response = await axios.get('http://ridewizard.pro:9000/api/v1/users', {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug',
                    },
                });

                let users = response.data.data.users.filter(user => user.driverStatus === 'You are not a driver');
                const updatedUserData = users.map(user => ({
                    id: user.id,
                    avatar: user.avatar || "/images/avatar/avt.png",
                    name: user.fullName || "",
                    status: "On going",
                    phone: user.phNo || "",
                    email: user.email || "",
                    avgRate: 4,
                }));
                setUserData(updatedUserData);
            } catch (error) {
                console.error(error);
            }
        }
    };
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return userData.slice(startIndex, endIndex);
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



    const [showPopup, setShowPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [editedFields, setEditedFields] = useState({
        name: "",
        status: "",
        phone: "",
    });

    const handleEditButtonClick = (user) => {
        setUserTarget(user);
        setShowPopup(true);
        setSelectedUser(user);
        setEditedFields({
            name: user.name || "",
            status: user.status || "",
            phone: user.phone || "",
        });
    };

    const handleFieldChange = (fieldName, value) => {
        setEditedFields((prevFields) => ({
            ...prevFields,
            [fieldName]: value,
        }));
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedUser(null);
        setEditedFields({
            name: "",
            status: "",
            phone: "",
        });
    };

    const handleSaveChanges = () => {
        console.log("Saving changes:", editedFields);
        handleClosePopup();
    };

    const handleDeleteAccount = () => {
        console.log(`Deleted account with id ${selectedUser.id}`);
        handleClosePopup();
    };

    const renderField = (label, value, onChange) => (
        <div>
          <label htmlFor={label}>{label}:</label>
          <input
            type="text"
            id={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
    return (
        <div>
            <header className="header_home">
                <img className="logo_png" src="./images/logo.png" alt="Logo" />
                <h1 className="logo_text">RideWizard</h1>
                <div className="box_avt">
                    <div className="info_user">
                        <div className="name_user">ADMIN</div>
                    </div>
                    <Avatar src="/images/avatar/avt.png" alt="User Avatar" size="small" />
                </div>
            </header>
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
                                <img src="images/car.png" className="sidebar-icon" />Drivers
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='content-right'>
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" onChange={() => { }} />
                                </th>
                                <th>#</th>
                                <th></th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>AVG Rate</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getCurrentPageData().map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(user.id)}
                                            onChange={() => handleCheckboxChange(user.id)}
                                        />
                                    </td>
                                    <td>{user.id}</td>
                                    <td>
                                        <img src={user.avatar} alt="Avatar" />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.status}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <div className="star-rating">
                                            {[...Array(5)].map((_, index) => (
                                                <span key={index} className={index < user.avgRate ? 'filled' : ''}>★</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <button onClick={() => handleEditButtonClick(user)}>...</button>
                                    </td>
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
                {showPopup && (
                    <div className="overlay">
                        <div className="popup">
                            <h2>Edit User Information</h2>
                            {renderField("Name", selectedUser.name, (value) => handleFieldChange("name", value))}
                            {renderField("Status", selectedUser.status, (value) => handleFieldChange("status", value))}
                            {renderField("Phone", selectedUser.phone, (value) => handleFieldChange("phone", value))}
                            <div>
                                <button onClick={handleSaveChanges}>Save Changes</button>
                                <button onClick={handleDeleteAccount}>Delete Account</button>
                                <button onClick={handleClosePopup} className="close-button">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>

    )
}