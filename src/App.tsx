import TextEditor from './pages/TextEditor';
import './App.css';
import { SocketContext, socket } from './socket/SocketProvider';

function App() {
  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <TextEditor />
      </SocketContext.Provider>
    </div>
  );
}

export default App;
