import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// import parse from "html-react-parser";

import Header from "./components/Header";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import AddSubscriber from "./pages/AddSubscriber";
import AddCampaign from "./pages/AddCampaign";
import ListOfCampaigns from "./pages/ListOfCampaigns";

const menu = [
  {
    "label": "home",
    "adress": "/"
  },
  {
    "label": "add subscriber",
    "adress": "/add-subscriber"
  },
  {
    "label": "add campaign",
    "adress": "/add-campaign"
  },
  {
    "label": "Campaigns",
    "adress": "/list-of-campaigns"
  }
];

export default function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Navigation menu={menu} />

        <Switch>
          {/* {menu.map((item) => (
            <Route path={menu.adress}>
              {parse(`<${menu.componentName} />`)}
            </Route>
            // <Route path={menu.adress}>{parse(`<Home />`)}</Route>
          ))} */}

          <Route exact path="/add-subscriber">
            <AddSubscriber />
          </Route>
          <Route exact path="/add-campaign">
            <AddCampaign />
          </Route>
          <Route exact path="/list-of-campaigns">
            <ListOfCampaigns />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
