import Board from '@pages/board/Board';
import Home from '@pages/home/Home';
import Login from '@pages/login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/board" element={<Board />} />
    </Routes>
  );
};

export default AppRouter;
