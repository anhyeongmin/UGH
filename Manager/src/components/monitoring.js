import React from 'react';

const Monitoring = () => {
  const temperature = 25;  // 더미 온도 데이터
  const humidity = 50;     // 더미 습도 데이터
  const growth = '양호';   // 더미 성장 데이터
  const sales = 100;       // 더미 판매 데이터

  return (
    <div>
      <h2>Monitoring</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>Growth Status: {growth}</p>
      <p>Sales: {sales}</p>
      {temperature > 30 && <p style={{color: 'red'}}>Warning: High Temperature!</p>}
    </div>
  );
};

export default Monitoring;
