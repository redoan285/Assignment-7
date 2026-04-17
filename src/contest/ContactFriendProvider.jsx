

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

