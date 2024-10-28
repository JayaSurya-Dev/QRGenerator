import React, { useState, useEffect } from 'react';
import QRCode from "react-qr-code";
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import '../Style/QrComponent.css';

const QrComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setQrCodeValue("");                      

  };

  const handleGenerate = () => {
    if (inputValue.trim() === '') {
      setError('Please enter a valid text or URL');
    } else {
      setQrCodeValue(inputValue);
      setError(null);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeValue) {
      const qrCodeElement = document.getElementById('qr-code');
      toPng(qrCodeElement)
        .then((dataUrl) => {
          saveAs(dataUrl, 'qrcode.png'); 
        })
        .catch((error) => {
          console.error('Error downloading QR code:', error);
        });
    } else {
      setError('Please generate a QR code first');
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error]);

  return (
    <div className="qr-generator">
      <h1 className="qr-title">QR Code Generator</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter text or URL"
          value={inputValue}
          onChange={handleInputChange}
          className="qr-input"
        />
        <button onClick={handleGenerate} className="qr-button">
          Generate QR Code
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>

      {qrCodeValue && (
        <div id="qr-code" className="qr-code-container">
          <QRCode value={qrCodeValue} size={256} />
          <button onClick={downloadQRCode} className="download-button">
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QrComponent;
