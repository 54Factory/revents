import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const UserDetailSidebar = ({isCurrentUser}) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser ? 
        (
          <Button as={Link} to='/settings' color="teal" fluid basic content="Edit Profile" />
        )
        :
        (
        <Button color="blue" fluid content="Follow User" />
        )
        }
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailSidebar;
