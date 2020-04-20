import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import Meclis from "../MeclisPage/Meclis";
// import MenuList from "../MenuListPage/MenuList";

import styles from "./style.module.css";

function Dashboard(props) {
  const [hideClass, set_hideClass] = useState("");
  const [activeItem, set_activeItem] = useState("");

  function handleMuneClick(e) {
    hideClass === "" ? set_hideClass(styles.hideNavbar) : set_hideClass("");
  }

  function handleItemClick(e, { name }) {
    set_activeItem(name);
    props.history.push("/dashboard/" + name);
  }

  function menuItem(name, component) {
    return (
      <Menu.Item
        name={component}
        active={activeItem === component}
        onClick={handleItemClick}
      >
        {name}
      </Menu.Item>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header>
        <Icon name="bars" size="large" onClick={handleMuneClick} />
        <Icon name="coffee" size="large" />
        <span>Kermes</span>
      </header>
      <nav className={hideClass}>
        <Menu pointing secondary vertical>
          {menuItem("Ana Sayfa", "HomePage")}
          <Menu.Item>
            Tanımlamalar
            <Menu.Menu>
              {menuItem("Masa / Bölge", "Meclis")}
              {menuItem("Menu / Ürünler", "Menuler")}
              {menuItem("Müşteri", "Tanımlamalar")}
            </Menu.Menu>
          </Menu.Item>
          {menuItem("Sipariş", "HomePage")}
          {menuItem("Mutfak", "HomePage")}
          {menuItem("Konum Paylaş", "HomePage")}
          <Menu.Item>
            İşlemler
            <Menu.Menu>
              {menuItem("Stok İşlemleri", "Tanımlamalar")}
              {menuItem("Gider/Masraf İşlemleri", "Tanımlamalar")}
              {menuItem("Zayiat İşlemleri", "Tanımlamalar")}
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            Raporlar
            <Menu.Menu>
              {menuItem("Ürün Satiş Raporu", "Tanımlamalar")}
              {menuItem("Gün Sonu Raporu", "Tanımlamalar")}
              {menuItem("İstatistikler", "Tanımlamalar")}
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            Kullanıcılar
            <Menu.Menu>
              {menuItem("Kullanıcılar", "Tanımlamalar")}
              {menuItem("Yetkiler", "Tanımlamalar")}
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            Ayarlar
            <Menu.Menu>
              {menuItem("Kermes Ayarları", "Tanımlamalar")}
              {menuItem("Yazıcı Ayarları", "Tanımlamalar")}
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      </nav>
      <main>
        <Switch>
          <Route exact path="/dashboard/meclis" component={Meclis} />
          {/* <Route exact path="/dashboard/menuler" component={MenuList} /> */}
        </Switch>
      </main>
    </div>
  );
}

export default Dashboard;
