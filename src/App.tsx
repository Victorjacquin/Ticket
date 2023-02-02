import React from 'react';
import './App.css';
import Nav from './component/navv';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import store from "./reducer";

function App() {
  return (
      <Provider store={store}>
        <Nav/>
      </Provider>
  );
}

export default App;
