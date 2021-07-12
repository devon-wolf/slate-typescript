import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import { SocketContext, socket } from './socket/SocketProvider';
import Document from './pages/DocumentPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ListPage from './pages/ListPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <HomePage />}
          />

          <Route
            path="/login"
            exact
            render={() => <LoginPage />}
          />

          <Route
            path="/documents"
            exact
            render={() => <ListPage />}
          />

          <Route
            path="/documents/:id"
            exact
            render={() =>
              <SocketContext.Provider value={socket}>
                <Document />
              </SocketContext.Provider>
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
