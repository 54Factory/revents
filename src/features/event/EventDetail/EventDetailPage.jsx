import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase'
import { Grid } from 'semantic-ui-react';
import { compose } from 'redux'
import EventDetailHeader from './EventDetailHeader';
import EventDetailInfo from './EventDetailInfo'
import EventDetailChat from './EventDetailChat'
import EventDetailSidebar from './EventDetailSidebar'
import { objectToArray, createDataTree } from '../../../app/common/util/helpers'
import { goingToEvent, cancelGoingToEvent } from '../../user/userActions';
import { addEventComment } from '../eventActions';


const mapState = (state, ownProps) => {
  let event = {};
  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0]
  }
  return {
    event,
    auth: state.firebase.auth,
    eventChat: 
      !isEmpty(state.firebase.data.event_chat) && 
      objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])
  }
}

const actions = {
  goingToEvent,
  cancelGoingToEvent,
  addEventComment
}

class EventDetailPage extends Component {

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }
  
  render() {
    const {event, auth, goingToEvent, cancelGoingToEvent, addEventComment, eventChat} = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid)
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat)
    return (
      <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} isHost={isHost} isGoing={isGoing} goingToEvent={goingToEvent} cancelGoingToEvent={cancelGoingToEvent} />
        <EventDetailInfo event={event}/>
        <EventDetailChat addEventComment={addEventComment} eventId={event.id} eventChat={chatTree} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSidebar attendees={attendees}/>
      </Grid.Column>
    </Grid>
    )
  }
}

export default compose(
  withFirestore,
  connect(mapState, actions),
  firebaseConnect((props) => ([`event_chat/${props.match.params.id}`]))
  )(EventDetailPage)