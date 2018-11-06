import React, {Component} from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid } from "semantic-ui-react";
import UserDetailHeader from './UserDetailHeader'
import UserDetailDescription from './UserDetailDescription';
import UserDetailPhotos from './UserDetailPhotos';
import UserDetailedSidebar from './UserDetailSidebar';
import UserDetailEvents from './UserDetailEvents';

const query = ({auth}) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{collection: 'photos'}],
      storeAs: 'photos'
    }
  ]
}

const mapState = (state) => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  photos: state.firestore.ordered.photos
})

class UserDetailPage extends Component {
  
  render() {
    const { profile, photos } = this.props
    console.log(this.props)
    return (
      <Grid>
        <UserDetailHeader profile={profile} />
        <UserDetailDescription profile={profile} />
        <UserDetailedSidebar />
      {photos && photos.length > 0 &&
        <UserDetailPhotos photos={photos} />
      }
        <UserDetailEvents />
      </Grid>
    );
  }
}

export default compose(
  connect(mapState),
  firestoreConnect(auth => query(auth))
  )(UserDetailPage);