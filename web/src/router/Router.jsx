import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from '../components/Home/Home';
import BasicInfo from '../components/BasicInfo/BasicInfo';
import TeachersList from '../components/TeachersList/TeachersList';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import Timetable from '../components/Timetable/Timetable';
import Result from '../components/Result/Result';
import Summary from '../components/Summary/Summary';

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
    path: '/teachers-list',
    element: <TeachersList />,
  },
  {
    path: '/timetable',
    element: <Timetable />,
  },
  {
    path: '/result',
    element: <Result />,
  },
  {
    path: '/summary',
    element: <Summary />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
