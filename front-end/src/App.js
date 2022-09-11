import { BrowserRouter } from 'react-router-dom';
import SchedulerProvider from './context/SchedulerProvider';
import './App.css';
import Routes from './routes';

function App() {
  return (
    <SchedulerProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </SchedulerProvider>
  );
}

export default App;
