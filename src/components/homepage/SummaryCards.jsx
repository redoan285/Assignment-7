import React from 'react';

const SummaryCards = () => {
    return (
        <div className="grid grid-cols-4 gap-6">
            {/* Total Friends */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm">
                <span className="font-semibold text-teal-700 text-3xl">6</span>
                <span className="text-sm text-gray-500">Total Friends</span>
            </div>

            {/* On Track */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm">
                <span className="font-semibold text-teal-700 text-3xl">3</span>
                <span className="text-sm text-gray-500">On Track</span>
            </div>

            {/* Need Attention */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm">
                <span className="font-semibold text-teal-700 text-3xl">6</span>
                <span className="text-sm text-gray-500">Need Attention</span>
            </div>

            {/* Interactions This Month */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-1 shadow-sm">
                <span className="font-semibold text-teal-700 text-3xl">12</span>
                <span className="text-sm text-gray-500">Interactions This Month</span>
            </div>
        </div>
    );
};

export default SummaryCards;







// import React, { useContext } from 'react';

// import { ContactsFriendProviderContext } from '../../contest/ContactFriendProviderContext';


// const Timeline = () => {
//     const { contactFriend, setContactFriend } = useContext(ContactsFriendProviderContext);
//     console.log(contactFriend, setContactFriend, "timeline");
//     return (
//         <div>
//             {
//                 contactFriend?.map((friend)=> {
//                     return <div>
//                         <p className='text-lg text-gray-500'>with {friend.name}</p>
//                     </div>
//                 })
//             }
//                 <h1>Timeline</h1>
//         </div>
//     );
// };

// export default Timeline;