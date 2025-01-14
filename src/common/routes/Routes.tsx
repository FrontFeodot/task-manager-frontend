import Board from '@pages/board/Board';
import Home from '@pages/home/Home';
import Login from '@pages/login/Login';
import Profile from '@pages/profile/Profile';
import { Routes, Route } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/board" element={<Board />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRouter;
