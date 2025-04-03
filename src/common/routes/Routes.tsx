import { Routes, Route } from 'react-router-dom';
import map from 'lodash/map';
import Cookies from 'js-cookie';

import Loader from '@components/layouts/loader/Loader';

import { useUserState } from '@common/providers/userProvider/useUserState';
import { commonRoutes, userRoutes } from '@common/utils/routeList';
import { AUTH_TOKEN } from '@common/utils/cookies';

const AppRouter = () => {
  const isLoggedIn =
    useUserState((s) => s.isLoggedIn) || Cookies.get(AUTH_TOKEN);
  const userLoading = useUserState((s) => s.loading);

  return (
    <Routes>
      {map(userRoutes, ({ path, element }) => {
        if (!isLoggedIn) {
          return null;
        }
        if (isLoggedIn && userLoading) {
          return <Route path={path} element={<Loader />} />;
        }

        return <Route path={path} element={element} />;
      })}
      {map(commonRoutes, ({ path, element }) => {
        return <Route path={path} element={element} />;
      })}
    </Routes>
  );
};

export default AppRouter;
