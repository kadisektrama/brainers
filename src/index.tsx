import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import App from './components/App';
import { About } from '@/components/about/about.lazy';
import { Contacts } from '@/components/contacts/contacts.lazy';
import { Suspense } from 'react';

const root = document.getElementById('root')

if (!root) {
    throw new Error('No root element found')
}

const container = createRoot(root)

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/about",
                element: <Suspense fallback="Loading..."><About /></Suspense>,
            },
            {
                path: "/contacts",
                element: <Suspense fallback="Loading..."><Contacts /></Suspense>,
            }
        ]
    },
]);

container.render(<RouterProvider router={router} />)