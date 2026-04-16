import React from 'react';
import { Link } from 'react-router';   // ← সঠিক import
import { getCategoryLabel, getStatusInfo } from '../../pages/catagory/Catagory'; // যদি আলাদা ফাইলে থাকে

const FriendsCards = ({ data }) => {
    
    return (
        <Link 
            to={`/${data.id}`} 
            className="block bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden"
        >
            <div className="flex flex-col items-center pt-6 pb-5 px-4 text-center">
                
                {/* Avatar */}
                <div className="w-20 h-20 mb-4">
                    <img
                        src={data.picture}
                        alt={data.name}
                        className="w-full h-full rounded-full object-cover border-2 border-white shadow"
                    />
                </div>

                {/* Name */}
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {data.name}
                </h2>

                {/* Time ago */}
                <p className="text-gray-500 text-sm mb-4">
                    {data.goal || '62'}d ago
                </p>

                {/* Category Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {data.tags?.map((tag, index) => (
                        <span 
                            key={index}
                            className="text-xs font-medium px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full"
                        >
                            {getCategoryLabel(tag)}
                        </span>
                    ))}
                </div>

                {/* Status Badge */}
                <div className={`text-xs font-semibold px-4 py-1.5 rounded-full ${getStatusInfo(data.status).color}`}>
                    {getStatusInfo(data.status).label}
                </div>

            </div>
        </Link>
    );
};

export default FriendsCards;