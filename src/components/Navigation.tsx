import React from 'react';
import { HomeIcon, PhoneIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { TruckIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

export const Navigation = () => {
    const navigate = useNavigate();

    const navItems = [
        { name: 'Home', icon: HomeIcon, path: '/' },
        { name: 'Cars', icon: TruckIcon, path: '/cars' },
        { name: 'About', icon: UserGroupIcon, path: '/about' },
        { name: 'Contact', icon: PhoneIcon, path: '/contact' },
    ];

    return (
        <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
                const Icon = item.icon;
                return (
                    <button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className="flex items-center space-x-1 text-white hover:text-teal-200 transition-colors"
                    >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                    </button>
                );
            })}
        </nav>
    );
};