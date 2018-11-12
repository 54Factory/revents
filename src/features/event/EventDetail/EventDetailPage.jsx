import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase'
import { Grid } from 'semantic-ui-react';
import { compose } from 'redux'
import { toastr } from 'react-redux-toastr';
import LoadingComponent from '../../../app/layout/LoadingComponent'
import EventDetailHeader from './EventDetailHeader';
import EventDetailInfo from './EventDetailInfo'
import EventDetailChat from './EventDetailChat'
import EventDetailSidebar from './EventDetailSidebar'
import { objectToArray, createDataTree } from '../../../app/common/util/helpers'
import { goingToEvent, cancelGoingToEvent } from '../../user/userActions';
import { addEventComment } from '../eventActions';
import { openModal } from '../../modals/modalActions';


const mapState = (state, ownProps) => {
  let event = {};
  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0]
  }
  return {
    event,
    auth: state.firebase.auth,
    loading: state.async.loading,
    eventChat: 
      !isEmpty(state.firebase.data.event_chat) && 
      objectToArray(state.firebase.data.event_chat[ownProps.match.params.id]),
    requesting: state.firestore.status.requesting,

  }
}

const actions = {
  goingToEvent,
  cancelGoingToEvent,
  addEventComment,
  openModal
}

class EventDetailPage extends Component {
  state = {
    initialLoading: true
  }
  async componentDidMount() {
    const { firestore, match } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    if (!event.exists) {
      toastr.error('Not Found')
      this.props.history.push('/error')
    }
    await firestore.setListener(`events/${match.params.id}`);
    this.setState({
      initialLoading: false
    })
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  
  
  render() {
    const {match, requesting,loading, event, auth, goingToEvent, cancelGoingToEvent, addEventComment, eventChat, openModal} = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees).sort(function(a, b) {
        return a.joinDate - b.joinDate;
    });
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid)
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat)
    const authenticated = auth.isLoaded && !auth.isEmpty
    const loadingEvent = requesting[`events/${match.params.id}`]

    if (loadingEvent || this.state.initialLoading) return <LoadingComponent inverted={true}/>

    return (
      <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader 
          loading={loading} 
          authenticated={authenticated}
          openModal={openModal}
          event={event} 
          isHost={isHost} 
          isGoing={isGoing} 
          goingToEvent={goingToEvent} 
          cancelGoingToEvent={cancelGoingToEvent} 
        />
        <EventDetailInfo event={event}/>
        {authenticated &&
          <EventDetailChat addEventComment={addEventComment} eventId={event.id} eventChat={chatTree} />
        }
        
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
  firebaseConnect(props => props.auth.isLoaded && !props.auth.isEmpty && ([`event_chat/${props.match.params.id}`]))
  )(EventDetailPage)