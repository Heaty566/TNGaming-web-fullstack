import React from "react";
import "./App.scss";
import { Switch, Route, Redirect } from "react-router-dom";

import ProtectedRouter from "./js/components/routers/protectedRouter";
// import AdminRouter from "./js/components/routers/adminRouter";

import Navbar from "./js/containers/navbar";
import Login from "./js/containers/login";
import Register from "./js/containers/register";
import Footer from "./js/containers/footer";
import Home from "./js/containers/home";
import AboutUs from "./js/containers/aboutus";

function App() {
    return (
        <React.Fragment>
            <div className="layout__container">
                <header className="navbar__container">
                    <Navbar />
                </header>
                <main className="main__container">
                    <Switch>
                        <Route path="/home" exact component={Home} />
                        <Route path="/aboutus" exact component={AboutUs} />
                        <ProtectedRouter path="/users/login" component={Login} />
                        <ProtectedRouter path="/users/register" component={Register} />
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
