import React, { useState } from 'react';

const Setting = () => {
  const [threshold, setThreshold] = useState(30);  // 더미 경고 임계값 데이터

  const handleThresholdChange = (e) => {
    setThreshold(e.target.value);
  };

  return (
    <div>
      <h2>Settings</h2>
      <label>Set Temperature Threshold for Alarm: </label>
      <input 
        type="number" 
        value={threshold} 
        onChange={handleThresholdChange} 
      />
      <p>Current threshold: {threshold}°C</p>
    </div>
  );
};

export default Setting;
