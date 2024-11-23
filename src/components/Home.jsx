// src/Home.jsx
import React, { useState } from 'react';
// import ChangePasswordModal from './ChangePasswordModal'; // Import the Change Password Modal
import Sidebar from './Sidebar'; // Import Sidebar

const Home = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [setIsModalOpen] = useState(false); // State to manage modal visibility

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

    const handleChangePassword = () => {
        setIsModalOpen(true); // Open the modal when the button is clicked
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onChangePassword={handleChangePassword} />

            {/* Main Content */}
            <div className="flex-grow p-6">
                <button onClick={toggleSidebar} className="mb-4 text-blue-500">
                    ☰ {/* Hamburger Icon */}
                </button>

                <header className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold">File Management Dashboard</h1>
                    
                </header>

                {/* File Management Section */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Sample File/Folders */}
                    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
                        <h2 className="font-bold">Document 1</h2>
                        <p>Last modified: 2024-01-01</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
                        <h2 className="font-bold">Document 2</h2>
                        <p>Last modified: 2024-01-02</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
                        <h2 className="font-bold">Folder 1</h2>
                        <p>Contains: 5 files</p>
                    </div>
                    {/* Add more files/folders as needed */}
                </div>

        
            </div>
        </div>
    );
};

export default Home;