import logo from './logo.svg';
import './App.css';
import { createHashRouter, RouterProvider} from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import {RecoilRoot} from 'recoil'
import InverseProtectedRout from './Components/InverseProtectedRout/InverseProtuctedRout';
import ProtectedRout from './Components/ProtectedRout/ProtectedRout';


function App() {

  const routes  = createHashRouter([

         {path:'' , element:<Layout/> ,children:[
          { index:true , element: <InverseProtectedRout> <Register/> </InverseProtectedRout>},
          {path:'login' , element: <InverseProtectedRout> <Login/> </InverseProtectedRout>},
          {path:'home' , element:   <ProtectedRout> <Home/> </ProtectedRout>},
         ] }

  ])
  return (
    <>
    <RecoilRoot>
    <RouterProvider router={routes} > </RouterProvider>
    </RecoilRoot>
       
    </>
  );
}

export default App;
