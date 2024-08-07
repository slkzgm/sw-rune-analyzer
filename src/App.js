import React, { useState, useEffect } from 'react';
import UploadForm from './components/UploadForm';
import RuneTable from './components/RuneTable';
import './App.css';

const App = () => {
    const [results, setResults] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('isDarkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode);

    return (
        <div className="App">
            <header>
                <h1>Rune Analyzer</h1>
                <div className="theme-switch-container">
                    <span className="theme-switch-label">Enable Dark Mode:</span>
                    <label className="theme-switch">
                        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </header>
            <UploadForm setResults={setResults} />
            <RuneTable results={results} />
        </div>
    );
};

export default App;