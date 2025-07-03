import { setBoardLoading } from '@common/providers/boardProvider/useBoardState';

import BoardPage from '@pages/board/BoardPage';
import Home from '@pages/home/Home';
import Login from '@pages/login/Login';
import NotFound from '@pages/notFound/NotFound';

interface IRouteItem {
  path: string;
  element: JSX.Element;
  loader?: void;
}

export const userRoutes: IRouteItem[] = [
  {
    path: '/board',
    element: <BoardPage />,
    loader: setBoardLoading(true),
  },
];

export const commonRoutes: IRouteItem[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
