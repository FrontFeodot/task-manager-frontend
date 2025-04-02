import { Routes, Route } from 'react-router-dom';

import BoardPage from '@pages/board/BoardPage';
import Home from '@pages/home/Home';
import Login from '@pages/login/Login';
import Profile from '@pages/profile/Profile';
import { useUserState } from '@common/providers/userProvider/useUserState';
import NotFound from '@pages/notFound/NotFound';

const AppRouter = () => {
  const isLoggedIn = useUserState((s) => s.isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Login />} />
      {isLoggedIn ? <Route path="/board" element={<BoardPage />} /> : null}
      {/* <Route path="/profile" element={<Profile />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
