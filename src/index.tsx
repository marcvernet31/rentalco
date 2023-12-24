import React from 'react';
import ReactDOM from 'react-dom/client';
import ContractCreator from './components/ContractCreator';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AWS from 'aws-sdk';
import {Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';

import awsExports from './aws-exports';
import Support from './components/Support';
import Settings from './components/Settings';
import { Constants } from './utils/Constants';
import LogInPage from './components/LogInPage';
import LandingPage from './landing/LandingPage';
import OrderDashboard from './components/OrderDashboard';
import ContractEditor from './components/ContractEditor';

const awsmobile = {
  "aws_project_region": awsExports.REGION,
  "aws_user_pools_id": awsExports.USER_POOL_ID,
  "aws_user_pools_web_client_id": awsExports.USER_POOL_APP_CLIENT_ID,
};

Amplify.configure(awsmobile);

//TODO: Migrate auth to IAM role when deployed
AWS.config.update({
  region: Constants.awsRegionName,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

const AuthOrderDashboard = () => (
  <Authenticator>
    {({ signOut, user }) => (
      <OrderDashboard signOut={signOut} user={user}/>
    )}
  </Authenticator>
)

const AuthContractCreator = () => (
  <Authenticator>
    {({ signOut, user }) => (
      <ContractCreator signOut={signOut} user={user}/>
    )}
  </Authenticator>
)

const AuthContractEditor = () => (
  <Authenticator>
    {({ signOut, user }) => (
      <ContractEditor signOut={signOut} user={user}/>
    )}
  </Authenticator>
)

const AuthSupport = () => (
  <Authenticator>
    {({ signOut, user }) => (
      <Support signOut={signOut} user={user}/>
    )}
  </Authenticator>
)

const AuthSettings = () => (
  <Authenticator>
    {({ signOut, user }) => (
      <Settings signOut={signOut} user={user}/>
    )}
  </Authenticator>
)

const router = () => createBrowserRouter([
  { path: "/", element: <LandingPage/> },
  { path: "/app", element: <AuthOrderDashboard/> },
  { path: "/app/create", element: <AuthContractCreator/> },
  { path: "/app/edit", element: <AuthContractEditor/> },
  { path: "/app/support", element: <AuthSupport/> },
  { path: "/app/settings", element: <AuthSettings/> },
  { path: "/app/login", element: <LogInPage/> },
  { path: '*', element: <h1>404 - Not Found</h1> }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router()} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
