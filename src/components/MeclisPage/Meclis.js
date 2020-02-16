import React, { Component, Fragment } from "react";
import { Icon, Button, Segment } from "semantic-ui-react";
import styles from "./style.module.css";

class Meslic extends Component {
  render() {
    return (
      <div className={styles}>
        <header>
          <Icon size="large" name="chess board" />
          <b> Bölge/Masa</b>
        </header>
        <section id="bölegeler">
          <Button.Group>
            <Button>Solan</Button>
            <Button>Aile Bölümü</Button>
            <Button>Erkek</Button>
            <Button>Hanımlar</Button>
          </Button.Group>
        </section>

        <section id="masalar">
          <Segment>Masa1</Segment>
          <Segment>Masa2</Segment>
          <Segment>Masa3</Segment>
        </section>
      </div>
    );
  }
}

export default Meslic;
