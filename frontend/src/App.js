import { Switch, Route, Redirect, useLocation } from "react-router-dom";

function App({ prefix }) {
  const { pathname } = useLocation();
  return (
    <div className='App'>
      <div className='py-4'>
        <Switch>
          <Redirect exact from={`${prefix}`} to={`${prefix}/main`} />
          <Redirect from='/:url*(/+)' to={pathname.slice(0, -1)} />

          <Route exact path={`${prefix}/main`}>
            <div></div>
          </Route>

          <Route exact path={`${prefix}/warehouse`}>
            <div></div>
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
