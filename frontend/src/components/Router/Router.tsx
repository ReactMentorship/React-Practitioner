// Router configuration with grouped protected routes
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import LoginPage from '../Page/LoginPage';
import NotFoundPage from '../Page/NotFoundPage';
import PageLayout from '../Page/PageLayout';
import PrivateRouteLayout from '../Page/PrivateRouteLayout';
import CategoriesPage from '../Page/CategoriesPage/CategoriesPage';
import PostPage from '../Page/PostPage';
import LazyWrapper from '../UI/LazyWrapper/LazyWrapper';

const HomePage = lazy(() => import('../Page/HomePage/HomePage'));

const Router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRouteLayout />, // Protect all child routes
    children: [
      {
        path: '/',
        element: (
          <PageLayout>
            <LazyWrapper>
              <HomePage />
            </LazyWrapper>
          </PageLayout>
        ),
      },
      {
        path: '/post/:postID',
        element: (
          <PageLayout>
            <PostPage />
          </PageLayout>
        ),
      },
      {
        path: '/categories',
        element: (
          <PageLayout>
            <CategoriesPage />
          </PageLayout>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <PageLayout>
        <LoginPage />
      </PageLayout>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default Router;
