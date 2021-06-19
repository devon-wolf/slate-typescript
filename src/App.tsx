import EditorWrapper from './pages/EditorWrapper';
import './App.css';
import { SocketContext, socket } from './socket/SocketProvider';

function App() {
  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <EditorWrapper />
      </SocketContext.Provider>
    </div>
  );
}

export default App;
