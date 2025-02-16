import React, { useState } from 'react';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'USER'
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setSuccess('Registration successful!');
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: 'USER'
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-teal-600 p-4">
            <div className="max-w-md mx-auto mt-20">
                <div className="bg-white rounded-lg p-8 shadow-lg">
                    <h2 className="text-3xl font-bold text-center mb-8">Create an Account</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div className="relative">
                            <EnvelopeIcon className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div className="relative">
                            <LockClosedIcon className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div className="relative">
                            <LockClosedIcon className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white p-4 rounded-lg hover:bg-teal-700 transition-colors"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};