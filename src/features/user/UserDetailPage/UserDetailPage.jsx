import React, {Component} from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid } from "semantic-ui-react";
import UserDetailHeader from './UserDetailHeader'
import UserDetailDescription from './UserDetailDescription';
import UserDetailPhotos from './UserDetailPhotos';
import UserDetailedSidebar from './UserDetailSidebar';
import UserDetailEvents from './UserDetailEvents';
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { userDetailQuery } from '../userQueries'

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {}
  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile
  } else {
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id
  }
  return {
    profile,
    userUid,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting
  }
}

class UserDetailPage extends Component {
  
  render() {
    const { profile, photos, auth, match, requesting } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true)

    if (loading) return <LoadingComponent inverted={true} />

    return (
      <Grid>
        <UserDetailHeader profile={profile} />
        <UserDetailDescription profile={profile} />
        <UserDetailedSidebar isCurrentUser={isCurrentUser} />
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
  firestoreConnect((auth, userUid) => userDetailQuery(auth, userUid))
  )(UserDetailPage);