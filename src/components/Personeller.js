import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { Container, Divider, Table } from "semantic-ui-react";
//import { generate } from "shortid";
import * as item_actions from "../actions/item";
import { getIsFetching, getError, getMsg } from "../reducers/responce";
import { getMenuItems } from "../reducers/item";

class Personeller extends Component {
  state = {};

  getPersonel(filter) {
    return Object.values(this.props.items);
  }

  handleRowClick(no) {
    this.props.push(`/personel/${no}`);
  }

  render() {
    return (
      <Container text>
        <Divider hidden />
        <Table celled selectable striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Adı Soyadı</Table.HeaderCell>
              <Table.HeaderCell>Görevi</Table.HeaderCell>
              <Table.HeaderCell>Fiyat</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.getPersonel() &&
              this.getPersonel().map(item => (
                <Table.Row
                  key={item.urun}
                  onClick={() => this.handleRowClick(item.urun)}
                >
                  <Table.Cell>{item.urun}</Table.Cell>
                  <Table.Cell>{item.katagori}</Table.Cell>
                  <Table.Cell>{item.fiyat}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getIsFetching(state.responce),
  error: getError(state.responce),
  msg: getMsg(state.responce),
  items: getMenuItems(state)
});

const mapDispatchToProps = dispatch => ({
  push: path => dispatch(push(path)),
  item_actions: bindActionCreators(item_actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Personeller);
