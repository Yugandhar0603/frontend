import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import LiveMatches from './components/LiveMatches/LiveMatches';
import CreateMatch from './components/Organizer/CreateMatch';
import ManageTeams from './components/Organizer/ManageTeams';
import Matches from './components/Matches/Matches';
import ManageScore from './components/Organizer/ManageScore';
import Registration from './components/Auth/Registration';
import MyMatches from './components/Player/MyMatches';
import UserProfile from './components/UserProfile/UserProfile';
import ViewMatch from './components/Match/ViewMatch';

// Wrapper for protected routes with Navbar
function ProtectedLayout({ children }) {
    const isAuthenticated = sessionStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {children}
            </div>
        </div>
    );
}

// Wrapper for public routes (login/register) without Navbar
function PublicLayout({ children }) {
    const isAuthenticated = sessionStorage.getItem('token');

    if (isAuthenticated) {
        return <Navigate to="/live-matches" replace />;
    }

    return <div className="min-h-screen">{children}</div>;
}

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
                <Route path="/register" element={<PublicLayout><Registration /></PublicLayout>} />

                {/* Protected routes */}
                <Route path="/" element={<Navigate to="/live-matches" replace />} />
                <Route path="/live-matches" element={<ProtectedLayout><LiveMatches /></ProtectedLayout>} />
                <Route path="/create-match" element={<ProtectedLayout><CreateMatch /></ProtectedLayout>} />
                <Route path="/manage-teams" element={<ProtectedLayout><ManageTeams /></ProtectedLayout>} />
                <Route path="/manage-score" element={<ProtectedLayout><ManageScore /></ProtectedLayout>} />
                <Route path="/matches" element={<ProtectedLayout><Matches /></ProtectedLayout>} />
                <Route path="/score-manager/:matchId" element={<ProtectedLayout><ManageScore /></ProtectedLayout>} />
                <Route path="/my-matches" element={<ProtectedLayout><MyMatches /></ProtectedLayout>} />
                <Route path="/profile" element={<ProtectedLayout><UserProfile /></ProtectedLayout>} />
                <Route path="/view-match" element={<ProtectedLayout><ViewMatch /></ProtectedLayout>} />
            </Routes>
        </BrowserRouter>
    );
}
