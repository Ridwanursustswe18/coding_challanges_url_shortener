import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import './shortenURL.css';
const URLShortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Shortened URL copied to clipboard!');
  };
  const shortenUrl = async () => {
    try {
      const response = await fetch('http://localhost:3000/add-url', {
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
    <div >
      <h1 style={{fontFamily: 'sans-serif'}}>URL Shortener</h1>
      <div className='input-button-wrapper'>
      <input id='destination-url'
      aria-label='Destination'
      placeholder='https://example.com/my-long-url'
      className ="input"
      autoComplete='off'
      maxLength="6144"
      tabIndex="0"
      data-test = "input-field"
      onChange={(event) => setLongUrl(event.target.value)}
      value={longUrl}>
      </input>
      <button  className = "button-23"onClick={shortenUrl}>shorten</button>
      </div>
      {shortUrl && (
        <div className="shortened-url-wrapper">
          <input
            id='shortened-url'
            aria-label='Shortened URL'
            className="input with-icon"
            autoComplete='off'
            maxLength="6144"
            data-test="shortened-url-field"
            value={shortUrl}
            readOnly
          />
          <button className="copy-button" onClick={copyToClipboard}>
           <FontAwesomeIcon icon={faCopy} size="small" />
          </button>
          </div>
           )}
    </div>
  );
}
export default URLShortener;