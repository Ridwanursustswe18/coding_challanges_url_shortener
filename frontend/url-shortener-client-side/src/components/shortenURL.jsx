import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import './shortenURL.css';

const URLShortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsPopupVisible(!isPopupVisible);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 1000);
  };
  
  const shortenUrl = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${API_URL}/add-url`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: longUrl })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setShortUrl(data.short_url); 
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div
      style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '6rem',
      }}
    >
      <div>
        <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>URL Shortener</h1>
        <div className="input-button-wrapper" style={{ display: 'flex', justifyContent: 'center', gap: '2em' }}>
          <input
            id="destination-url"
            aria-label="Destination"
            placeholder="https://example.com/my-long-url"
            className="input"
            autoComplete="off"
            maxLength="6144"
            tabIndex="0"
            data-test="input-field"
            onChange={(event) => setLongUrl(event.target.value)}
            value={longUrl}
          />
          <button className="button-23" onClick={shortenUrl}>
            shorten
          </button>
        </div>
        {shortUrl && (
          <div className="shortened-url-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
            <input
              id="shortened-url"
              aria-label="Shortened URL"
              className="input with-icon"
              autoComplete="off"
              maxLength="6144"
              data-test="shortened-url-field"
              value={shortUrl}
              readOnly
              style={{ flexGrow: 1, paddingRight: '3em' }} 
            />
            <button className="copy-button" onClick={copyToClipboard}>
              <FontAwesomeIcon icon={faCopy} size="lg" />
            </button>
            {isPopupVisible && (
              <div 
              id="myPopup" 
              className="absolute z-10 p-4 bg-white border border-gray-200 rounded shadow-lg mt-2 "
            >
             link copied to clipboard 
              </div>)}
          </div>
        )}
      </div>
    </div>
  );
}
export default URLShortener;