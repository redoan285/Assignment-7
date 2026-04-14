import React, { useState, useEffect } from 'react';
import { Atom } from 'react-loading-indicators';
import { useParams } from 'react-router';

const FriendesDetails = () => {
    // ✅ প্রথমে সব Hooks ডাকুন
    const { id } = useParams();
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ useEffect-এর ভিতরে async অপারেশন করুন
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
    }, []); // খালি dependency array মানে শুধু মাউন্ট হলে চলবে

    // ✅ ডাটা লোড না হওয়া পর্যন্ত লোডিং দেখান
     // ✅ সুন্দর লোডিং UI
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <Atom 
                    color="#32cd32" 
                    size="medium" 
                    text="Loading friend details..." 
                    textColor="#32cd32"
                />
                <p className="mt-4 text-gray-600">Please wait while we fetch the data</p>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // const expectedFriend = friends.find(friend => friend.id === id);
    const expectedFriend = friends.find(friend => friend.id === parseInt(id));

    console.log(expectedFriend, "expected");

    // ✅ ডাটা এলে দেখান
    return (
        <div className='container mx-auto m-4'>
            
            {expectedFriend ? (
                <div className="card bg-base-100 w-96 shadow-sm rounded-lg border border-gray-200">
                    <div className="card-body">
                        <figure className="px-10 pt-10">

    <img

      src={expectedFriend.picture}

      alt={expectedFriend.name}

      className="rounded-full" />

  </figure>
                        <h2 className="card-title">{expectedFriend.name}</h2>
                        <p>Email: {expectedFriend.email}</p>
                        <p>Phone: {expectedFriend.phone}</p>
                    </div>
                </div>
            ) : (
                <p>Friend not found</p>
            )}

        </div>
    );
};

export default FriendesDetails;