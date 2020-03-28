import React, { Component } from "react";
import {
  Icon,
  Button,
  Modal,
  Form,
  Confirm,
  Dropdown
} from "semantic-ui-react";
import styles from "./menu.module.css";
import classNames from "classnames";
import * as data from "../data";

class MenuList extends Component {
  state = {};

  render() {
    return (
      <div>
        <header>
          <div>
            <Icon size="large" name="chess board" />
            <b> Menu</b>
          </div>
          <b></b>
          <b></b>
          <div></div>
          <div>
            <Icon name="plus" />
            ekle
          </div>
          <div>
            <Icon name="trash alternate" />
            Sil
          </div>
        </header>
      </div>
    );
  }
}

export default MenuList;
