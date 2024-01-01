import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import '../styles/Pages/Admin.css';
import Modal from 'react-modal';
import PendingApprovalModal from '../admin/PendingApprovalModal';
import UserTable from '../admin/usertable/UserTable';
import Sidebar from '../admin/Sidebar/Sidebar'
import HelpDesk from '../admin/helpdesk/HelpDesk';
import Promo from '../admin/promo/Promo';
import ColorVehicle from './ModelVehicle/colorvehicle/ColorVehicle';
import ModelVehicle from './ModelVehicle/modelvhhicle/ModelVehicle';
import util from '../util';



export const Admin = () => {
    const [user, setUser] = useState(() => {
        const localData = JSON.parse(localStorage.getItem('user'));
        return localData || null
    });
    const [userData, setUserData] = useState([]);
    const [index, setIndex] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
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
            console.log("admin " + response);
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
            console.log(users);
            return users.map(user => ({
                id: user.id,
                avatar: user.avatar || "/images/avatar/avt.png",
                name: user.fullName || "",
                status: user.status || "On going",
                phone: user.phNo || "",
                email: user.email || "",
                driverStatus: user.driverStatus || "",
                avgRate: user.rating || 0,
            }));
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    const uploadTable = async (index) => {
        const headers = {
            Authorization: `Bearer ${user.accessToken}` ,
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
        else if (itemName === "Help Desk") {
            setIndex(2);
        }
        else if (itemName === "Create Promo") {
            setIndex(3);
        }else if (itemName === "Color Vehicle") {
            setIndex(4);
        }else if (itemName === "Model Vehicle") {
            setIndex(5);
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
    const getCurrentPageData1 = () => {
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

        return filteredData;
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

    const [selectedUsers, setSelectedUsers] = useState([]);
    function handleSelectAllChange() {
        setSelectAll(!selectAll);
        setSelectedUsers(
            selectAll ? [] : getCurrentPageData1().map((user) => user.id)
        );
    }

    const [selectedAvgRate, setSelectedAvgRate] = useState("All");
    const [selectedDriverStatus, setSelectedDriverStatus] = useState("All");
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
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
                    Authorization: `Bearer ${user.accessToken} `,
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
            <div className="">
                <Sidebar activeItem={activeItem} handleItemClick={handleItemClick} />
                <div className='content-right'>
                    {index < 2 && (
                        <div>
                            <div className={`filter-container ${index === 1 ? '' : ''}`}>
                                <label className="filter-label text-light">
                                    Field:
                                    <select className="filter-dropdown form-item-admin mx-3" value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
                                        <option value="All">All</option>
                                        <option value="id">ID</option>
                                        <option value="name">Name</option>
                                        <option value="phone">Phone</option>
                                        <option value="email">Email</option>
                                    </select>
                                </label>

                                <label className="filter-label text-light">
                                    Search:
                                    <input
                                        className="search-input form-item-admin mx-3"
                                        type="text"
                                        placeholder="Search..."
                                        value={searchText}
                                        onChange={handleSearchChange}
                                    />
                                </label>

                                {index === 1 && (
                                    <label className="filter-label text-light">
                                        Driver Status:
                                        <select className="filter-dropdown form-item-admin mx-3" value={selectedDriverStatus} onChange={(e) => setSelectedDriverStatus(e.target.value)}>
                                            <option value="All">All</option>
                                            <option value="Insufficient verification information">Insufficient verification information</option>
                                            <option value="Insufficient authentication information">Insufficient authentication information</option>
                                            <option value="Pending approval">Pending approval</option>
                                            <option value="Approved">Approved</option>
                                        </select>
                                    </label>
                                )}

                                {index === 1 && (
                                    <label className="filter-label text-light">
                                        Average Rate:
                                        <select className="filter-dropdown form-item-admin mx-3" value={selectedAvgRate} onChange={(e) => setSelectedAvgRate(e.target.value)}>
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

                                <label className="filter-label text-light d-flex align-items-center">
                                    Exact Match:
                                    <input
                                        className="exact-match-checkbox"
                                        type="checkbox"
                                        checked={exactMatch}
                                        onChange={() => setExactMatch(!exactMatch)}
                                    />
                                </label>
                            </div>
                            <div className="px-4">
                                <UserTable
                                    index={index}
                                    getCurrentPageData={getCurrentPageData}
                                    selectedField={selectedField}
                                    searchText={searchText}
                                    handleCheckboxChange={handleCheckboxChange}
                                    getStatusColor={getStatusColor}
                                    handlePendingApprovalClick={handlePendingApprovalClick}
                                    handleApprove={handleApprove}
                                    handleDeny={handleDeny}
                                    selectedRows={selectedRows}
                                    currentImageIndex={currentImageIndex}
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    handlePageChange={handlePageChange}
                                    selectAll={selectAll}
                                    setSelectAll={setSelectAll}
                                    handleSelectAllChange={handleSelectAllChange}
                                    selectedUsers={selectedUsers}
                                    setSelectedUsers={setSelectedUsers}
                                />
                            </div>

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
                    )}
                    {index === 2 && (
                        <HelpDesk />
                    )}
                    {index === 3 && (
                        <Promo />
                    )}
                    {
                        index === 4 && (<ColorVehicle/>)
                    }
{
                        index === 5 && (<ModelVehicle/>)
                    }

                </div>
            </div>
            <ToastContainer />
            <PendingApprovalModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                listPhotoVerify={listPhotoVerify}
                handleApprove={handleApprove}
                handleDeny={handleDeny}
                currentImageIndex={currentImageIndex}
                setCurrentImageIndex={setCurrentImageIndex}
            />






        </div>

    )
}