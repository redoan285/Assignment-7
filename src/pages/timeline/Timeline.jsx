
import React, { useContext } from 'react';
// import { ContactsFriendProviderContext } from '../../contest/ContactsFriendProviderContext';
import { ContactsFriendProviderContext } from '../../contest/ContactFriendProviderContext';
import { MdAddIcCall, MdOutlineTextsms } from 'react-icons/md';
import { FcVideoCall } from 'react-icons/fc';

const Timeline = () => {
    const { interactions } = useContext(ContactsFriendProviderContext);
    
    

    const getIcon = (type) => {
        if (type === 'Call') return  <MdAddIcCall />;
        if (type === 'Text') return <MdOutlineTextsms />;
        if (type === 'Video') return <FcVideoCall />;
        
    };

    

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-3xl font-bold text-gray-800">Timeline</h1>
                    <p className="text-gray-500 mt-1">Your recent interactions</p>
                </div>

                {interactions.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-400 text-lg">No interactions yet</p>
                        <p className="text-sm text-gray-500 mt-2">Click Call, Text or Video from friend details</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {interactions.map((item) => (
                            <div
                                key={item.id}
                                className="p-5 hover:bg-gray-50 transition flex items-center gap-4"
                            >
                                <div className="w-12 h-12 flex items-center justify-center text-3xl bg-gray-100 rounded-2xl">
                                    {getIcon(item.type)}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">
                                        {item.type} with {item.friendName}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-0.5">{item.date}</p>
                                </div>
                                <div className="text-xs text-gray-400 font-medium">
                                    {item.type}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Timeline;



























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





            //    2 part 

// import React, { useContext } from 'react';
// import { ContactsFriendProviderContext } from '../../contest/ContactFriendProvider';

// const Timeline = () => {
//     const { interactions } = useContext(ContactsFriendProviderContext);

//     const getIcon = (type) => {
//         if (type === 'Call') return '📞';
//         if (type === 'Text') return '💬';
//         if (type === 'Video') return '🎥';
//         return '🤝';
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
//             <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
//                 <div className="p-6 border-b border-gray-100">
//                     <h1 className="text-3xl font-bold text-gray-800">Timeline</h1>
//                     <p className="text-gray-500 mt-1">Your recent interactions</p>
//                 </div>

//                 {interactions.length === 0 ? (
//                     <div className="p-12 text-center">
//                         <p className="text-gray-400 text-lg">No interactions yet</p>
//                         <p className="text-sm text-gray-500 mt-2">Click Call, Text or Video from friend details</p>
//                     </div>
//                 ) : (
//                     <div className="divide-y divide-gray-100">
//                         {interactions.map((item) => (
//                             <div key={item.id} className="p-5 hover:bg-gray-50 transition flex items-center gap-4">
//                                 <div className="w-12 h-12 flex items-center justify-center text-3xl bg-gray-100 rounded-2xl">
//                                     {getIcon(item.type)}
//                                 </div>
//                                 <div className="flex-1">
//                                     <p className="font-semibold text-gray-800">
//                                         {item.type} with {item.friendName}
//                                     </p>
//                                     <p className="text-sm text-gray-500 mt-0.5">{item.date}</p>
//                                 </div>
//                                 <div className="text-xs text-gray-400 font-medium">
//                                     {item.type}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Timeline;











            // 3d part



// import React, { useContext } from 'react';
// import { ContactsFriendProviderContext } from '../../contest/ContactFriendProvider';

// const Timeline = () => {
//     const { interactions } = useContext(ContactsFriendProviderContext);

//     const getIcon = (type) => {
//         if (type === 'Call') return '📞';
//         if (type === 'Text') return '💬';
//         if (type === 'Video') return '🎥';
//         return '🤝';
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
//             <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
//                 <div className="p-6 border-b border-gray-100">
//                     <h1 className="text-3xl font-bold text-gray-800">Timeline</h1>
//                     <p className="text-gray-500 mt-1">Your recent interactions</p>
//                 </div>

//                 {interactions.length === 0 ? (
//                     <div className="p-12 text-center">
//                         <p className="text-gray-400 text-lg">No interactions yet</p>
//                         <p className="text-sm text-gray-500 mt-2">Click Call, Text or Video from friend details</p>
//                     </div>
//                 ) : (
//                     <div className="divide-y divide-gray-100">
//                         {interactions.map((item) => (
//                             <div
//                                 key={item.id}
//                                 className="p-5 hover:bg-gray-50 transition flex items-center gap-4"
//                             >
//                                 <div className="w-12 h-12 flex items-center justify-center text-3xl bg-gray-100 rounded-2xl">
//                                     {getIcon(item.type)}
//                                 </div>
//                                 <div className="flex-1">
//                                     <p className="font-semibold text-gray-800">
//                                         {item.type} with {item.friendName}
//                                     </p>
//                                     <p className="text-sm text-gray-500 mt-0.5">{item.date}</p>
//                                 </div>
//                                 <div className="text-xs text-gray-400 font-medium">
//                                     {item.type}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Timeline;














