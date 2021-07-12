import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import { SocketContext, socket } from './socket/SocketProvider';
import EditorWrapper from './pages/EditorWrapper';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DocumentList from './pages/DocumentList';

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
            render={() => <DocumentList />}
          />

          <Route
            path="/documents/:id"
            exact
            render={() =>
              <SocketContext.Provider value={socket}>
                <EditorWrapper />
              </SocketContext.Provider>
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
