import './App.css';
import {
  Route,
  Link,
  Routes
} from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import { UserContextProvider } from './Providers/context';
import Navbar from './components/navbar/Navbar';
import MainPage from './pages/MainPage/MainPage';


function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Navbar></Navbar>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage/>} />
            <Route path='/dashboard' element={<MainPage/>} />
          </Routes>
        </div>
      </UserContextProvider>
    </div>
  );
}

export default App;
