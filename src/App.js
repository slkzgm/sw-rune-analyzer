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

    return (
        <div className="App">
            <header>
                <h1>Rune Analyzer</h1>
                <button onClick={() => setIsDarkMode(!isDarkMode)}>
                    {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
            </header>
            <UploadForm setResults={setResults} />
            <RuneTable results={results} />
        </div>
    );
};

export default App;