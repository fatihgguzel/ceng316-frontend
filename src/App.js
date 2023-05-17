import './App.css';
import {
  Route,
  Link,
  Routes
} from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import { UserContext } from './Providers/context';
function App() {
  return (
    <div className="App">
      <UserContext.Provider> 
        <Routes>
          <Route exact path="/" element={<LoginPage/>} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
