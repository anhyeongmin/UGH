import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Monitoring from '../components/monitoring';
import Auth from '../components/auth';
import User from '../components/user';
import Urbani from '../components/urbani';
import Setting from '../components/setting';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리

  return (
    <Router>
      <div>
        <h1>Administrator App</h1>
        <Routes>
          {/* 로그인 상태에 따라 경로 설정 */}
          <Route path="/auth" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
          {isLoggedIn ? (
            <>
              {/* 로그인 후 페이지 */}
              <Route path="/user" element={<User />} />
              <Route path="/monitoring" element={<Monitoring />} />
              
              <Route path="/urbani" element={<Urbani />} />
              <Route path="/setting" element={<Setting />} />
              {/* 로그인 후 기본 경로로 /monitoring 리다이렉트 */}
              <Route path="/" element={<Navigate to="/monitoring" />} />
            </>
          ) : (
            // 로그인되지 않은 경우 /auth로 리다이렉트
            <Route path="/" element={<Navigate to="/auth" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
