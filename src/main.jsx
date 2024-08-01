import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainMenu from './routes/MainMenu';
import App from './routes/App';
import './index.css'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/app",
    element: <MainMenu/>
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
