import React from 'react';

const UserTable = ({ index, getCurrentPageData, selectedField, searchText, handleCheckboxChange, getStatusColor, handlePendingApprovalClick, handleApprove, handleDeny, selectedRows, currentImageIndex, totalPages, currentPage, handlePageChange }) => {
    const highlightText = (text, search) => {
        const regex = new RegExp(`(${search})`, "gi");
        return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
    };
    return (
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
    );
}

export default UserTable;