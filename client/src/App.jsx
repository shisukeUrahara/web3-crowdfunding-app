import { ConnectWallet } from "@thirdweb-dev/react";
// import "./styles/Home.css";
import './index.css'
import { Routes, Route } from 'react-router-dom'
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages/index';
import { Navbar, Sidebar } from "./components";

export default function App() {
  return (
    <div className="relative sm:p-8 p-4 bg-[#0000] min-h-screen flex flex-row">
      {/*  sidebar */}
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      {/* navbar */}
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />

        </Routes>

      </div>


    </div>
  );
}
