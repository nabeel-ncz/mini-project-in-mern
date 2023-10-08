import React from 'react'
import Modal from "react-modal";
import "./CustomModal.css";

function CustomModal({ handleLogout, open, setOpen }) {
    return (
        <>
            <Modal isOpen={open} onRequestClose={() => {
                setOpen(false);
            }} overlayClassName="modal-bg-overlay" className='bg-white w-1/3
            flex flex-col items-center justify-center py-4 shadow-xl rounded-md fixed top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]'>
                <h2 className="text-lg font-semibold mb-1">Confirm Logout</h2>
                <p className="mb-6">Are you sure you want to log out?</p>
                <div className="flex items-center justify-center gap-4">
                    <button onClick={() => {
                        setOpen(false);
                    }} className="px-4 py-1 text-black border border-black rounded">
                        Cancel
                    </button>
                    <button onClick={handleLogout} className="px-4 py-1 text-white bg-black rounded">
                        Logout
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default CustomModal