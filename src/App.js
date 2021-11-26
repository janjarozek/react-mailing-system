import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import AddSubscriber from "./pages/AddSubscriber";
import AddCampaign from "./pages/AddCampaign";
import ListOfCampaigns from "./pages/ListOfCampaigns";

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from './rootReducer'
const store = createStore(rootReducer, applyMiddleware(thunk));

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

store.subscribe(()=> console.log(store.getState()));

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Header />
          <Navigation menu={menu} />

          <Switch>
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
      </Provider>
    </div>
  );
}
