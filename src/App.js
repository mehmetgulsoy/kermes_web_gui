import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/DashboardPage/Dashboard";
import Register from "./components/Register";
import LoginForm from "./components/LoginPage/LoginForm";
import NotFoundPage from "./components/NotFoundPage";
import CustomerPage from "./components/CustomerPage";
import AdminPage from "./components/AdminPage";
import ItemForm from "./components/ItemForm";
import MeetingFormModal from "./components/Model";
import ItemList from "./components/ItemList";
import Personel from "./components/Personeller";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/kayit" component={Register} />
      <Route path="/giris" component={LoginForm} />
      <Route path="/musteri" component={CustomerPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/menu/:id?" component={ItemForm} />
      <Route path="/menuler" component={ItemList} />
      <Route path="/modal" component={MeetingFormModal} />
      <Route path="/personeller" component={Personel} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};
export default App;
