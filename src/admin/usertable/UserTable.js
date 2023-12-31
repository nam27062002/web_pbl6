import React from 'react';
import './style.css'

const UserTable = ({ index, getCurrentPageData, selectedField, searchText, handleCheckboxChange, getStatusColor, handlePendingApprovalClick, handleApprove, handleDeny, selectedRows, currentImageIndex, totalPages, currentPage, handlePageChange }) => {
    const highlightText = (text, search) => {
        const regex = new RegExp(`(${search})`, "gi");
        return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
    };
    return (
        <div className="table-container w-100  pb-2 px-4">
            <table className="w-100 background-table text-light">
                <thead className="border-bottom">
                    <tr>
                        <th>ID</th>
                        <th>Avatar</th>
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
                        <tr key={user.id} className="border-bottom py-5 text-light">
                            <td>
                                {(selectedField === "All" || selectedField === "id") && searchText && user.id.toString().includes(searchText) ? (
                                    <span dangerouslySetInnerHTML={{ __html: highlightText(user.id.toString(), searchText) }} />
                                ) : (
                                    user.id
                                )}
                            </td>
                            <td>
                                <img src={user.avatar} alt="Avatar" className='avatar-user' />
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
        </div>
        
    );
}

export default UserTable;