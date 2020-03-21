import React, { Component, Fragment } from "react";
import { Icon, Button, Segment, Modal, Form, Confirm } from "semantic-ui-react";
import ShowModal from "../ShowModal";
import styles from "./style.module.css";
import classNames from "classnames";

const bolgeler = [
  {
    id: 1,
    ad: "Salon"
  },
  {
    id: 2,
    ad: "Erkek"
  },
  {
    id: 3,
    ad: "Bayan"
  },
  {
    id: 4,
    ad: "Aile"
  }
];

const masalar = [
  {
    id: 1,
    bolge: "Salon",
    ad: "masa1",
    garson: "ahmet,mehmet,salih"
  },
  {
    id: 2,
    bolge: "Erkek",
    ad: "masa2",
    garson: "ahmet,mehmet"
  },
  {
    id: 3,
    bolge: "Salon",
    ad: "masa3",
    garson: "ahmet,mehmet"
  }
];

const ModalModal = props => (
  <Modal
    trigger={
      <div>
        <Icon name="add"></Icon>Ekle
      </div>
    }
    size="tiny"
  >
    <Modal.Header>{props.header}</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <Form.Input required label="Masa Adı" placeholder="Masa Adı..." />
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color="red">Kapat</Button>
      <Button
        positive
        icon="checkmark"
        labelPosition="right"
        content="Kaydet"
      />
    </Modal.Actions>
  </Modal>
);

class Meslic extends Component {
  state = {
    secilen_elemen: "",
    secilen_bolge_elem: "",
    selected_section: "",
    confirm_dlg_open: false
  };

  open_dialog = e => {
    this.setState({ confirm_dlg_open: true });
    console.log(e);
  };

  close_dialog = e => {
    this.setState({ confirm_dlg_open: false });
    console.log(e);
  };

  handleBolgeClick = e => {
    this.setState({
      secilen_elemen: e.target.innerHTML,
      secilen_bolge_elem: e.target.innerHTML
    });
  };

  handleMasaClick = e => {
    this.setState({
      secilen_elemen: e.target.innerHTML
    });
  };

  handleSectionClick = e => {
    this.setState({ selected_section: e.currentTarget.id });
  };

  render() {
    const { secilen_elemen, secilen_bolge_elem, selected_section } = this.state;

    const bolgelerbuttons = bolgeler.map(bolge => {
      let blgClass = classNames({
        [styles.selected]: secilen_bolge_elem === bolge.ad,
        [styles.selected_section]: secilen_elemen === bolge.ad
      });
      return (
        <div
          key={bolge.id}
          className={blgClass}
          onClick={this.handleBolgeClick}
        >
          {bolge.ad}
        </div>
      );
    });

    const masalarbuttons = masalar
      .filter(masa => masa.bolge === this.state.secilen_bolge_elem)
      .map(masa => (
        <div key={masa.id} onClick={this.handleMasaClick}>
          {masa.ad}
        </div>
      ));

    let classNameBolge = classNames({
      [styles.bolge]: true,
      [styles.selected_section]: selected_section === "bolge"
    });

    let classNameMasa = classNames({
      [styles.masa]: true,
      [styles.selected_section]: selected_section === "masa"
    });

    return (
      <div>
        <Confirm
          content="Emin misin?"
          open={this.state.confirm_dlg_open}
          onCancel={this.close_dialog}
          onConfirm={this.close_dialog}
        />
        <header>
          <div>
            <Icon size="large" name="chess board" />
            <b> Bölge/Masa</b>
          </div>
          <b></b>
          <b></b>
          <div onClick={this.open_dialog}>
            <Icon name="trash alternate" />
            Masa Güncelle
          </div>
          <ModalModal header={"Masa Ekle"} />
          <div>
            <Icon name="trash alternate" />
            Masa Sil
          </div>
        </header>

        <section
          id="bolge"
          className={classNameBolge}
          onClick={this.handleSectionClick}
        >
          {bolgelerbuttons}
        </section>

        <section
          id="masa"
          className={classNameMasa}
          onClick={this.handleSectionClick}
        >
          {masalarbuttons}
        </section>
        <ShowModal btn1={{ color: "yellow", text: "tamam" }} />
      </div>
    );
  }
}
export default Meslic;
