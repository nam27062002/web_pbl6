import React from 'react';
import {
    Modal,
    Fade,
} from "@mui/material";
const PendingApprovalModal = ({ isModalOpen, closeModal, Backdrop, listPhotoVerify, handleApprove, handleDeny, currentImageIndex, setCurrentImageIndex, currentPage }) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isModalOpen}
            onClose={closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isModalOpen}>
                <div className="popup">
                    {listPhotoVerify ? (
                        <div className="modal-content">
                            <div className="title-container">
                                <h2>Pending Approval Details</h2>
                            </div>
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
                </div>
            </Fade>
        </Modal>

        //     <Modal
        //     isOpen={isModalOpen}
        //     onRequestClose={closeModal}
        //         contentLabel="Pending Approval Modal"
        //         closeAfterTransition
        //     BackdropComponent={Backdrop}
        //     BackdropProps={{
        //       timeout: 500,
        //     }}
        // >
        //     <div className="modal-header">
        //         <div className="title-container">
        //             <h2>Pending Approval Details</h2>
        //         </div>
        //         <div className="close-button" onClick={closeModal}>
        //             X
        //         </div>
        //     </div>

        //     {listPhotoVerify ? (
        //         <div className="modal-content">
        //             <div className="image-container">
        //                 <img src={listPhotoVerify.data[`type_${currentImageIndex + 1}`]} alt={`Type ${currentImageIndex + 1}`} />
        //                 <div className="image-status">
        //                     <p className='status_txt' style={{ color: listPhotoVerify.data[`type_${currentImageIndex + 1}_status`] === 'Approved' ? 'green' : 'deepskyblue' }}>
        //                         Status: {listPhotoVerify.data[`type_${currentImageIndex + 1}_status`]}
        //                     </p>
        //                     {listPhotoVerify.data[`type_${currentImageIndex + 1}_status`] === 'Pending approval' && (
        //                         <div className='B11'>
        //                             <button onClick={() => handleApprove()} className='btn_approve'>
        //                                 Approve
        //                             </button>
        //                             <button onClick={() => handleDeny()} className='btn_deny'>
        //                                 Deny
        //                             </button>
        //                         </div>
        //                     )}
        //                 </div>
        //             </div>
        //             <div className="pagination-buttons" id='B12'>
        //                 <button disabled={currentImageIndex === 0} onClick={() => setCurrentImageIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0))}>
        //                     Previous
        //                 </button>

        //                 <span>{`Page ${currentImageIndex + 1} of 18`}</span>

        //                 <button disabled={currentPage === 17} onClick={() => setCurrentImageIndex(prevIndex => (prevIndex < 17 ? prevIndex + 1 : 17))}>
        //                     Next
        //                 </button>
        //             </div>
        //         </div>
        //     ) : (
        //         <p>Loading...</p>
        //     )}
        // </Modal>
    );
}

export default PendingApprovalModal;