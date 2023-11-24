import React from 'react';
import ReactDOM from 'react-dom/client';
import ContractCreator from './components/ContractCreator';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import OrderDashboard from './components/OrderDashboard';
import ContractEditor from './components/ContractEditor';
import Support from './components/Support';
import Settings from './components/Settings';
import LogInPage from './components/LogInPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <OrderDashboard/>,
  },
  {
    path: "/create",
    element: <ContractCreator/>
  },
  {
    path: "/edit",
    element: <ContractEditor/>
  },
  {
    path: "/support",
    element: <Support/>
  },
  {
    path: "/settings",
    element: <Settings/>
  },
  {
    path: "/login",
    element: <LogInPage />
  },
  {
    path: '*',
    element: <h1>404 - Not Found</h1>
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
