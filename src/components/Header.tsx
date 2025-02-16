import React from 'react';
import { Navigation } from './Navigation.js';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="flex justify-between items-center p-4 bg-teal-700 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
                <h1
                    onClick={() => navigate('/')}
                    className="text-white text-2xl font-bold cursor-pointer hover:text-teal-200 transition-colors"
                >
                    RENT A CAR
                </h1>
                <Navigation />
            </div>

            <div className="flex items-center space-x-4">
                <button className="md:hidden text-white">
                    <Bars3Icon className="h-6 w-6" />
                </button>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
                >
                    Sign In
                </button>
                <button
                    onClick={() => navigate('/register')}
                    className="bg-white text-teal-600 px-6 py-2 rounded-lg hover:bg-teal-100 transition-colors"
                >
                    Register
                </button>
            </div>
        </header>
    );
};