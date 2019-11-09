import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import LoginForm from "./components/LoginForm";
import NotFoundPage from "./components/NotFoundPage";
import CustomerPage from "./components/CustomerPage";
import AdminPage from "./components/AdminPage";
import ItemForm from "./components/ItemForm";
import MeetingFormModal from "./components/Model";
import ItemList from "./components/ItemList";
import Personel from "./components/Personeller";
import * as actions from "./actions/item";
import { socket } from "./configureStore";

class App extends Component {
  componentDidMount() {
    this.props.actions.fethKatagori();
    this.props.actions.fetchTumUrun();
    socket.disconnect();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
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
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
