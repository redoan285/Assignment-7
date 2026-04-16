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

const FriendesDetails = () => {
    const { id } = useParams();
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Context থেকে addInteraction এবং interactions উভয়ই নিন
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

    // if (!friend) {
    //     return (
    //         <div className="text-center py-32">
    //             <div className="text-7xl mb-6">😔</div>
    //             <h2 className="text-3xl font-semibold text-gray-700">Friend Not Found</h2>
    //         </div>
    //     );
    // }

    const handleContact = (type) => {
    addInteraction(friend, type);
    toast.success(`${type} with ${friend.name} added to Timeline!`);
};

    // বর্তমান friend এর জন্য interactions ফিল্টার করুন
    const friendInteractions = interactions.filter(
        (item) => item.friendId === friend.id
    );

    return (
        <div className="grid grid-cols-[260px_1fr] gap-4 p-5 min-h-screen bg-gray-50 container mx-auto">
            {/* Left Column - Profile Card */}
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
                </div>

                {/* Actions */}
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
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm">
                        <span className="font-semibold text-teal-700 text-3xl">{friend.days_since_contact || 0}</span>
                        <span className="text-sm text-gray-500">Days Since Contact</span>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm">
                        <span className="font-semibold text-teal-700 text-3xl">{friend.goal || 30}</span>
                        <span className="text-sm text-gray-500">Goal (Days)</span>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-center items-center gap-1 shadow-sm">
                        {/* <span className="font-semibold text-teal-700 text-lg">{friend.goal - (friend.next_due_date || 0)}</span>
                        <span className="text-sm text-gray-500">Next Due</span> */}
                        <p className="font-semibold text-teal-700 text-2xl">{friend.next_due_date}</p>
                        <p className="text-sm text-gray-500">Next Due</p>
                    </div>
                </div>

                {/* Relationship Goal */}
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

                {/* Quick Check-In */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Check-In</h3>
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            onClick={() => handleContact('Call')}
                            className="border border-gray-100 rounded-2xl py-6 flex flex-col items-center gap-2 text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 active:bg-emerald-100 transition-all active:scale-95"
                        >
                            <FiPhone size={22} />
                            Call
                        </button>
                        <button
                            onClick={() => handleContact('Text')}
                            className="border border-gray-100 rounded-2xl py-6 flex flex-col items-center gap-2 text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 active:bg-emerald-100 transition-all active:scale-95"
                        >
                            <FiMessageSquare size={22} />
                            Text
                        </button>
                        <button
                            onClick={() => handleContact('Video')}
                            className="border border-gray-100 rounded-2xl py-6 flex flex-col items-center gap-2 text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 active:bg-emerald-100 transition-all active:scale-95"
                        >
                            <FiVideo size={22} />
                            Video
                        </button>
                    </div>
                </div>

                {/* Recent Interactions */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-semibold text-gray-800">Recent Interactions</h3>
                        <button className="text-xs border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-50 flex items-center gap-1 text-gray-500">
                            <FiClock size={11} /> Full History
                        </button>
                    </div>
                    <div>
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






































// import React, { useState, useEffect, useContext } from 'react';
// import { Atom } from 'react-loading-indicators';
// import { useParams } from 'react-router';
// import { getCategoryLabel, getStatusInfo } from '../catagory/Catagory';
// import { HiMiniBellSnooze } from 'react-icons/hi2';
// import { AiOutlineDelete } from 'react-icons/ai';
// import { FaArchive } from 'react-icons/fa';
// import { FiPhone, FiMessageSquare, FiVideo, FiEdit2, FiClock } from 'react-icons/fi';
// import { ContactsFriendProviderContext } from '../../contest/ContactFriendProviderContext';

// const FriendesDetails = () => {
//     const { id } = useParams();
//     const [friends, setFriends] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchFriends = async () => {
//             try {
//                 const response = await fetch("/friends.json");
//                 const data = await response.json();
//                 setFriends(data);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };
//         fetchFriends();
//     }, []);

    
//     const {contactFriend, setContactFriend} = useContext(ContactsFriendProviderContext);

//     const handleContactFriend = () => {
//             setContactFriend([...contactFriend, friend]);
//             alert(`Contacting ${friend.name}`);
//         }
//         // console.log(contactFriend, "contact friend");

//     if (loading) {
//         return (
//             <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
//                 <Atom color="#10b981" size="medium" text="Loading..." textColor="#10b981" />
//             </div>
//         );
//     }

//     if (error) {
//         return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
//     }

//     const friend = friends.find(f => f.id === parseInt(id));

//     if (!friend) {
//         return (
//             <div className="text-center py-32">
//                 <div className="text-7xl mb-6">😔</div>
//                 <h2 className="text-3xl font-semibold text-gray-700">Friend Not Found</h2>
//             </div>
//         );
//     }

//     const interactions = [
//         { type: 'Text', icon: <FiMessageSquare />, note: 'Asked for career advice', date: 'Jan 28, 2026' },
//         { type: 'Meetup', icon: <FiPhone />, note: 'Industry conference meetup', date: 'Jan 28, 2026' },
//         { type: 'Video', icon: <FiVideo />, note: 'Asked for career advice', date: 'Jan 28, 2026' },
//         { type: 'Text', icon: <FiMessageSquare />, note: 'Asked for career advice', date: 'Jan 28, 2026' },
//     ];

        

//     return (
//         <div className="grid grid-cols-[260px_1fr] gap-4 p-5 min-h-screen bg-gray-50 container mx-auto">

//             {/* ── Left Column ── */}
//             <div className="flex flex-col gap-3">

//                 {/* Profile Card */}
//                 <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center gap-2 shadow-sm">
//                     <img
//                         src={friend.picture}
//                         alt={friend.name}
//                         className="w-18 h-18 rounded-full object-cover border-2 border-gray-200"
//                         style={{ width: 72, height: 72 }}
//                     />
//                     <p className="text-lg font-semibold text-gray-800">{friend.name}</p>
//                     <span className={`text-xs font-medium rounded-full px-3 py-1 ${getStatusInfo(friend.status).color}`}>
//                         {getStatusInfo(friend.status).label}
//                     </span>
//                     <div className="flex flex-wrap justify-center gap-2">
//                         {friend.tags.map((tag, i) => (
//                             <span key={i} className="text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full px-3 py-1">
//                                 {getCategoryLabel(tag)}
//                             </span>
//                         ))}
//                     </div>
//                     {friend.note && <p className="text-xs text-gray-400 italic text-center">"{friend.note}"</p>}
//                     {friend.preferred && <p className="text-xs text-gray-400">Preferred: {friend.preferred}</p>}
//                     <p className="text-sm text-gray-500 text-center">{friend.bio}</p>
//                 </div>

//                 {/* Actions */}
//                 <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
//                     <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition">
//                         <HiMiniBellSnooze /> Snooze 2 Weeks
//                     </button>
//                     <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition">
//                         <FaArchive /> Archive
//                     </button>
//                     <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition">
//                         <AiOutlineDelete /> Delete
//                     </button>
//                 </div>
//             </div>

//             {/* ── Right Column ── */}
//             <div className="flex flex-col gap-3">

                // {/* Stats Row */}
                // <div className="grid grid-cols-3 gap-3">
                //     {[
                //         { num: `${friend.days_since_contact}`, label: 'Days Since Contact' },
                //         { num: `${friend.goal}`, label: 'Goal (Days)' },
                //         { num: `${friend.days_since_contact}`, label: 'Next Due', small: true },
                //     ].map((s, i) => (
                //         <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm">
                //             <span className={`font-semibold text-teal-700 ${s.small ? 'text-lg' : 'text-3xl'}`}>{s.num}</span>
                //             <span className="text-sm text-gray-500">{s.label}</span>
                //         </div>
                //     ))}
                // </div>

                // {/* Relationship Goal */}
                // <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                //     <div className="flex justify-between items-center mb-3">
                //         <h3 className="text-sm font-semibold text-gray-800">Relationship Goal</h3>
                //         <button className="text-xs border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-50 flex items-center gap-1">
                //             <FiEdit2 size={11} /> Edit
                //         </button>
                //     </div>
                //     <p className="text-sm text-gray-500">Connect every <strong className="text-gray-800 font-semibold">30 days</strong></p>
                // </div>

//                 {/* Quick Check-In */}
//                 {/* <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"> */}
//                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Check-In</h3>
//                     {/* <div className="grid grid-cols-3 gap-3">
//                         {[
//                             // { icon: <FiPhone size={20} />, label: 'Call' },
//                             // { icon: <FiMessageSquare size={20} />, label: 'Text' },
//                             // { icon: <FiVideo size={20} />, label: 'Video' },
//                             <p><FiPhone size={20} />Call</p>,
//                             <p><FiMessageSquare size={20} />Text</p>,
//                             <p><FiVideo size={20} />Video</p>
//                         ].map((btn, i) => (
//                             <button key={i} className="border border-gray-100 rounded-2xl py-5 flex flex-col items-center gap-2 text-sm text-gray-500 hover:bg-gray-50 transition">
//                                 <span className="text-gray-600">{btn.icon}</span>
//                                 {btn.label}
//                             </button>
//                         ))}
//                     </div> */}
                    
//                 {/* </div> */}

//                 {/* Quick Check-In */}
// <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
//     <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Check-In</h3>
   
//     <div className="grid grid-cols-3 gap-3">
//         <button
//             // onClick={() => alert(`Calling ${friend.name}...`)}
//             onClick={handleContactFriend}
//             className="border border-gray-100 rounded-2xl py-6 flex flex-col items-center gap-2 text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 active:bg-emerald-100 transition-all active:scale-95"
//         >
//             <FiPhone size={22} />
//             Call
//         </button>

//         <button
//             // onClick={() => alert(`Opening message for ${friend.name}...`)}
//             onClick={handleContactFriend}
//             className="border border-gray-100 rounded-2xl py-6 flex flex-col items-center gap-2 text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 active:bg-emerald-100 transition-all active:scale-95"
//         >
//             <FiMessageSquare size={22} />
//             Text
//         </button>

//         <button
//             // onClick={() => alert(`Starting video call with ${friend.name}...`)}
//             onClick={handleContactFriend}
//             className="border border-gray-100 rounded-2xl py-6 flex flex-col items-center gap-2 text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 active:bg-emerald-100 transition-all active:scale-95"
//         >
//             <FiVideo size={22} />
//             Video
//         </button>
//     </div>
// </div>

            //     {/* Recent Interactions */}
            //     <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            //         <div className="flex justify-between items-center mb-3">
            //             <h3 className="text-sm font-semibold text-gray-800">Recent Interactions</h3>
            //             <button className="text-xs border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-50 flex items-center gap-1 text-gray-500">
            //                 <FiClock size={11} /> Full History
            //             </button>
            //         </div>
            //         <div>
            //             {interactions.map((item, i) => (
            //                 <div key={i} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
            //                     <div className="flex items-center gap-3">
            //                         <span className="w-9 h-9 flex items-center justify-center text-gray-500">{item.icon}</span>
            //                         <div>
            //                             <p className="text-sm font-medium text-gray-800">{item.type}</p>
            //                             <p className="text-xs text-gray-400">{item.note}</p>
            //                         </div>
            //                     </div>
            //                     <span className="text-xs text-gray-400">{item.date}</span>
            //                 </div>
            //             ))}
            //         </div>
            //     </div>

            // </div>
//         </div>
//     );
// };

// export default FriendesDetails;


















// import React, { useState, useEffect, useContext } from 'react';
// import { Atom } from 'react-loading-indicators';
// import { useParams } from 'react-router';
// import { getCategoryLabel, getStatusInfo } from '../catagory/Catagory';
// import { HiMiniBellSnooze } from 'react-icons/hi2';
// import { AiOutlineDelete } from 'react-icons/ai';
// import { FaArchive } from 'react-icons/fa';
// import { FiPhone, FiMessageSquare, FiVideo, FiEdit2, FiClock } from 'react-icons/fi';

// // import { ContactsFriendProviderContext } from '../../contest/ContactFriendProviderContext';
// import { ContactsFriendProviderContext } from '../../contest/ContactFriendProvider';

// const FriendesDetails = () => {
//     const { id } = useParams();
//     const [friends, setFriends] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const { addInteraction } = useContext(ContactsFriendProviderContext);   // ← Context থেকে নেওয়া
    

//     useEffect(() => {
//         const fetchFriends = async () => {
//             try {
//                 const response = await fetch("/friends.json");
//                 const data = await response.json();
//                 setFriends(data);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };
//         fetchFriends();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
//                 <Atom color="#10b981" size="medium" text="Loading..." textColor="#10b981" />
//             </div>
//         );
//     }

//     if (error) {
//         return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
//     }

//     const friend = friends.find(f => f.id === parseInt(id));

//     if (!friend) {
//         return (
//             <div className="text-center py-32">
//                 <div className="text-7xl mb-6">😔</div>
//                 <h2 className="text-3xl font-semibold text-gray-700">Friend Not Found</h2>
//             </div>
//         );
//     }

//     // Handle Contact (Call / Text / Video)
//     const handleContact = (type) => {
//         addInteraction(friend, type);
//         alert(`${type} with ${friend.name} added to Timeline!`);
//     };

//     return (
//         <div className="grid grid-cols-[260px_1fr] gap-4 p-5 min-h-screen bg-gray-50 container mx-auto">

//             {/* Left Column - Profile Card & Actions (এখানে কোনো পরিবর্তন করিনি) */}
//             <div className="flex flex-col gap-3">
//                 {/* Profile Card */}
//                 <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center gap-2 shadow-sm">
//                     <img
//                         src={friend.picture}
//                         alt={friend.name}
//                         className="w-18 h-18 rounded-full object-cover border-2 border-gray-200"
//                         style={{ width: 72, height: 72 }}
//                     />
//                     <p className="text-lg font-semibold text-gray-800">{friend.name}</p>
//                     <span className={`text-xs font-medium rounded-full px-3 py-1 ${getStatusInfo(friend.status).color}`}>
//                         {getStatusInfo(friend.status).label}
//                     </span>
//                     <div className="flex flex-wrap justify-center gap-2">
//                         {friend.tags.map((tag, i) => (
//                             <span key={i} className="text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full px-3 py-1">
//                                 {getCategoryLabel(tag)}
//                             </span>
//                         ))}
//                     </div>
//                     {friend.note && <p className="text-xs text-gray-400 italic text-center">"{friend.note}"</p>}
//                     {friend.preferred && <p className="text-xs text-gray-400">Preferred: {friend.preferred}</p>}
//                     <p className="text-sm text-gray-500 text-center">{friend.bio}</p>
//                 </div>

//                 {/* Actions */}
//                 <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
//                     <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition">
//                         <HiMiniBellSnooze /> Snooze 2 Weeks
//                     </button>

//                     <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition">
//                         <FaArchive /> Archive
//                     </button>
                    
//                     <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition">
//                         <AiOutlineDelete /> Delete
//                     </button>
//                 </div>
//             </div>

//             {/* Right Column */}
//             <div className="flex flex-col gap-3">

//                 {/* Stats Row & Relationship Goal (এখানে কোনো পরিবর্তন করিনি) */}
//                 {/* ... (আগের কোড যেমন ছিল তেমন রাখা হয়েছে) */}

//                 {/* Quick Check-In - Updated */}
//                 <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
//                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Check-In</h3>
                    
//                     <div className="grid grid-cols-3 gap-3">
//                         <button
//                             onClick={() => handleContact('Call')}
//                             className="border border-gray-100 rounded-2xl py-6 flex flex-col items-center gap-2 text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 active:bg-emerald-100 transition-all active:scale-95"
//                         >
//                             <FiPhone size={22} />
//                             Call
//                         </button>

//                         <button
//                             onClick={() => handleContact('Text')}
//                             className="border border-gray-100 rounded-2xl py-6 flex flex-col items-center gap-2 text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 active:bg-emerald-100 transition-all active:scale-95"
//                         >
//                             <FiMessageSquare size={22} />
//                             Text
//                         </button>

//                         <button
//                             onClick={() => handleContact('Video')}
//                             className="border border-gray-100 rounded-2xl py-6 flex flex-col items-center gap-2 text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 active:bg-emerald-100 transition-all active:scale-95"
//                         >
//                             <FiVideo size={22} />
//                             Video
//                         </button>
//                     </div>
//                 </div>

//                 {/* Recent Interactions - এখানে রাখতে পারো, কিন্তু Timeline পেজ আলাদা */}

//             </div>
//         </div>
//     );
// };

// export default FriendesDetails;
















// import React, { useState, useEffect, useContext } from 'react';
// import { Atom } from 'react-loading-indicators';
// import { useParams } from 'react-router';
// import { getCategoryLabel, getStatusInfo } from '../catagory/Catagory';
// import { HiMiniBellSnooze } from 'react-icons/hi2';
// import { AiOutlineDelete } from 'react-icons/ai';
// import { FaArchive } from 'react-icons/fa';
// import { FiPhone, FiMessageSquare, FiVideo } from 'react-icons/fi';
// import { ContactsFriendProviderContext } from '../../contest/ContactFriendProvider';

// const FriendesDetails = () => {
//     const { id } = useParams();
//     const [friends, setFriends] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const { addInteraction } = useContext(ContactsFriendProviderContext);

//     useEffect(() => {
//         const fetchFriends = async () => {
//             try {
//                 const response = await fetch("/friends.json");
//                 const data = await response.json();
//                 setFriends(data);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };
//         fetchFriends();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
//                 <Atom color="#10b981" size="medium" text="Loading..." textColor="#10b981" />
//             </div>
//         );
//     }

//     if (error) {
//         return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
//     }

//     const friend = friends.find(f => f.id === parseInt(id));

//     if (!friend) {
//         return (
//             <div className="text-center py-32">
//                 <div className="text-7xl mb-6">😔</div>
//                 <h2 className="text-3xl font-semibold text-gray-700">Friend Not Found</h2>
//             </div>
//         );
//     }

//     const handleContact = (type) => {
//         addInteraction(friend, type);
//         alert(`${type} with ${friend.name} added to Timeline!`);
//     };

//     return (
//         <div className="grid grid-cols-[260px_1fr] gap-4 p-5 min-h-screen bg-gray-50 container mx-auto">
//             {/* Left Column - Profile Card */}
//             <div className="flex flex-col gap-3">
//                 <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center gap-2 shadow-sm">
//                     <img
//                         src={friend.picture}
//                         alt={friend.name}
//                         className="w-18 h-18 rounded-full object-cover border-2 border-gray-200"
//                         style={{ width: 72, height: 72 }}
//                     />
//                     <p className="text-lg font-semibold text-gray-800">{friend.name}</p>
//                     <span className={`text-xs font-medium rounded-full px-3 py-1 ${getStatusInfo(friend.status).color}`}>
//                         {getStatusInfo(friend.status).label}
//                     </span>
//                     <div className="flex flex-wrap justify-center gap-2">
//                         {friend.tags.map((tag, i) => (
//                             <span key={i} className="text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full px-3 py-1">
//                                 {getCategoryLabel(tag)}
//                             </span>
//                         ))}
//                     </div>
//                     {friend.note && <p className="text-xs text-gray-400 italic text-center">"{friend.note}"</p>}
//                     {friend.preferred && <p className="text-xs text-gray-400">Preferred: {friend.preferred}</p>}
//                     <p className="text-sm text-gray-500 text-center">{friend.bio}</p>
//                 </div>

//                 {/* Actions */}
//                 <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
//                     <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition">
//                         <HiMiniBellSnooze /> Snooze 2 Weeks
//                     </button>
//                     <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition">
//                         <FaArchive /> Archive
//                     </button>
//                     <button className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition">
//                         <AiOutlineDelete /> Delete
//                     </button>
//                 </div>
//             </div>

//             {/* Right Column */}
//             <div className="flex flex-col gap-3">
//                 {/* Quick Check-In */}
//                 <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
//                     <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Check-In</h3>
//                     <div className="grid grid-cols-3 gap-3">
//                         <button
//                             onClick={() => handleContact('Call')}
//                             className="border border-gray-100 rounded-2xl py-6 flex flex-col items-center gap-2 text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 active:bg-emerald-100 transition-all active:scale-95"
//                         >
//                             <FiPhone size={22} />
//                             Call
//                         </button>
//                         <button
//                             onClick={() => handleContact('Text')}
//                             className="border border-gray-100 rounded-2xl py-6 flex flex-col items-center gap-2 text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 active:bg-emerald-100 transition-all active:scale-95"
//                         >
//                             <FiMessageSquare size={22} />
//                             Text
//                         </button>
//                         <button
//                             onClick={() => handleContact('Video')}
//                             className="border border-gray-100 rounded-2xl py-6 flex flex-col items-center gap-2 text-sm text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 active:bg-emerald-100 transition-all active:scale-95"
//                         >
//                             <FiVideo size={22} />
//                             Video
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FriendesDetails;












