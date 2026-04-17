import React, { useState, useEffect, useContext } from 'react';
import { Atom } from 'react-loading-indicators';
import { useParams } from 'react-router';
import { getCategoryLabel, getStatusInfo } from '../catagory/Catagory';
import { HiMiniBellSnooze } from 'react-icons/hi2';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaArchive } from 'react-icons/fa';
import { FiPhone, FiMessageSquare, FiVideo, FiEdit2, FiClock } from 'react-icons/fi';
import { ContactsFriendProviderContext } from '../../contest/ContactFriendProviderContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const FriendesDetails = () => {
    const { id } = useParams();
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { addInteraction, interactions } = useContext(ContactsFriendProviderContext);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch("/friends.json");
                const data = await response.json();
                setFriends(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchFriends();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
                <Atom color="#10b981" size="medium" text="Loading..." textColor="#10b981" />
            </div>
        );
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    const friend = friends.find(f => f.id === parseInt(id));

    const handleContact = (type) => {
        addInteraction(friend, type);
        toast.success(`${type} with ${friend.name} added to Timeline!`);
    };

    const friendInteractions = interactions.filter(
        (item) => item.friendId === friend.id
    );

    return (
        <div>
            <Helmet>
                <title>Friend Details</title>
                <meta name="description" content={`View details and interactions with ${friend.name}`} />
            </Helmet>

            
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 p-5 min-h-screen bg-gray-50 container mx-auto">

                {/* Left Column */}
                <div className="flex flex-col gap-3">
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center gap-2 shadow-sm">
                        <img
                            src={friend.picture}
                            alt={friend.name}
                            className="w-18 h-18 rounded-full object-cover border-2 border-gray-200"
                            style={{ width: 72, height: 72 }}
                        />
                        <p className="text-lg font-semibold text-gray-800">{friend.name}</p>
                        <span className={`text-xs font-medium rounded-full px-3 py-1 ${getStatusInfo(friend.status).color}`}>
                            {getStatusInfo(friend.status).label}
                        </span>

                        <div className="flex flex-wrap justify-center gap-2">
                            {friend.tags.map((tag, i) => (
                                <span key={i} className="text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full px-3 py-1">
                                    {getCategoryLabel(tag)}
                                </span>
                            ))}
                        </div>

                        {friend.note && <p className="text-xs text-gray-400 italic text-center">"{friend.note}"</p>}
                        {friend.preferred && <p className="text-xs text-gray-400">Preferred: {friend.preferred}</p>}
                        <p className="text-sm text-gray-500 text-center">{friend.bio}</p>
                        <p className="text-sm text-gray-500 text-center">Preferd:{friend.email}</p>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                        <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition">
                            <HiMiniBellSnooze /> Snooze 2 Weeks
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition">
                            <FaArchive /> Archive
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition">
                            <AiOutlineDelete /> Delete
                        </button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-3">

                   
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm">
                            <span className="font-semibold text-teal-700 text-3xl">{friend.days_since_contact || 0}</span>
                            <span className="text-sm text-gray-500">Days Since Contact</span>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm">
                            <span className="font-semibold text-teal-700 text-3xl">{friend.goal || 30}</span>
                            <span className="text-sm text-gray-500">Goal (Days)</span>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-center items-center gap-1 shadow-sm">
                            <p className="font-semibold text-teal-700 text-2xl">{friend.next_due_date}</p>
                            <p className="text-sm text-gray-500">Next Due</p>
                        </div>
                    </div>

                    
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-semibold text-gray-800">Relationship Goal</h3>
                            <button className="text-xs border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-50 flex items-center gap-1">
                                <FiEdit2 size={11} /> Edit
                            </button>
                        </div>
                        <p className="text-sm text-gray-500">
                            Connect every <strong className="text-gray-800 font-semibold">{friend.goal || 30} days</strong>
                        </p>
                    </div>

                    
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Check-In</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            <button
                                onClick={() => handleContact('Call')}
                                className="border border-gray-100 bg-gray-100 rounded-2xl py-6 flex flex-col items-center gap-2 text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 active:bg-emerald-100 transition-all active:scale-95"
                            >
                                <FiPhone size={22} />
                                Call
                            </button>

                            <button
                                onClick={() => handleContact('Text')}
                                className="border border-gray-100 bg-gray-100 rounded-2xl py-6 flex flex-col items-center gap-2 text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 active:bg-emerald-100 transition-all active:scale-95"
                            >
                                <FiMessageSquare size={22} />
                                Text
                            </button>

                            <button
                                onClick={() => handleContact('Video')}
                                className="border border-gray-100 bg-gray-100 rounded-2xl py-6 flex flex-col items-center gap-2 text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 active:bg-emerald-100 transition-all active:scale-95"
                            >
                                <FiVideo size={22} />
                                Video
                            </button>
                        </div>
                    </div>

                    
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-semibold text-gray-800">Recent Interactions</h3>
                            <button className="text-xs border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-50 flex items-center gap-1 text-gray-500">
                                <FiClock size={11} /> Full History
                            </button>
                        </div>

                        {friendInteractions.length === 0 ? (
                            <p className="text-sm text-gray-400 text-center py-4">No interactions yet</p>
                        ) : (
                            friendInteractions.map((item) => (
                                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <span className="w-9 h-9 flex items-center justify-center text-xl">{item.icon}</span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{item.type}</p>
                                            <p className="text-xs text-gray-400">{item.date}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">{item.date}</span>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FriendesDetails;