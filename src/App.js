import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import RuneTable from './components/RuneTable';
import './App.css';

const App = () => {
  const [results, setResults] = useState([]);

  return (
      <div className="App">
        <h1>Rune Analyzer</h1>
        <UploadForm setResults={setResults} />
        <RuneTable results={results} />
      </div>
  );
};

export default App;