import React from 'react';
import { Route, Switch,  } from "react-router-dom"; 
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import LoginForm from "./components/LoginForm";
import NotFoundPage from "./components/NotFoundPage";
import CustomerPage from "./components/CustomerPage";
import AdminPage from "./components/AdminPage";
import ItemForm from "./components/ItemForm"; 
import MeetingFormModal from "./components/Model";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/kayit" component={Register} />
        <Route path="/giris" component={LoginForm} />
        <Route path="/musteri" component={CustomerPage} />  
        <Route path="/admin" component={AdminPage} />  
        <Route path="/menu" component={ItemForm} /> 
        <Route path="/modal" component={MeetingFormModal} /> 
        <Route component={NotFoundPage} />         
      </Switch>
    </div>
  );
}

export default App;
