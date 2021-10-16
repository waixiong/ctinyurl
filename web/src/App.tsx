import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CreateLinkWidget } from './module/link/link.component';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <CreateLinkWidget/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
