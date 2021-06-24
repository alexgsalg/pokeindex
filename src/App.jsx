import { BrowserRouter as Routes, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Homepage/HomePage";

function App() {
  return (
    <Routes>
      {/* Navbar */}
      <Navbar />
      {/* Content */}
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </Routes>
  );
}

export default App;
