import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [logs, setLogs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputValue: inputValue }),
      });
      setLogs((prevLogs) => [...prevLogs, `Response Status: ${response.status}`]);


      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response from backend:', data);
      setLogs((prevLogs) => [...prevLogs, `Response from backend: ${JSON.stringify(data)}`]);
      setLogs((prevLogs) => [...prevLogs, `Your Spotify Link: ${data.link}`]);

  } catch (error) {
    console.error('There was an error sending the data:', error);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>

    <div>
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
    </div>
    </div>
  );
}

export default App;