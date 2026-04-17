import React, {  useEffect, useState } from 'react';
import FriendsCards from './FriendsCards';
import { OrbitProgress } from 'react-loading-indicators';
import FriendesDetails from '../../pages/friendsDetais/FriendesDetails';

// const firendsPromise = fetch("/friends.json").then(res => res.json());
// const friends = await firendsPromise;
// console.log(friends, "friends data from promise");
{/* <FriendesDetails data={friends} /> */}


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

//   <FriendesDetails data={friends} />
//   console.log(friends);
     
    return (
        <div className='flex  flex-col items-start space-y-4  bg-gray-50 gap-4 container mx-auto'>
            <h1 className='text-2xl font-bold ml-3'>Your Friends</h1>
            {loading ? (
                <p className="mx-auto text-center"><OrbitProgress  color="#32cd32" size="medium" text="" textColor="" /></p>
            ) : (
                <div className="card  grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4  p-6 container mx-auto ">
                    {friends.map((friend) => (
                        <FriendsCards key={friend.id} data={friend} />
                        //  <FriendesDetails key={friend.id} data={friend} />
                        
                    ))}
                </div>
            )}
        </div>

    
    );
};

export default AllFriends;