import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { Container, Divider, Table } from "semantic-ui-react";
import * as item_actions from "../actions/item";
import { getIsFetching, getError, getMsg } from "../reducers/responce";
import { getMenuItems } from "../reducers/item";

class ItemList extends Component {
  state = {};

  getItem(filter) {
    //let items =  Object.entries(this.props.items);
    return Object.values(this.props.items);

    //return items.filter( (item) => filter !== '' || item.urun === filter )
  }

  handleRowClick(item) {
    this.props.push(`/menu/${item}`);
  }

  render() {
    return (
      <Container text>
        <Divider hidden />
        <Table celled selectable striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Urun</Table.HeaderCell>
              <Table.HeaderCell>Katagori</Table.HeaderCell>
              <Table.HeaderCell>Fiyat</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.getItem() &&
              this.getItem().map(item => (
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
)(ItemList);
