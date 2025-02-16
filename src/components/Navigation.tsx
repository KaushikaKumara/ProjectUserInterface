import React from 'react';
import { HomeIcon, PhoneIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { TruckIcon } from '@heroicons/react/24/solid';

export const Navigation = () => {
    const navItems = [
        { name: 'Home', icon: HomeIcon },
        { name: 'Cars', icon: TruckIcon },
        { name: 'About', icon: UserGroupIcon },
        { name: 'Contact', icon: PhoneIcon },
    ];

    return (
        <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
                const Icon = item.icon;
                return (
                    <button
                        key={item.name}
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