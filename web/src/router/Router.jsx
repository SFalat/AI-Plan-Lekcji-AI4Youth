import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from '../components/Home/Home';
import BasicInfo from '../components/BasicInfo/BasicInfo';
import TeacherInfo from '../components/TeacherInfo/TeacherInfo'
const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/basic-info',
    element: <BasicInfo />,
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
