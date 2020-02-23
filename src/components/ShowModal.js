import React from "react";
import { Button, Modal } from "semantic-ui-react";

export default class ModalModal extends React.Component {
  state = {};
  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const { elem, size, header, decs, btn1, btn2 } = this.props;
    const { modalOpen } = this.setState;

    return (
      <Modal trigger={elem || <Button>Diaolog</Button>} size={size || "tiny"}>
        <Modal.Header>{header || "Başlik"}</Modal.Header>
        <Modal.Content>
          <Modal.Description>{decs || "İçerik"}</Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {btn1 && (
            <Button color={btn1.color || "red"} onClick={this.handleClose}>
              {btn1.text || "Kapat"}
            </Button>
          )}
          {btn2 && (
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Kaydet"
            />
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}
