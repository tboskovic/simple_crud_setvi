import { MantineProvider, Navbar } from '@mantine/core';
import {
  BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
//Pages
import { Home, Details, CreateNew, NotFound } from './scenes';
//Components
import { Header } from './components/Header';
//Styles
import './App.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <BrowserRouter>
          <div className=''>
            <Header/>
            <div className='p-8'>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/create' element={<CreateNew/>}/>
                <Route path='/details/:id' element={<Details/>}/>
                <Route path='/*' element={<NotFound/>}/>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
