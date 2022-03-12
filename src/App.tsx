import React from 'react';

// import { TsReactTest } from  'try-use-array'
import { useAuth } from 'context/auth-context';
import { AuthenticatedApp } from 'authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app';

import './App.css';

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {/* <TsReactTest /> */}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
