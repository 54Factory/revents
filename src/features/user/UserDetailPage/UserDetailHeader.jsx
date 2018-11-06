import React from 'react'
import differenceInYears from 'date-fns/difference_in_years'
import { Grid, Header, Item, Segment } from "semantic-ui-react";

const UserDetailHeader = ({profile}) => {

  let age;
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth.toDate()) 
  } else {
    age = 'unknown'
  }
  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image avatar size='small' src={profile.photoURL}/>
            <Item.Content verticalAlign='bottom'>
                <Header as='h1'>{profile.displayName || 'tbn'}</Header>
                <br/>
                <Header as='h3'>{profile.occupation || 'tbn'}</Header>
                <br/>
                <Header as='h3'>{age}, Lives in {profile.city}</Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  )
}

export default UserDetailHeader
