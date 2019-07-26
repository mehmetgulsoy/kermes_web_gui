import React from 'react';
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import LoginForm from "./components/LoginForm";
import NotFoundPage from "./components/NotFoundPage";
import CustomerPage from "./components/CustomerPage";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/kayit" component={Register} />
        <Route path="/giris" component={LoginForm} />
        <Route path="/musteri" component={CustomerPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
