import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Menu, Icon  } from "semantic-ui-react";
import Meclis from "../MeclisPage/Meclis";
import MenuList from "../MenuListPage/MenuList";

import styles from "./style.module.css";

class Dashboard extends Component {
  state = { activeItem: "home", hideClass: "" };

  handleMuneClick = e => {
    if (this.state.hideClass === "")
      this.setState({ hideClass: styles.hideNavbar });
    else this.setState({ hideClass: "" });
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push("/dashboard/" + name);
  };

  menuItem = (name, component) => (
    <Menu.Item
      name={component}
      active={this.state.activeItem === component}
      onClick={this.handleItemClick}
    >
      {name}
    </Menu.Item>
  );

  render() {
    const { hideClass } = this.state;

    return (
      <div className={styles.dashboard}>
        <header>
          <Icon name="bars" size="large" onClick={this.handleMuneClick} />
          <Icon name="coffee" size="large" />
          <span>Kermes</span>
        </header>
        <nav className={hideClass}>
          <Menu pointing secondary vertical>
            {this.menuItem("Ana Sayfa", "HomePage")}
            <Menu.Item>
              Tanımlamalar
              <Menu.Menu>
                {this.menuItem("Masa / Bölge", "Meclis")}
                {this.menuItem("Menu / Ürünler", "Menuler")}
                {this.menuItem("Müşteri", "Tanımlamalar")}
              </Menu.Menu>
            </Menu.Item>
            {this.menuItem("Sipariş", "HomePage")}
            {this.menuItem("Mutfak", "HomePage")}
            {this.menuItem("Konum Paylaş", "HomePage")}
            <Menu.Item>
              İşlemler
              <Menu.Menu>
                {this.menuItem("Stok İşlemleri", "Tanımlamalar")}
                {this.menuItem("Gider/Masraf İşlemleri", "Tanımlamalar")}
                {this.menuItem("Zayiat İşlemleri", "Tanımlamalar")}
              </Menu.Menu>
            </Menu.Item>
            <Menu.Item>
              Raporlar
              <Menu.Menu>
                {this.menuItem("Ürün Satiş Raporu", "Tanımlamalar")}
                {this.menuItem("Gün Sonu Raporu", "Tanımlamalar")}
                {this.menuItem("İstatistikler", "Tanımlamalar")}
              </Menu.Menu>
            </Menu.Item>
            <Menu.Item>
              Kullanıcılar
              <Menu.Menu>
                {this.menuItem("Kullanıcılar", "Tanımlamalar")}
                {this.menuItem("Yetkiler", "Tanımlamalar")}
              </Menu.Menu>
            </Menu.Item>
            <Menu.Item>
              Ayarlar
              <Menu.Menu>
                {this.menuItem("Kermes Ayarları", "Tanımlamalar")}
                {this.menuItem("Yazıcı Ayarları", "Tanımlamalar")}
              </Menu.Menu>
            </Menu.Item>
          </Menu>
        </nav>
        <main>
          <Switch>
            <Route exact path="/dashboard/meclis"  component={Meclis} />
            <Route exact path="/dashboard/menuler" component={MenuList}/>        
          </Switch>
        </main>
      </div>
    );
  }
}

export default Dashboard;
