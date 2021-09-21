import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { CanvasPage } from './components/CanvasPage/CanvasPage';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { MainPage } from './components/MainPage/MainPage';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="wrapper-content">
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/painting" component={CanvasPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
