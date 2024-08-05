import React, { useState } from 'react';
import axios from 'axios';
import './styles/UploadForm.css';

const UploadForm = ({ setResults }) => {
    const [file, setFile] = useState(null);
    const [quality, setQuality] = useState(5);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleQualityChange = (e) => {
        setQuality(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('quality', quality);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <label>
                    Gem and Grind Quality:
                    <select value={quality} onChange={handleQualityChange}>
                        <option value={1}>Normal</option>
                        <option value={2}>Common</option>
                        <option value={3}>Rare</option>
                        <option value={4}>Hero</option>
                        <option value={5}>Legend</option>
                    </select>
                </label>
                <button type="submit" disabled={loading}>Upload</button>
                {loading && <p className="loading-text">Loading...</p>}
            </form>
        </div>
    );
};

export default UploadForm;