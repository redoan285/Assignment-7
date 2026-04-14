import React, {  useEffect, useState } from 'react';
import FriendsCards from './FriendsCards';
import { OrbitProgress } from 'react-loading-indicators';

// const firendsPromise = fetch("/friends.json").then(res => res.json());

const AllFriends = () => {

    // const friends = use(firendsPromise); 
    // console.log(friends, "friends");

    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);   

    useEffect(() => {
        const fetchFriends = async () => {
            const res = await fetch("/friends.json");
            const data = await res.json();
            setFriends(data);
            setLoading(false); 
        }
        fetchFriends();
    }, []);


    return (
        <div className='flex  flex-col items-start space-y-4 pt-4 mt-4 gap-4 container mx-auto'>
            <h1 className='text-2xl font-bold'>Your Friends</h1>
            {loading ? (
                <p className="mx-auto text-center"><OrbitProgress  color="#32cd32" size="medium" text="" textColor="" /></p>
            ) : (
                <div className=" min-h-[70vh]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 container mx-auto ">
                    {friends.map((friend) => (
                        <FriendsCards key={friend.id} data={friend} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllFriends;