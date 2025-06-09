import { Routes, Route } from 'react-router-dom';
import map from 'lodash/map';
import Cookies from 'js-cookie';

import Loader from '@components/layouts/loader/Loader';

import { useUserState } from '@common/providers/userProvider/useUserState';
import { commonRoutes, userRoutes } from '@common/utils/routeList';
import { AUTH_TOKEN } from '@common/utils/cookies';
import { useAppState } from '@common/providers/appProvider/useAppState';

const AppRouter = () => {
  const isLoggedIn =
    useUserState((s) => s.isLoggedIn) || !!Cookies.get(AUTH_TOKEN);
  const userLoading = useUserState((s) => s.loading);
  const appLoading = useAppState((s) => s.appLoading);

  return (
    <Routes>
      {isLoggedIn
        ? map(userRoutes, ({ path, element }) => {
            if (userLoading || appLoading) {
              return (
                <Route
                  path={path}
                  element={<Loader isAppLoading={appLoading} />}
                  key={path}
                />
              );
            }
            return <Route path={path} element={element} key={path} />;
          })
        : null}
      {map(commonRoutes, ({ path, element }) => {
        if (path !== '/' && appLoading) {
          return (
            <Route
              path={path}
              element={<Loader isAppLoading={appLoading} />}
              key={path}
            />
          );
        }
        return <Route path={path} element={element} key={path} />;
      })}
    </Routes>
  );
};

export default AppRouter;
