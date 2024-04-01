import React, { useState } from 'react';

const ImageFilterApp = () => {
  const [image, setImage] = useState(null);
  const [filters, setFilters] = useState({
    contrast: 100,
    brightness: 100,
    saturate: 100,
    hue: 0,
  });

  const handleFilterChange = (filter, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filter]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const editedImg = document.getElementById('editedImg');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to image dimensions
    canvas.width = editedImg.width;
    canvas.height = editedImg.height;

    // Draw image onto canvas with applied filters
    ctx.filter = `contrast(${filters.contrast}%) brightness(${filters.brightness}%) saturate(${filters.saturate}%) hue-rotate(${filters.hue}deg)`;
    ctx.drawImage(editedImg, 0, 0, canvas.width, canvas.height);

    // Convert canvas to data URL
    const dataURL = canvas.toDataURL('image/jpeg');

    // Create temporary anchor element for download
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'edited_image.jpg';
    a.click();
  };

  return (
    <div className="p-10 min-h-screen flex items-center justify-center">
      <div className="bg-purple-400 w-80% p-5 flex rounded-lg flex-col shadow-lg md:flex-row md:justify-start">
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
        {image && (
          <img
            src={image}
            alt="Uploaded"
            id="editedImg"
            style={{
              filter: `contrast(${filters.contrast}%) brightness(${filters.brightness}%) saturate(${filters.saturate}%) hue-rotate(${filters.hue}deg)`,
            }}
            className="md:w-3/6 rounded-lg shadow-lg md:mr-8 md:mb-0"
          />
        )}
        <div className="w-11/12 my-3 mx-3 md:my-0 flex  flex-col">
          <label htmlFor="contrast" className="text-purple-800 mb-2">
            Contrast: {filters.contrast}%
          </label>
          <input
            type="range"
            id="contrast"
            min="100"
            max="300"
            step="1"
            value={filters.contrast}
            onChange={(e) => handleFilterChange('contrast', e.target.value)}
            className="mb-4"
          />

          <label htmlFor="brightness" className="text-purple-800 mb-2">
            Brightness: {filters.brightness}%
          </label>
          <input
            type="range"
            id="brightness"
            min="0"
            max="200"
            step="1"
            value={filters.brightness}
            onChange={(e) => handleFilterChange('brightness', e.target.value)}
            className=" mb-4"
          />

          <label htmlFor="saturate" className="text-purple-800 mb-2">
            Saturate: {filters.saturate}%
          </label>
          <input
            type="range"
            id="saturate"
            min="0"
            max="200"
            step="1"
            value={filters.saturate}
            className="mb-4"
            onChange={(e) => handleFilterChange('saturate', e.target.value)}
          />

          <label htmlFor="hue" className="text-purple-800 mb-2">
            Hue: {filters.hue}°
          </label>
          <input
            type="range"
            id="hue"
            min="0"
            max="360"
            step="1"
            value={filters.hue}
            className="mb-4 w-11/12"
            onChange={(e) => handleFilterChange('hue', e.target.value)}
          />

          {image && (
            <button onClick={handleDownload} className="bg-purple-800 text-white py-2 px-4 rounded">
              Download Edited Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageFilterApp;
