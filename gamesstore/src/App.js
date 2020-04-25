import React from "react";
import "./App.scss";
import { Switch, Route, Redirect } from "react-router-dom";

import ProtectedRouter from "./js/components/routers/protectedRouter";
// import AdminRouter from "./js/components/routers/adminRouter";
import HigherRoleRouter from "./js/components/routers/higherRoleRouter";
import { routerURL } from "./js/config/http.json";

import Navbar from "./js/containers/navbar";
import Login from "./js/containers/login";
import Register from "./js/containers/register";
import Footer from "./js/containers/footer";
import Home from "./js/containers/home";
import AboutUs from "./js/containers/aboutus";
import Dashboard from "./js/containers/dashboard";
import Store from "./js/containers/store";

function App() {
  return (
    <React.Fragment>
      <div className="layout__container">
        <header className="navbar__container">
          <Navbar />
        </header>
        <main className="main__container">
          <Switch>
            <Route path={routerURL.home} exact component={Home} />
            <Route path={routerURL.aboutus} exact component={AboutUs} />
            <Route path={routerURL.store} exact component={Store} />
            <ProtectedRouter path={routerURL.userLogin} component={Login} />
            <ProtectedRouter
              path={routerURL.userRegister}
              component={Register}
            />
            <HigherRoleRouter
              path={routerURL.dashboard}
              component={Dashboard}
            />
            <Redirect from="/" exact to="/home" />
          </Switch>
        </main>
        <footer className="footer__container">
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
}

export default App;
