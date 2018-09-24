import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';

const mapState = (state) => ({
  events: state.events
})

const actions = {
  deleteEvent
}

class EventDashboard extends Component {

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId)
  }

  render() {
    const {events} = this.props
    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <EventList 
              deleteEvent={this.handleDeleteEvent} 
              events={events}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <h1>Empty Grid Column</h1>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}


export default connect(mapState, actions)(EventDashboard) 