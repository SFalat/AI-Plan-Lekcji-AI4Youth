import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import BasicInfo from '../components/BasicInfo/BasicInfo';

const router = createBrowserRouter([
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
