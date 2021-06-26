//import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import { autologin } from "./utilities/ReduxStore/reducers/user";

import Loading from './components/Loading'
import Login from './components/Login'
import Register from './components/Register'
import Navbar from './components/Navbar'
import Trips from './components/Trips'
import Footer from './components/Footer'
//import TripPlanner from './components/TripPlanner'
import UpdateProfile from "./components/UpdateProfile";
import Kashmir from './components/soumya_components/kashmir'
import Goa from './components/soumya_components/goa'
import Gujarat from './components/soumya_components/gujarat'
import Kerala from './components/soumya_components/kerala'
import Meghalaya from './components/soumya_components/meghalaya'
import Uttarakhand from './components/soumya_components/uttarakhand'
import Weather from './components/soumya_components/weather'
import Map from './components/sayendeep_components/Map'
import Comment from './components/soumya_components/comment'
import Contact from './components/Contact'
import BookForm from './components/soumya_components/form'

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!user.fetched) {
    dispatch(autologin());
    return (
      <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  } else
    return (
      <Router>
        <Loading />
        <Switch>
          <Route exact path="/updateProfile" component={UpdateProfile} />
          {/* <Route path={['']} exact component={NotRequireLogin}/> */}

          <Route path="/" component={NotRequireLogin} />
          {/* <RequireLogin/>
          <NotRequireLogin/>
        </Route> */}
        </Switch>
      </Router>
    );
}

const RequireLogin = () => {
  const user = useSelector((state) => state.user);

  if (!user.data) return <Redirect to="/login" />;
  else if (user.data && !user.data.active)
    return <Redirect to="/updateProfile" />;
  return <Switch></Switch>;
};

const NotRequireLogin = () => {
  const user = useSelector((state) => state.user);

  if (user.data && !user.data.active) return <Redirect to="/updateProfile" />;
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route path="/">
        <Navbar />
        <Switch>
          <Route path="/kashmir" exact component={Kashmir} />
          <Route path="/goa" exact component={Goa} />
          <Route path="/uttarakhand" exact component={Uttarakhand} />
          <Route path="/kerala" exact component={Kerala} />
          <Route path="/gujarat" exact component={Gujarat} />
          <Route path="/meghalaya" exact component={Meghalaya} />
          <Route path="/explore" exact component={Map} />
          <Route path="/comment" exact component={Comment} />
          <Route path="/contact" exact component={Contact}/>
          <Route path="/book" exact component={BookForm}/>
          <Route path="/" component={Trips} />
          <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
        <Footer />
      </Route>
    </Switch>
  );
};

export default App;
