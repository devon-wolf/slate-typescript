import React from 'react';
import EditorWrapper from './pages/EditorWrapper';
import './App.css';
import { SocketContext, socket } from './socket/SocketProvider';

function App(): JSX.Element {
  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <EditorWrapper />
      </SocketContext.Provider>
    </div>
  );
}

export default App;
