import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from '../components/Home/Home';
import BasicInfo from '../components/BasicInfo/BasicInfo';
import TeacherInfo from '../components/TeacherInfo/TeacherInfo';
import ErrorPage from '../components/ErrorPage/ErrorPage';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/basic-info',
  },
  {
    path: '/teacher-info',
    element: <TeacherInfo />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
