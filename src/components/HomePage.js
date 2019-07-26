import React from 'react';
import { Message, Icon, Container, Grid } from 'semantic-ui-react';


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
            <Message.Header>Just one second</Message.Header>
            We are fetching that content for you.
        </Message.Content>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default HomePage;
