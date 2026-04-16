import { createContext } from "react";

export const ContactsFriendProviderContext = createContext();




































// import { createContext } from "react";


// export 
// const ContactsFriendProviderContext = createContext();
// // console.log(ContactsFriendProviderContext);




// import { createContext, useState } from "react";

// // Context তৈরি
// export const ContactsFriendProviderContext = createContext();

// // Provider কম্পোনেন্ট
// export const ContactFriendProvider = ({ children }) => {
//     const [contactFriend, setContactFriend] = useState([]);
//     const [interactions, setInteractions] = useState([]);

//     // নতুন Interaction যোগ করার ফাংশন
//     const addInteraction = (friend, type) => {
//         const newInteraction = {
//             id: Date.now(),
//             friendId: friend.id,
//             friendName: friend.name,
//             type: type,
//             date: new Date().toLocaleDateString('en-US', {
//                 month: 'long',
//                 day: 'numeric',
//                 year: 'numeric'
//             }),
//             icon: type === 'Call' ? '📞' :
//                 type === 'Text' ? '💬' :
//                     type === 'Video' ? '🎥' : '🤝'
//         };

//         setInteractions(prev => [newInteraction, ...prev]);
//     };

//     // Context value
//     const value = {
//         contactFriend,
//         setContactFriend,
//         interactions,
//         setInteractions,
//         addInteraction,
//     };

//     return (
//         <ContactsFriendProviderContext.Provider value={value}>
//             {children}
//         </ContactsFriendProviderContext.Provider>
//     );
// };

// export default ContactFriendProvider;














