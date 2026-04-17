

import { useState } from "react";
// import { ContactsFriendProviderContext } from "./ContactsFriendProviderContext";
import { ContactsFriendProviderContext } from "./ContactFriendProviderContext";
import { FcVideoCall } from "react-icons/fc";
import { MdAddIcCall, MdOutlineTextsms } from "react-icons/md";

export const ContactFriendProvider = ({ children }) => {
    const [contactFriend, setContactFriend] = useState([]);
    const [interactions, setInteractions] = useState([]);

    const addInteraction = (friend, type) => {
        const newInteraction = {
            id: Date.now(),
            friendId: friend.id,
            friendName: friend.name,
            type: type,
            date: new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            }),
            icon: type === 'Call' ? <MdAddIcCall /> :
                type === 'Text' ? <MdOutlineTextsms /> :
                    type === 'Video' ? <FcVideoCall /> : '🤝'
        };
        setInteractions(prev => [newInteraction, ...prev]);
    };

    const value = {
        contactFriend,
        setContactFriend,
        interactions,
        setInteractions,
        addInteraction,
    };

    return (
        <ContactsFriendProviderContext.Provider value={value}>
            {children}
        </ContactsFriendProviderContext.Provider>
    );
};

export default ContactFriendProvider;
































// import React, { useState } from 'react';
// import {  ContactsFriendProviderContext } from './ContactFriendProviderContext';




// const ContactFriendProvider = ({ children }) => {

//     // console.log(children);
//     const [contactFriend, setContactFriend] = useState([]);  
//     const data = {
//         contactFriend,
//         setContactFriend

       
            
//     };

//     // console.log(data);
//     return (
//         <ContactsFriendProviderContext.Provider value={data}>
//             {children}
//         </ContactsFriendProviderContext.Provider>
//     );
// };

// export default ContactFriendProvider;













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










// import { useState } from "react";

// // Context তৈরি
// // export const ContactsFriendProviderContext = createContext();

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















