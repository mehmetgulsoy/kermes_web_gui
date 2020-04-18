import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Search } from "semantic-ui-react";
import styles from "./menu.module.css";
import * as urun_reducer from "../../reducers/urun";
import * as static_actions from "../../actions/static_data";
import classNames from "classnames";

class MenuList extends Component {
  state = {};

  componentDidMount() {
    this.props.static_actions.urun_getir();
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, matlub: value });
    console.log(value);
  };

  render() {
    const selam = _.deburr("â déjà vu İŞĞÖÇ I");
    return (
      <div>
        <header className={styles.header}>
          <div className={styles.header_logo}>
            <Icon size="large" name="options" />
            <b> Menu </b>
          </div>
        </header>
        <section>
          <Search
            onSearchChange={_.debounce(this.handleSearchChange, 800, {
              leading: true,
            })}
          />
        </section>
      </div>
    );
  }
}

const map_state_to_prop = (state) => ({
  urunler: urun_reducer.get_urun(state.static_data.urun),
});

const map_dispatch_to_props = (dispatch) => ({
  static_actions: bindActionCreators(static_actions, dispatch),
});

export default connect(map_state_to_prop, map_dispatch_to_props)(MenuList);

//https://medium.com/voobans-tech-stories/10-lodash-functions-everyone-should-know-334b372aec5d
