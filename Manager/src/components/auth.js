import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../views/auth.css';

const Auth = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // useNavigate 훅 사용

  // 서버로 알림 요청을 보내는 함수
  const sendNotification = (message) => {
    fetch('http://localhost:3000/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  // 로그인 처리 함수
  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      // 로그인 성공 시 알림을 보냅니다.
      console.log("Login successful, sending notification and navigating to /monitoring");
      sendNotification('Login successful!');
      setError('');  // 오류 메시지를 지움
      setIsLoggedIn(true);  // 로그인 상태 설정
      navigate('/user');  // 로그인 성공 시 Monitoring 페이지로 이동
    } else {
      setError('Invalid username or password');
      // 로그인 실패 시 알림을 보냅니다.
      sendNotification('Login failed!');
      console.log("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
};

export default Auth;
