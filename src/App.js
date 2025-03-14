import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [spotifyLink, setSpotifyLink] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConverting(true);

    try {
      const response = await fetch('https://playlistconverter.onrender.com/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputValue: inputValue }),
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setNotFoundMessage(data.message);
      setSpotifyLink(data.link);

  } catch (error) {
    console.error('There was an error sending the data:', error);
    } finally {
      setIsConverting(false);
       
      setTimeout(() => {
        setInputValue('');
      }, 5);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Apple Music to Spotify Converter</h1>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter link here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="input-box"
            disabled={isConverting}
          />
          
          {!isConverting ? (
            <button type="submit" className="convert-button">Convert</button>
          ) : (
            <p className="converting-text">Converting...</p>
          )}
        </form>

        {notFoundMessage && <p className="message-box">{notFoundMessage}</p>}

        {spotifyLink && (
          <div className="spotify-link-box">
            <h3>Your Spotify Playlist:</h3>
            <a href={spotifyLink} target="_blank" rel="noopener noreferrer">
              {spotifyLink}
            </a>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;