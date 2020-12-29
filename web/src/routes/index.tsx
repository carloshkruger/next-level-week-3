import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import CreateOrphanage from '../pages/CreateOrphanage';
import DeleteOrphanage from '../pages/Dashboard/DeleteOrphanage';
import Login from '../pages/Dashboard/Login';
import PendingEntries from '../pages/Dashboard/PendingEntries';
import RegisteredOrphanages from '../pages/Dashboard/RegisteredOrphanages';
import Landing from '../pages/Landing';
import Orphanage from '../pages/Orphanage';
import OrphanagesMap from '../pages/OrphanagesMap';
import Route from './Route';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
        <Route path="/login" component={Login} />

        <Route
          path="/registered-orphanages"
          component={RegisteredOrphanages}
          isPrivate
        />
        <Route path="/pending-entries" component={PendingEntries} isPrivate />
        <Route
          path="/delete-orphanage/:id"
          component={DeleteOrphanage}
          isPrivate
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
