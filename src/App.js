import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ArtistSidebar from "./components/ArtistSidebar"; // Import the new ArtistSidebar
import Artist from "./pages/Artist";
import Brand from "./pages/Brand";
import Proposal from "./pages/Proposal";
import Payment from "./pages/Payment";
import Reports from "./pages/Reports";
import ApprovedArtists from "./pages/Artist/ApprovedArtists"; // Assuming you have this page
import PendingArtists from "./pages/Artist/PendingArtists"; // Assuming you have this page
import RejectedArtists from "./pages/Artist/RejectedArtists"; // Assuming you have this page
import OldArtists from "./pages/Artist/OldArtists"; // Assuming you have this page
import "./App.css";
import NewArtists from "./pages/Artist/NewArtists";
import ArtistDetail from "./pages/ArtistDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [showArtistSidebar, setShowArtistSidebar] = useState(false);

  const handleArtistClick = () => {
    setShowArtistSidebar(true);
  };

  const handleBackClick = () => {
    setShowArtistSidebar(false);
  };

  return (
    <Router>
      <div className="app-container">
        {showArtistSidebar ? (
          <ArtistSidebar onBack={handleBackClick} /> // Show artist sidebar
        ) : (
          <Sidebar onArtistClick={handleArtistClick} /> // Show main sidebar
        )}
        <div className="content">
          <Routes>
            <Route path="/artist" element={<Artist />} />
            <Route path="/artist/:artistId" element={<ArtistDetail />} />
            <Route path="/artist/newArtist" element={<NewArtists />} />
            <Route path="/artist/approved" element={<ApprovedArtists />} />
            <Route path="/artist/pending" element={<PendingArtists />} />
            <Route path="/artist/rejected" element={<RejectedArtists />} />
            <Route path="/artist/old" element={<OldArtists />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/proposal" element={<Proposal />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-right" // You can set default position
          autoClose={3000} // Default auto-close time
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
