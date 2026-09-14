import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Search from "./pages/Search.tsx";
import Watchlist from "./pages/Watchlist.tsx";
import ListingTemplate from "./pages/ListingTemplate.tsx";
import Error from "./pages/Error.tsx";
import About from "./pages/About.tsx";
import Calculator from "./pages/Calculator.tsx";
import Settings from "./pages/Settings.tsx";
function App() {

  return (
    <div className="app">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/listings" element={<Search />} />
          <Route path="/listings/:listingId" element={<ListingTemplate />} />
          <Route path="/watchlist" element={<Watchlist />} />  
          <Route path="/calculator" element={<Calculator />} />  
          <Route path="/settings" element={<Settings />} />  
          <Route path="/*" element={<Error/>} />  
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
