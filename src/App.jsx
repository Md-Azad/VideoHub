import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Home from "./components/pages/Home/Home";
import Video from "./components/pages/Video";
import Add from "./components/pages/Add";
import Edit from "./components/pages/Edit";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos/:videoId" element={<Video />} />
        <Route path="/videos/add" element={<Add />} />
        <Route path="/videos/edit/:videoId" element={<Edit />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
