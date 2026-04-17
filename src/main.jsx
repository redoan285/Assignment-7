
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router/dom'
import { createBrowserRouter } from 'react-router'
import RootLayout from './layout/RootLayout'
import Stats from './pages/stats/Stats'
import Timeline from './pages/timeline/Timeline'
import HomePages from './pages/homepages/HomePages'
import NotFoundPage from './pages/notFoundPage/NotFoundPage'
import FriendesDetails from './pages/friendsDetais/FriendesDetails'
import ContactFriendProvider from './contest/ContactFriendProvider'
import { HelmetProvider } from 'react-helmet-async'
import 'preline'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { path: '/', element: <HomePages /> },
            { path: '/timeline', element: <Timeline /> },
            { path: '/:id', element: <FriendesDetails /> },
            { path: '/stats', element: <Stats /> }
        ],
        errorElement: <NotFoundPage />
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HelmetProvider>
            <ContactFriendProvider>
            <RouterProvider router={router} />
        </ContactFriendProvider>
        </HelmetProvider>
        
    </StrictMode>,
)
























