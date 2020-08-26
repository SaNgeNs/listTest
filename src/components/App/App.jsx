import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './partitions/Header';
import Footer from './partitions/Footer';
import Routes from 'Routes';
import  'Src/static/globals.less';
import './App.less';

export const App = () => {
  return (
    <div className="App">
      <Header />

      <div className="App__content">
        <Switch>
          {Routes.map(route => <Route key={route.name} {...route} />)}
        </Switch>
      </div>

      <Footer />
    </div>
  );
};

export default memo(App);
