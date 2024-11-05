// src/components/AdminSettings.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const AdminSettings = () => {
    const [settings, setSettings] = useState({});
    const [music, setMusic] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.get('/admin-settings/');
                setSettings(response.data);
                if (response.data.random_music) {
                    setMusic(response.data.random_music.file);
                }
            } catch (error) {
                console.error("Error fetching admin settings:", error);
            }
        };
        fetchSettings();
    }, []);

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen text-white"
            style={{
                backgroundImage: `url(${settings.background_image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <h1 className="text-4xl font-bold mb-4">Admin Settings</h1>
            {music && (
                <audio controls autoPlay loop className="mt-6">
                    <source src={music} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default AdminSettings;
