// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WorkerList from './components/WorkerList';
import AdminSettings from './components/AdminSettings';
import AddWorker from './components/AddWorker';
import UpdateWorkerPicture from './components/UpdateWorker';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WorkerList />} />
                <Route path="/admin-settings" element={<AdminSettings />} />
                <Route path="/add-celebrant" element={<AddWorker />} />
                <Route path="/update-picture" element={<UpdateWorkerPicture />} />
            </Routes>
        </Router>
    );
};

export default App;
