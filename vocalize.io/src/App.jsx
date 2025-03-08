import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home/Home";
import Generate from "./components/generated/Generate";
import Loading from "./components/loading/Loading";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/generate" element={<Generate />} />
      </Routes>
    </Router>
  );
}

export default App;
