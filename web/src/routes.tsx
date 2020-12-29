import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import CreateOrphanage from './pages/CreateOrphanage';
import Orphanage from './pages/Orphanage';
import Login from './pages/Dashboard/Login';
import { useAuth } from './contexts/auth';
import RegisteredOrphanages from './pages/Dashboard/RegisteredOrphanages';
import PendingEntries from './pages/Dashboard/PendingEntries';
import DeleteOrphanage from './pages/Dashboard/DeleteOrphanage';

function Routes() {
  const { signed } = useAuth();

  console.log(signed);

  return (
    <BrowserRouter>
      <Switch>
        {!signed ? (
          <>
            <Route path="/" exact component={Landing} />
            <Route path="/app" component={OrphanagesMap} />
            <Route path="/orphanages/create" component={CreateOrphanage} />
            <Route path="/orphanages/:id" component={Orphanage} />
            <Route path="/login" component={Login} />
          </>
        ) : (
          <>
            <Redirect to="/registered-orphanages" />
            <Route
              path="/registered-orphanages"
              component={RegisteredOrphanages}
            />
            <Route path="/pending-entries" component={PendingEntries} />
            <Route path="/delete-orphanage/:id" component={DeleteOrphanage} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
