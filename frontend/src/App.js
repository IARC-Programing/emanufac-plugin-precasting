import { Switch, Route, Redirect, useLocation } from "react-router";
import { CreateProject, DetailProject, EditProject, Projects } from "./views";

function App({ prefix, helpingComponent, React }) {
  const { pathname } = useLocation();
  const moduleName = "ตัดเหล็กและงานพรีแคส";
  return (
    <div className='App'>
      <div className='py-4'>
        <Switch>
          <Redirect exact from={`${prefix}`} to={`${prefix}/project`} />
          <Redirect from='/:url*(/+)' to={pathname.slice(0, -1)} />

          <Route exact path={`${prefix}/project`}>
            <Projects
              helpingComponent={helpingComponent}
              title='โปรเจกต์'
              subtitle={moduleName}
              React={React}
            />
          </Route>
          <Route exact path={`${prefix}/project/create`}>
            <CreateProject
              helpingComponent={helpingComponent}
              title='สร้างโปรเจกต์'
              subtitle={moduleName}
              React={React}
            />
          </Route>
          <Route exact path={`${prefix}/project/detail/:id`}>
            <DetailProject
              helpingComponent={helpingComponent}
              title='รายละเอียดโปรเจกต์'
              subtitle={moduleName}
              React={React}
            />
          </Route>
          <Route exact path={`${prefix}/project/edit/:id`}>
            <EditProject
              helpingComponent={helpingComponent}
              title='แก้ไขโปรเจกต์'
              subtitle={moduleName}
              React={React}
            />
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
