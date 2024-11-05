import React, { useState, useEffect } from 'react';
import api from '../api';

const AddWorker = ({ workerEmail }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [department, setDepartment] = useState('');
    const [picture, setPicture] = useState(null);
    const [backgroundMusic, setBackgroundMusic] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (workerEmail) {
            // Fetch existing worker details for updating
            const fetchWorkerDetails = async () => {
                try {
                    const response = await api.get(`/workers/${workerEmail}/`);
                    const worker = response.data;
                    setFirstName(worker.first_name);
                    setLastName(worker.last_name);
                    setEmail(worker.email);
                    setBirthday(worker.birthday);
                    setDepartment(worker.department);
                } catch (error) {
                    console.error("Error fetching worker details:", error);
                }
            };
            fetchWorkerDetails();
        }
    }, [workerEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('birthday', birthday);
        formData.append('department', department);
        if (picture) formData.append('picture', picture);
        if (backgroundMusic) formData.append('background_music', backgroundMusic);

        try {
            if (workerEmail) {
                // Update existing worker
                const response = await api.patch(`/workers/${workerEmail}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setMessage('Worker updated successfully!');
            } else {
                // Add new worker
                const response = await api.post('/workers/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setMessage('Worker added successfully!');
            }
        } catch (error) {
            setMessage('Error processing request: ' + error.message);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">{workerEmail ? "Update Worker" : "Add Worker"}</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                        required
                        readOnly={!!workerEmail} // Prevent editing the email when updating
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Birthday</label>
                    <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Department</label>
                    <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Picture</label>
                    <input
                        type="file"
                        onChange={(e) => setPicture(e.target.files[0])}
                        className="mt-1 p-2 border rounded w-full"
                        accept="image/*"
                    />
                </div>

                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                    {workerEmail ? "Update Worker" : "Add Worker"}
                </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    );
};

export default AddWorker;
