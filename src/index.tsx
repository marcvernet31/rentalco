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

import AWS from 'aws-sdk';
import {Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { AuthInput } from './types/AuthInput';
import { Authenticator } from '@aws-amplify/ui-react';

import awsExports from './aws-exports';
import { Constants } from './utils/Constants';

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


const router = ({signOut, user}: AuthInput) => createBrowserRouter([
  {
    path: "/",
    element: <OrderDashboard signOut={signOut} user={user}/>,
  },
  {
    path: "/create",
    element: <ContractCreator signOut={signOut} user={user}/>
  },
  {
    path: "/edit",
    element: <ContractEditor signOut={signOut} user={user}/>
  },
  {
    path: "/support",
    element: <Support signOut={signOut} user={user}/>
  },
  {
    path: "/settings",
    element: <Settings signOut={signOut} user={user}/>
  },
  {
    path: "/login",
    element: <LogInPage/>
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
    <Authenticator>
      {({ signOut, user }) => (
        <RouterProvider router={router({signOut, user})} />
      )}
    </Authenticator>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
