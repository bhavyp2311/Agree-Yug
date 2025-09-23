import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link,NavLink } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Ai from './Ai'
import Disease from './Disease';
import Markethub from './Markethub';
import Community from './Community';
import Analysis from './Analysis';
import Login from './Login';
import LivePrice from './LivePrice';
import FindBuyers from './FindBuyers';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children:[
      {
       path: "",
       element:<Home/>  
      } ,
      {
        path:"Ai",
        element:<Ai/>
      },
      {
        path:"Disease",
        element:<Disease/>
      },
      {
        path:"Markethub",
        element:<Markethub/>
      },
      { 
        path:"Markethub/", 
        element:<LivePrice/> 
      },
      { 
        path:"Markethub/findbuyers", 
        element:<FindBuyers/> 
      },
      {
        path:"Community",
        element:<Community/>
      },
      {
        path:"Analysis",
        element:<Analysis/>
      },
      {
        path:"Login",
        element:<Login/>
      }

    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;