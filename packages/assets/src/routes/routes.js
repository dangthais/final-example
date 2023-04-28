import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../loadables/Home';
import Settings from '../loadables/Settings';
import NotFound from '../loadables/NotFound';
import Notifications from '../loadables/Notifications';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/settings" component={Settings} />
    <Route exact path="/notifications" component={Notifications} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
