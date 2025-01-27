import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header, Footer } from './components';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Profile from './components/Profile/Profile';
import CreateMatch from './components/Organizer/CreateMatch';
import ManageTeams from './components/Organizer/ManageTeams';
import Venues from './components/Organizer/Venues';
import Matches from './components/Matches/Matches';
import LiveMatches from './components/LiveMatches/LiveMatches';
import Registration from './components/Auth/Registration';
import ScoreManager from './components/Organizer/ScoreManager';

// Create a wrapper component to use the useLocation hook
function AppContent() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const location = useLocation();

    // Don't show footer on auth pages
    const showFooter = location.pathname !== '/auth';

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {isAuthenticated && <Header />}
            <main className="flex-grow">
                <Routes>
                    <Route 
                        path="/" 
                        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />} 
                    />
                    <Route 
                        path="/auth" 
                        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Registration />} 
                    />
                    <Route 
                        path="/dashboard" 
                        element={isAuthenticated ? <LiveMatches /> : <Navigate to="/auth" />} 
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route 
                        path="/profile" 
                        element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />} 
                    />
                    <Route 
                        path="/create-match" 
                        element={isAuthenticated ? <CreateMatch /> : <Navigate to="/auth" />} 
                    />
                    <Route 
                        path="/manage-teams" 
                        element={isAuthenticated ? <ManageTeams /> : <Navigate to="/auth" />} 
                    />
                    <Route 
                        path="/venues" 
                        element={isAuthenticated ? <Venues /> : <Navigate to="/auth" />} 
                    />
                    <Route 
                        path="/matches" 
                        element={isAuthenticated ? <Matches /> : <Navigate to="/auth" />} 
                    />
                    <Route 
                        path="/score-manager/:matchId" 
                        element={isAuthenticated ? <ScoreManager /> : <Navigate to="/auth" />} 
                    />
                </Routes>
            </main>
            {showFooter && <Footer className="mt-auto" />}
        </div>
    );
}

// Main App component
function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
