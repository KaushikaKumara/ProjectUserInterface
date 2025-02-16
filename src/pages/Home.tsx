import React from 'react';
import { CarSearch } from '../components/CarSearch';
import { Header } from '../components/Header';

export const Home = () => {
  return (
    <div className="min-h-screen bg-teal-600 p-4">
      <Header />
      <CarSearch />
    </div>
  );
};