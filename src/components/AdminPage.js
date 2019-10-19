import { push, replace } from 'connected-react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import ItemForm from "./ItemForm";
import { Divider, Icon, Menu, Segment } from "semantic-ui-react";


const Anasayfa = () => <h2>Home</h2>;
const Anket = () => <h2>Sipariş</h2>;
const Yorumlar = () => <h2>Yorumlar</h2>;



class AdminPAge extends Component {
  state = { activeItem: 'Anasayfa' }

  routes = [
    {
      path: this.props.match.path + '/Anasayfa',
      exact: true,
      component: Anasayfa,
    },
    {
      path: this.props.match.path + '/Siparis',
      component: Anket,
    },
    {
      path: this.props.match.path + '/Yorumlar',
      component: Yorumlar,
    },
    {
      path: this.props.match.path + '/menu',
      component: ItemForm,
    }
  ];

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name }); 
    this.props.push(`${this.props.match.path}/${name}`)
  }

  render() {
    const { activeItem } = this.state
    
    return (
      <div>
        <Divider hidden />       
          {this.routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}      
        <Segment vertical>
          <Menu icon='labeled' fixed='bottom' size='mini' fluid>
            <Menu.Item
              name='anasayfa'
              active={activeItem === 'anasayfa'}
              onClick={this.handleItemClick}>
              <Icon name='home' />
              Anasayfa
            </Menu.Item>

            <Menu.Item
              name='Yorumlar'
              active={activeItem === 'Yorumlar'}
              onClick={this.handleItemClick}
            >
              <Icon name='comments' />
              Yorumlar
            </Menu.Item>
            <Menu.Item
              name='chat'
              active={activeItem === 'chat'}
              onClick={this.handleItemClick}
            >
              <Icon name='chat' />
              Sohbet
            </Menu.Item>

            <Menu.Item
              name='menu'
              active={activeItem === 'menu'}
              onClick={this.handleItemClick}
            >
              <Icon name='food' />
              Menü Güncelle
            </Menu.Item>
          </Menu>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  replace: (path) => dispatch(replace(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPAge);
