import { Routes, Route } from 'react-router-dom';

import BoardPage from '@pages/board/BoardPage';
import Home from '@pages/home/Home';
import Login from '@pages/login/Login';
import Profile from '@pages/profile/Profile';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRouter;
