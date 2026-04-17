import React, { useContext } from 'react';
import { ContactsFriendProviderContext } from '../../contest/ContactFriendProviderContext';
import { MdAddIcCall, MdOutlineTextsms } from 'react-icons/md';
import { FcVideoCall } from 'react-icons/fc';
import { Helmet } from 'react-helmet-async';
import { Atom } from 'react-loading-indicators';  

const Timeline = () => {
    const { interactions } = useContext(ContactsFriendProviderContext);
    console.log(interactions);

    const getIcon = (type) => {
        if (type === 'Call') return <MdAddIcCall className="text-2xl" />;
        if (type === 'Text') return <MdOutlineTextsms className="text-2xl" />;
        if (type === 'Video') return <FcVideoCall className="text-2xl" />;
        return null;
    };

    if (!interactions) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
                <Atom color="#10b981" size="medium" text="Loading interactions..." textColor="#10b981" />
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Timeline - My Interactions</title>
                <meta name="description" content="View all your recent interactions with friends" />
            </Helmet>

            
            <div className="min-h-screen bg-gray-50 py-6 container mx-auto">
                <div className="max-w-2xl mx-auto px-6">
                    <div className="bg-gray-50    overflow-hidden">
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
                            // <div className="divide-y divide-gray-100 gap">
                            <div className="space-y-4">
                                {interactions.map((item) => (
                                    <div
    key={item.id}
    className="p-5 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition flex items-center gap-4"
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
            </div>
        </>
    );
};

export default Timeline;

