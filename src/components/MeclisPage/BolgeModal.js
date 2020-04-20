import React, { useState } from "react";
import { Button, Modal, Form, Dropdown } from "semantic-ui-react";

export function BolgeModal(props) {
  const { open, header, close_fn, kaydet_fn } = props;
  const [bolge_adi, set_bolge_adi] = useState("");
  const [garson, set_garson] = useState("");
  const [masa_adeti, set_masa_adeti] = useState(0);

  return (
    <Modal open={open} size="tiny" closeOnEscape={true} onClose={close_fn}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <Form.Input
                required
                label="Bölge Adı"
                placeholder="Bölge Adı..."
                onChange={(e) => set_bolge_adi(e.target.value)}
                name="bolge_adi"
                value={bolge_adi}
              />
            </Form.Field>
            <Form.Field>
              <label>Garson</label>
              <Dropdown
                label="Garson"
                placeholder="Garson Seçiniz..."
                name="garson"
                multiple
                search
                selection
                noResultsMessage="Kayıt bulunamadı"
                onChange={(e) => set_garson(e.target.value)}
                options={props.garsonlar}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                required
                type="number"
                label="Masa Adeti"
                placeholder="Masa Adeti..."
                onChange={(e) => set_masa_adeti(e.target.value)}
                name="masa_adeti"
                value={parseInt(masa_adeti)}
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={close_fn} color="red">
          Kapat
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Kaydet"
          disabled={bolge_adi === ""}
          onClick={() => kaydet_fn({ bolge: bolge_adi, garson })}
        />
      </Modal.Actions>
    </Modal>
  );
}
