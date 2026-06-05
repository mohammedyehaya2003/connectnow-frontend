import Login from "./components/Auth/Login";
import Chat from "./components/Chat";
import Register from "./components/Auth/Register";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const token = localStorage.getItem("token");

  return (

  <BrowserRouter>

    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/"
        element={
          token
            ? <Chat />
            : <Login />
        }
      />

    </Routes>

  </BrowserRouter>

);

}

export default App;