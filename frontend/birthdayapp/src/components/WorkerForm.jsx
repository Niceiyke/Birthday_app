// src/components/WorkerForm.js

import React, { useState } from 'react';
import api from '../api'; 
const WorkerForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [department, setDepartment] = useState('');
    const [picture, setPicture] = useState(null);
    const [workerId, setWorkerId] = useState(''); // For updating picture

    const handleAddWorker = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('birthday', birthday);
        formData.append('department', department);
        if (picture) {
            formData.append('picture', picture);
        }

        console.log(formData);

        try {
            await api.post('/workers/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Reset the form fields after successful submission
            setFirstName('');
            setLastName('');
            setBirthday('');
            setDepartment('');
            setPicture(null);
            alert('Worker added successfully');
        } catch (error) {
            console.error('Error adding worker:', error);
            alert('Failed to add worker');
        }
    };

    const handleUpdatePicture = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (picture) {
            formData.append('picture', picture);
        }

        try {
            await api.patch(`/workers/${workerId}/update-picture/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Profile picture updated successfully');
        } catch (error) {
            console.error('Error updating picture:', error);
            alert('Failed to update profile picture');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">Add Worker</h1>
            <form onSubmit={handleAddWorker} className="mb-6">
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="border p-2 rounded mb-2"
                    required
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="border p-2 rounded mb-2"
                    required
                />
                <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="border p-2 rounded mb-2"
                    required
                />
                <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Department"
                    className="border p-2 rounded mb-2"
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setPicture(e.target.files[0])}
                    className="mb-2"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Add Worker
                </button>
            </form>

            <h1 className="text-3xl font-bold mb-4">Update Worker Picture</h1>
            <form onSubmit={handleUpdatePicture} className="mb-6">
                <input
                    type="text"
                    value={workerId}
                    onChange={(e) => setWorkerId(e.target.value)}
                    placeholder="Worker ID"
                    className="border p-2 rounded mb-2"
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setPicture(e.target.files[0])}
                    className="mb-2"
                    required
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                    Update Picture
                </button>
            </form>
        </div>
    );
};

export default WorkerForm;
