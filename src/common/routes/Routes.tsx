import { Routes, Route } from 'react-router-dom';
import map from 'lodash/map';
import Cookies from 'js-cookie';

import Loader from '@components/layouts/loader/Loader';

import { useUserState } from '@common/providers/userProvider/useUserState';
import { commonRoutes, userRoutes } from '@common/utils/routeList';
import { AUTH_TOKEN } from '@common/utils/cookies';

const AppRouter = () => {
  const isLoggedIn =
    useUserState((s) => s.isLoggedIn) || !!Cookies.get(AUTH_TOKEN);
  const userLoading = useUserState((s) => s.loading);

  return (
    <Routes>
      {isLoggedIn
        ? map(userRoutes, ({ path, element }) => {
            if (userLoading) {
              return <Route path={path} element={<Loader />} key={path} />;
            }
            return <Route path={path} element={element} key={path} />;
          })
        : null}
      {map(commonRoutes, ({ path, element }) => {
        return <Route path={path} element={element} key={path} />;
      })}
    </Routes>
  );
};

export default AppRouter;
