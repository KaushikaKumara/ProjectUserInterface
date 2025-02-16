import React, { useState } from 'react';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'CUSTOMER'
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const errors: Record<string, string> = {};

        // Username validation
        if (formData.username.length < 3) {
            errors.username = 'Username must be at least 3 characters long';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear validation error when user starts typing
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
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

            if (response.ok) {
                const successMessage = await response.text();
                setSuccess(successMessage);
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    role: 'CUSTOMER'
                });
                return;
            }

            const contentType = response.headers.get("content-type");
            let errorMessage;

            if (contentType?.includes("application/json")) {
                const data = await response.json();
                errorMessage = data.message || 'Registration failed. Please try again.';
            } else {
                const text = await response.text();
                errorMessage = text || 'Registration failed. Please try again.';
            }

            setError(errorMessage);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const getInputClassName = (fieldName: string) => {
        return `w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 
                ${validationErrors[fieldName] ? 'border-red-500' : 'border-gray-300'}`;
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
                                className={getInputClassName('username')}
                            />
                            {validationErrors.username && (
                                <p className="mt-1 text-sm text-red-500">{validationErrors.username}</p>
                            )}
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
                                className={getInputClassName('email')}
                            />
                            {validationErrors.email && (
                                <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                            )}
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
                                className={getInputClassName('password')}
                            />
                            {validationErrors.password && (
                                <p className="mt-1 text-sm text-red-500">{validationErrors.password}</p>
                            )}
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
                                className={getInputClassName('confirmPassword')}
                            />
                            {validationErrors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">{validationErrors.confirmPassword}</p>
                            )}
                        </div>

                        <div>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="CUSTOMER">Customer</option>
                                <option value="MANAGER">Manager</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full p-4 rounded-lg text-white transition-colors
                                ${isLoading
                                ? 'bg-teal-400 cursor-not-allowed'
                                : 'bg-teal-600 hover:bg-teal-700'}`}
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};