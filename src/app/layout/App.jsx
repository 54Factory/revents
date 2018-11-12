import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable'
import LoadingComponent from './LoadingComponent'
import { UserIsAuthenticated } from '../../features/auth/authWrapper';
const AsyncHomePage = Loadable({
  loader: () => import('../../features/home/HomePage'),
  loading: LoadingComponent
})
const AsyncEventDashboard = Loadable({
  loader: () => import('../../features/event/EventDashboard/EventDashboard'),
  loading: LoadingComponent
})
const AsyncNavBar  = Loadable({
  loader: () => import('../../features/nav/NavBar/NavBar'),
  loading: LoadingComponent
})
const AsyncEventForm = Loadable({
  loader: () => import('../../features/event/EventForm/EventForm'),
  loading: LoadingComponent
})
const AsyncSettingsDashboard = Loadable({
  loader: () => import('../../features/user/Settings/SettingsDashboard'),
  loading: LoadingComponent
})
const AsyncUserDetailPage = Loadable({
  loader: () => import('../../features/user/UserDetailPage/UserDetailPage'),
  loading: LoadingComponent
})
const AsyncPeopleDashboard = Loadable({
  loader: () => import('../../features/user/PeopleDashboard/PeopleDashboard'),
  loading: LoadingComponent
})
const AsyncEventDetailPage = Loadable({
  loader: () => import('../../features/event/EventDetail/EventDetailPage'),
  loading: LoadingComponent
})
const AsyncModalManager = Loadable({
  loader: () => import('../../features/modals/ModalManager'),
  loading: LoadingComponent
})
const AsyncNotFound = Loadable({
  loader: () => import('../../app/layout/NotFound'),
  loading: LoadingComponent
})

class App extends Component {
  render() {
    return (
      <div>
        <AsyncModalManager/>
        <Switch>
          <Route exact path="/" component={AsyncHomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <div>
              <AsyncNavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={AsyncEventDashboard} />
                  <Route path="/event/:id" component={AsyncEventDetailPage} />
                  <Route path="/manage/:id" component={UserIsAuthenticated(AsyncEventForm)} />
                  <Route path="/people" component={UserIsAuthenticated(AsyncPeopleDashboard)} />
                  <Route path="/profile/:id" component={UserIsAuthenticated(AsyncUserDetailPage)} />
                  <Route path="/settings" component={UserIsAuthenticated(AsyncSettingsDashboard)} />
                  <Route path="/createEvent" component={UserIsAuthenticated(AsyncEventForm)} />
                  <Route path="/error" component={AsyncNotFound} />
                  <Route component={AsyncNotFound} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;

// import React, { Component } from 'react';
// import { Container } from 'semantic-ui-react';
// import { Route, Switch } from 'react-router-dom';
// import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
// import NavBar from '../../features/nav/NavBar/NavBar';
// import EventForm from '../../features/event/EventForm/EventForm';
// import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
// import UserDetailPage from '../../features/user/UserDetailPage/UserDetailPage';
// import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
// import EventDetailPage from '../../features/event/EventDetail/EventDetailPage';
// import HomePage from '../../features/home/HomePage';
// import TestComponent from '../../features/testarea/TestComponent'
// import ModalManager from '../../features/modals/ModalManager'
// import NotFound from './NotFound';
// import { UserIsAuthenticated } from '../../features/auth/authWrapper';


// class App extends Component {
//   render() {
//     return (
//       <div>
//         <ModalManager />
//         <Switch>
//           <Route exact path='/' component={HomePage} />
//         </Switch>
//       <Route 
//         path="/(.+)"
//         render={() => (
//           <div>
//             <NavBar />
//             <Container className="main" >
//               <Switch>
//                 <Route path='/test' component={TestComponent} />
//                 <Route path='/events' component={EventDashboard} />
//                 <Route path='/event/:id' component={EventDetailPage} />
//                 <Route path='/manage/:id' component={UserIsAuthenticated(EventForm)} />
//                 <Route path='/people' component={UserIsAuthenticated(PeopleDashboard)} />
//                 <Route path='/profile/:id' component={UserIsAuthenticated(UserDetailPage)} />
//                 <Route path='/settings' component={UserIsAuthenticated(SettingsDashboard)} />
//                 <Route path='/createEvent' component={UserIsAuthenticated(EventForm)} />
//                 <Route path="/error" component={NotFound} />
//                 <Route component={NotFound} />
//               </Switch>
//             </Container>        
//           </div>
//         )}
//       />
//       </div>
//     );
//   }
// }

// export default App;
