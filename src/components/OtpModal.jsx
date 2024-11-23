import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';

const OtpModal = ({ isOpen, onClose }) => {
    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("OTP Submitted: ", otp);
        
        // Here you can add your OTP verification logic
        // For demonstration, we'll just show a success toast
        toast.success("OTP verified successfully!");

        // Close modal after submission
        onClose(); 
    };

    if (!isOpen) return null; // Don't render anything if the modal is not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
                <form onSubmit={handleSubmit}>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6} // Number of OTP digits
                        renderSeparator={<span>-</span>} // Separator between inputs
                        renderInput={(props) => <input {...props} />} // Correct usage of renderInput
                        inputStyle={{
                            width: '3rem',
                            height: '3rem',
                            margin: '0 0.5rem',
                            fontSize: '24px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                        }}
                    />
                    <button 
                        type="submit" 
                        className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Verify OTP
                    </button>
                </form>
                <button 
                    onClick={onClose} 
                    className="mt-2 text-red-500"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default OtpModal;