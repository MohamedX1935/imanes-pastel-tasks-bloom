
import React from 'react';
import Header from '../components/Header';
import ProfilePage from '../components/ProfilePage';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-md">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Tasks</span>
        </Link>
        
        <ProfilePage />
      </div>
    </div>
  );
};

export default Profile;
