// src/components/WorkerList.js
import React, { useEffect, useState, useRef } from 'react';
import api from '../api';

const WorkerList = () => {
    const [workers, setWorkers] = useState([]);
    const [sideImages, setSideImages] = useState([]);
    const [currentWorkerIndex, setCurrentWorkerIndex] = useState(0);
    const [musicTracks, setMusicTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Fetch workers data from the API
        const fetchWorkers = async () => {
            try {
                const response = await api.get('/workers/');
                setWorkers(response.data);
            } catch (error) {
                console.error("Error fetching workers:", error);
            }
        };
        fetchWorkers();
    }, []);

    useEffect(() => {
        // Fetch side images from the API
        const fetchSideImages = async () => {
            try {
                const response = await api.get('/side-images/');
                setSideImages(response.data);
            } catch (error) {
                console.error("Error fetching side images:", error);
            }
        };
        fetchSideImages();
    }, []);

    useEffect(() => {
        // Fetch music data from the API and set a random track
        const fetchMusic = async () => {
            try {
                const response = await api.get('/music/');
                if (response.data.length > 0) {
                    setMusicTracks(response.data);  // Store all tracks
                    const initialTrack = response.data[Math.floor(Math.random() * response.data.length)];
                    setCurrentTrack(initialTrack);  // Set a random initial track
                }
            } catch (error) {
                console.error("Error fetching music:", error);
            }
        };
        fetchMusic();
    }, []);

    useEffect(() => {
        // Change current worker index every 5 seconds
        const interval = setInterval(() => {
            setCurrentWorkerIndex((prevIndex) =>
                prevIndex === workers.length - 1 ? 0 : prevIndex + 1
            );
        }, 30000);

        return () => clearInterval(interval);
    }, [workers]);

    // Function to start playing the background music
    const startMusic = () => {
        setIsMusicPlaying(true);  // Hide the button after click
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    // Shuffle to a new track when current track ends
    const handleTrackEnd = () => {
        if (musicTracks.length > 0) {
            const newRandomTrack = musicTracks[Math.floor(Math.random() * musicTracks.length)];
            setCurrentTrack(newRandomTrack);
            audioRef.current.play();  // Start the new track automatically
        }
    };

    // Get the current worker and side image based on the index
    const currentWorker = workers[currentWorkerIndex];
    const currentSideImage = sideImages[currentWorkerIndex % sideImages.length];

    // Get current month dynamically
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    return (
        <div className="p-2 bg-gray-900 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-200">
                BIRTHDAY CELEBRANTS IN {currentMonth.toUpperCase()}
            </h1>
            
            {/* Show "Play Music" button if music isn't playing */}
            {!isMusicPlaying && (
                <button onClick={startMusic} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-6">
                    Play Music
                </button>
            )}
            
            {/* Audio element with onEnded event to shuffle to a new track */}
            {currentTrack && (
                <audio ref={audioRef} onEnded={handleTrackEnd} loop>
                    <source src={currentTrack.file} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}

            {currentWorker && currentSideImage && (
                <div className="flex justify-center gap-8">
                    {/* Side Image */}
                    <div className="w-1/4 max-w-md bg-gray-800 rounded-lg shadow-md p-6 my-auto">
                        <img 
                            src={currentSideImage.file} 
                            alt={currentSideImage.title} 
                            className="w-full object-cover rounded-md mb-4"
                        />
                    </div>

                    {/* Worker Information */}
                    <div className="w-full  bg-gray-800 rounded-lg shadow-md p-6 text-gray-100">
                        <img 
                            src={currentWorker.picture} 
                            alt={`${currentWorker.first_name} ${currentWorker.last_name}`} 
                            className="w-full h-[700px]  rounded-md mb-4"  // Increased height for larger image
                        />
                        <h2 className="text-5xl font-bold text-center ">
                            {currentWorker.first_name} {currentWorker.last_name}
                        </h2>
                        <p className="text-gray-100 text-center font-bold text-xl">Department: {currentWorker.department}</p>
                        <p className="text-gray-100 text-center font-bold text-3xl">Birthday: {new Date(currentWorker.birthday).toLocaleDateString('default', { day: 'numeric', month: 'long' })}</p>
                        {currentWorker.background_music && (
                            <audio controls className="w-full mt-4">
                                <source src={currentWorker.background_music} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                    </div>
                </div>
            )}
    
        </div>
    );
};

export default WorkerList;
