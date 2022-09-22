import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from '../components/Home/Home';
import BasicInfo from '../components/BasicInfo/BasicInfo';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/basic-info',
    element: <BasicInfo />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
