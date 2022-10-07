import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from '../components/Home/Home';
import BasicInfo from '../components/BasicInfo/BasicInfo';
import TeacherInfo from '../components/TeacherInfo/TeacherInfo';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import Timetable from '../components/Timetable/Timetable';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/basic-info',
    element: <BasicInfo />,
  },
  {
    path: '/teacher-info',
    element: <TeacherInfo />,
  },
  {
    path: '/timetable',
    element: <Timetable />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
