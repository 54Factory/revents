import { toastr } from 'react-redux-toastr'
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from './eventConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockAPI';


export const fetchEvents = (events) => {
  return {
    type: FETCH_EVENTS,
    payload: events
  }
}

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart())
      let events = await fetchSampleData();
      dispatch(fetchEvents(events))
      dispatch(asyncActionFinish())
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}



export const createEvent = (event) => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: {
          event
        }
      })
      toastr.success('Success!', 'Your Event Has Been Created!')
    } catch (error) {
      toastr.error('Oops! Shit got fucked up.....')
    }
  } 
}

export const updateEvent = (event) => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event
        }
      })
      toastr.success('Success!', 'Your Event Has Been Updated!')
    } catch (error) {
      toastr.error('Oops! Shit got fucked up.....')
    }
  } 
}

export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  }
}

