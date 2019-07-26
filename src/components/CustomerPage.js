import { push, replace } from 'connected-react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import { Divider, Icon, Menu, Segment } from "semantic-ui-react";


const Anasayfa = () => <h2>Home</h2>;
const Siparis = () => <h2>Sipariş</h2>;
const Yorumlar = () => <h2>Yorumlar</h2>;

class CustomerPage extends Component {
  state = { activeItem: 'home' }

  routes = [
    {
      path: this.props.match.path + '/Anasayfa',
      exact: true,  
      component: Anasayfa, 
    },
    {
      path: this.props.match.path +'/Siparis',
      component: Siparis,
    },
    {
      path: this.props.match.path +'/Yorumlar',
      component: Yorumlar,
    }
  ];

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.push(this.props.match.path + '/' + name)  
  }

  render(){    
    const { activeItem } = this.state
    return(
      <div>
        <Divider hidden/>
        <Segment vertical>
         
          {this.routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
          ))} 
          
        </Segment> 
        <Segment vertical>
          <Menu icon='labeled' fixed='bottom' size='mini' fluid>
            <Menu.Item 
              name='Anasayfa' 
              active={activeItem === 'Anasayfa'} 
              onClick={this.handleItemClick}>
              <Icon name='home' />
              Anasayfa
            </Menu.Item>

            <Menu.Item
              name='Siparis'
              active={activeItem === 'Siparis'}
              onClick={this.handleItemClick}
            >
              <Icon name='cart' />
              Sipariş
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
              name='food'
              active={activeItem === 'food'}
              onClick={this.handleItemClick}
            >
              <Icon name='food' />
              Menu
            </Menu.Item>
          </Menu>
        </Segment> 
      </div>
    )
  }
}

const mapStateToProps=state=> ({

});
  
const mapDispatchToProps=dispatch=> ({
  push: (path) => dispatch(push(path)),
  replace: (path) =>dispatch(replace(path))
});
  
  export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);
