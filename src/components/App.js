import React from 'react'
import {BrowserRouter, Route, Switch}  from 'react-router-dom';
import Navbar from '../client/components/NavBarExample'
import AddUser from '../client/users/AddUser'
import Zone1 from '../client/pages/Zone1'
import Zone2 from '../client/pages/Zone2'
import Erreur from '../client/components/Erreur'
import Login from '../client/components/Login'
import Pagination from '../client/components/Pagination'
import Signup from '../client/components/Signup'
import Dashboard from '../client/components/Stats'
import SmartContract from './AppFile'
import Transactions from '../client/components/Transactions'
import ProtectedRoute from '../client/components/ProtectedRoute'
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component ={Login}/>
        <Route path='/sign-in' component ={Login}/>
        <Route path='/sign-up' component ={Signup}/>
        <Route exact path ="/users/add"  component={AddUser} />
        <Route exact path='/users' component={Pagination}/>
        <ProtectedRoute exact path="/" component={Dashboard} />
        <Route path='/statistiques' component ={Dashboard}/>
        <Route exact path='/blockchain' component ={SmartContract}/>
        <Route path='/tx' component={Transactions} />
       
        <Route component = {Erreur} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
/*

import Signup from './components/Signup';
import User from './components/User';
import Stats from './components/Stats'
import Erreur from './components/Erreur';
import Login from './components/Login'
import Navbar from './test.components/Navbar'
import AddUser from './users/AddUser'
import EditUser from './users/EditUser'
import Welcome from './components/Welcome'

import Test from './Test'
import Drop from './components/Drop';
import Transactions from './components/Transactions';
import SmartContract from './components/SmartContract';
import Pagination from './components/Pagination'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './pages/Register';
import Zone2 from './pages/Zone2';
function App() {
  
  return (
    <BrowserRouter>
    <NavbarPage/>
    <Switch>
      <Route exact path='/' component ={Login}/>
      <Route path='/sign-up' component ={Signup}/>
      <ProtectedRoute exact path="/" component={Stats} />

      <Route path='/sign-in' component ={Login}/>
      <Route path='/statistiques' component ={Stats}/>
      <route exact path ="/users/edit/:id" exact component={EditUser} />
      <Route exact path ="/users/add"  component={AddUser} />
      <Route path='/user' component ={Pagination}/>
      <Route path='/welcome' component={Welcome}/>
      <Route path='/test' component ={Test} />
      <Route path='/tx' component={Transactions} />
      <Route path='/pagination' component={Pagination} />
      <Route path='/drop' component={Drop} />
      <Route path='/reg' component={Register} />
      <Route path='/zone2' component={Zone2}/>
      <Footer />
    </Switch>
    </BrowserRouter>  
  );
}

export default App;


*/