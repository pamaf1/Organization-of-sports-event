import {BrowserRouter , Routes , Route} from 'react-router-dom';
import './resources/design.css'
import Home from "./pages/home";
import Registration from "./pages/registration";
import Login from "./pages/login";
import PublicRoute from './components/publicRoute';
import ProtectedRoute from './components/protectedRoute';
import Loader from "./components/loader";
import { useSelector } from "react-redux";
import AdminMatches from './pages/Admin/adminMatches';
import AdminUsers from './pages/Admin/adminUsers';
import UserMatches from './pages/userMatches';
import Profile from './pages/profile';
import MatchInfo from './pages/matchInfo';
import Users from './pages/users';
import UserInfo from './pages/usersInfo'


function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/user/:id" element={<ProtectedRoute><UserInfo /></ProtectedRoute>} />
          <Route path="/match/:id" element={<ProtectedRoute><MatchInfo /></ProtectedRoute>} />
          <Route path="/admin/matches" element={<ProtectedRoute><AdminMatches /></ProtectedRoute>} />
          <Route path="/create-matches" element={<ProtectedRoute><UserMatches /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="/registration" element={<PublicRoute><Registration /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
