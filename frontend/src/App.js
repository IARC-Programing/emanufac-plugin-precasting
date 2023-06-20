import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router";

function App({ prefix }) {
  const { pathname } = useLocation();
  return (
    <div className='App'>
      <div className='py-4'>
        <Switch>
          <Redirect exact from={`${prefix}`} to={`${prefix}/project`} />
          <Redirect from='/:url*(/+)' to={pathname.slice(0, -1)} />

          <Route exact path={`${prefix}/project`}>
            <div>Project</div>
          </Route>

          <Route path='*'>
            <div>Not Found</div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
