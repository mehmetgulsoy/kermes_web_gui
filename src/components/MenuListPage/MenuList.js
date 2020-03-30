import _ from "lodash";
import React, { Component } from "react";
import { Icon, Search } from "semantic-ui-react";
import styles from "./menu.module.css";
import classNames from "classnames";
import * as data from "../data";

class MenuList extends Component {
  state = {};

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, matlub: value });
    console.log(value);
  };

  render() {
    const selam = _.deburr("â déjà vu İŞĞÖÇ I");
    return (
      <div>
        <header>
          <div>
            <Icon size="large" name="options" />
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
        <section>
          <Search
            onSearchChange={_.debounce(this.handleSearchChange, 800, {
              leading: true
            })}
          />
        </section>
      </div>
    );
  }
}

export default MenuList;

//https://medium.com/voobans-tech-stories/10-lodash-functions-everyone-should-know-334b372aec5d
