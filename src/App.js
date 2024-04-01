import './index.css';
import Nav from "./components/Nav"
import Home from "./components/Home"
import About from "./components/About"
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
function App() {
  return (
   <>
   <Router>
   {<Nav />}
   <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/about" element={<About/>}></Route>
   </Routes>
   </Router>
   </>
  );
}

export default App;