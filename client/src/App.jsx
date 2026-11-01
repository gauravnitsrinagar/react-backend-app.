import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [inputName, setInputName] = useState('');
  const [serverResponse, setServerResponse] = useState('');

  // Fetch data from backend on page load
  useEffect(() => {
    fetch('http://localhost:5000/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  // Send data to backend on form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inputName }),
      });
      const data = await response.json();
      setServerResponse(data.responseMessage);
    } catch (err) {
      console.error('Error sending data:', err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>React + Node.js Backend</h1>
      
      {/* GET Request Result */}
      <p><strong>Message from backend:</strong> {message || 'Loading...'}</p>

      {/* POST Request Form */}
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Send to Backend</button>
      </form>

      {serverResponse && <p style={{ marginTop: '1rem', color: 'green' }}>{serverResponse}</p>}
    </div>
  );
}

export default App;