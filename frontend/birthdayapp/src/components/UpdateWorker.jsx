import React, { useState } from 'react';
import api from '../api';

const UpdateWorkerPicture = () => {
    const [email, setEmail] = useState('');
    const [newPicture, setNewPicture] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (newPicture) {
            formData.append('picture', newPicture);
        }

        try {
            // Send a POST request to update the picture
            const response = await api.post('/workers/update-picture/', {
                email: email,
                picture: formData.get('picture'),
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setMessage('Worker picture updated successfully!');
            }
        } catch (error) {
            // Handle any errors that occur
            if (error.response && error.response.status === 404) {
                setMessage('Worker not found. Please check the email.');
            } else {
                setMessage('Error updating picture: ' + error.message);
            }
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">Update Celebrant Picture</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">New Picture</label>
                    <input
                        type="file"
                        onChange={(e) => setNewPicture(e.target.files[0])}
                        className="mt-1 p-2 border rounded w-full"
                        accept="image/*"
                        required
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Update Picture
                </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    );
};

export default UpdateWorkerPicture;
