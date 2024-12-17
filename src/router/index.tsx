import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { RouteObject } from 'react-router-dom'

// import Discover from '@/views/discover'
// import Mine from '@/views/mine'
// import Download from '@/views/download'
// import Focus from '@/views/focus'

const Discover = lazy(() => import('@/views/discover'))
const Recommend = lazy(() => import('@/views/discover/child-views/recommend'))
const Album = lazy(() => import('@/views/discover/child-views/album'))
const Djradio = lazy(() => import('@/views/discover/child-views/djradio'))
const Ranking = lazy(() => import('@/views/discover/child-views/ranking'))
const Singer = lazy(() => import('@/views/discover/child-views/singer'))
const Songs = lazy(() => import('@/views/discover/child-views/songs'))

const Mine = lazy(() => import('@/views/mine'))
const Download = lazy(() => import('@/views/download'))
const Focus = lazy(() => import('@/views/focus'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend" />
      },
      {
        path: '/discover/recommend',
        element: <Recommend />
      },
      {
        path: '/discover/album',
        element: <Album />
      },
      {
        path: '/discover/djradio',
        element: <Djradio />
      },
      {
        path: '/discover/ranking',
        element: <Ranking />
      },
      {
        path: '/discover/singer',
        element: <Singer />
      },
      {
        path: '/discover/songs',
        element: <Songs />
      }
    ]
  },
  {
    path: '/mine',
    element: <Mine />
  },
  {
    path: '/focus',
    element: <Focus />
  },
  {
    path: '/Download',
    element: <Download />
  }
]
export default routes
