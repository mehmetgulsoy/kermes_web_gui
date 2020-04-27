import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Header,
  Message,
  Segment,
  Icon,
} from "semantic-ui-react";
import * as auth from "../../state/actions";
import * as msg from "../../utils/msg";
import styles from "./login.module.css";

export default function LoginForm(props) {
  const [uye, set_uye] = useState("Mehmet@BTY");
  const [sifre, set_sifre] = useState("31414819674");
  const [formErrors, set_formErrors] = useState({});
  const isLoading = useSelector((state) => state.ui.is_loading);
  const error = useSelector((state) => state.ui.error);
  const disp_msg = useSelector((state) => state.ui.msg);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!uye) errors.uye = msg.REQUIRED_FIELD_MSG;
    else if (!uye.includes("@")) errors.uye = msg.UYE_FIELD_MSG;
    if (!sifre) errors.sifre = msg.REQUIRED_FIELD_MSG;
    set_formErrors({ formErrors: errors });

    if (Object.entries(errors).length !== 0) {
      return;
    }
    dispatch(auth.login({ uye, sifre }));
  };
  const get_error = () => Object.entries(formErrors).length !== 0;
  const get_msg = () =>
    Object.entries(formErrors).length !== 0 ? formErrors : disp_msg;
  return (
    <div className={styles.loginForm}>
      <Header as="h2">
        <Icon name="coffee" size="big" /> Üye Girişi
      </Header>
      <Form error={get_error()} onSubmit={handleSubmit}>
        <Segment stacked>
          <Message error={false} header="Hata Oluştu!" content={get_msg()} />
          <Form.Input
            fluid
            required
            icon="user"
            iconPosition="left"
            placeholder="uye@firma"
            pointing="right"
            name="uye"
            value={uye}
            error={formErrors.uye}
            onChange={(e) => set_uye(e.target.value)}
          />
          <Form.Input
            fluid
            required
            icon="lock"
            iconPosition="left"
            placeholder="Şifre"
            type="password"
            name="sifre"
            value={sifre}
            error={formErrors.sifre}
            onChange={(e) => set_sifre(e.target.value)}
          />
          <Button primary fluid size="large" loading={isLoading}>
            Giriş
          </Button>
        </Segment>
      </Form>
      <Message style={{ textAlign: "justify" }}>
        <Link to="/"> Şifremi unuttum</Link>
      </Message>
    </div>
  );
}
