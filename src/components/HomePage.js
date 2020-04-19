import React from 'react';
import { Grid, Icon, Message } from 'semantic-ui-react';


const HomePage = () => {
  return (
    <Grid
      textAlign='center'
      style={{ height: '100vh' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Lütfen bekleyiniz</Message.Header>
            Sizin için data çekiliyor...
        </Message.Content>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default HomePage;
