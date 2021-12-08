import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./components/home/HomePage";
import Contact from "./components/contact/Contact";
import LoginPage from "./components/login/LoginPage";
import AdminPage from "./components/admin/AdminPage";
import ViewDrink from "./components/detail/ViewDrink";
import Favorites from "./components/favorites/Favorites";
import Nav from "./components/layout/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/detail/:idDrink">
              <ViewDrink />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/admin">
              <AdminPage />
            </Route>
            <Route path="/favorites">
              <Favorites />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
