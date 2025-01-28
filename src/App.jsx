// 
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar'; // Import the Navbar component
import Login from './components/Auth/Login';
import LiveMatches from './components/LiveMatches/LiveMatches';
import CreateMatch from './components/Organizer/CreateMatch';
import ManageTeams from './components/Organizer/ManageTeams';
import Matches from './components/Matches/Matches';

// Wrapper to render Navbar with child routes
function ProtectedLayout({ children }) {
    const isAuthenticated = sessionStorage.getItem('token'); // Check if token exists

    if (!isAuthenticated) {
        return <Navigate to="/" replace />; // Redirect to login if not authenticated
    }

    return (
        <>
            <Navbar /> {/* Navbar is always displayed */}
            <main>{children}</main>
        </>
    );
}

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Login />} />

                {/* Protected routes */}
                <Route
                    path="/live-matches"
                    element={
                        <ProtectedLayout>
                            <LiveMatches />
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/create-match"
                    element={
                        <ProtectedLayout>
                            <CreateMatch />
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/manage-teams"
                    element={
                        <ProtectedLayout>
                            <ManageTeams />
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/matches"
                    element={
                        <ProtectedLayout>
                            <Matches />
                        </ProtectedLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
