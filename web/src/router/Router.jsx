import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Home from '../components/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
