import React, { useContext, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ContactsFriendProviderContext } from '../../contest/ContactFriendProviderContext';

const Stats = () => {
    const { interactions } = useContext(ContactsFriendProviderContext);

    // interactions থেকে রিয়েল ডাটা ক্যালকুলেট করুন
    const chartData = useMemo(() => {
        if (!interactions || interactions.length === 0) {
            return [
                { name: 'Text', value: 0, color: '#7E35E1' },
                { name: 'Call', value: 0, color: '#244D3F' },
                { name: 'Video', value: 0, color: '#37A163' },
            ];
        }

        // টাইপ অনুযায়ী কাউন্ট করুন
        const textCount = interactions.filter(i => i.type === 'Text').length;
        const callCount = interactions.filter(i => i.type === 'Call').length;
        const videoCount = interactions.filter(i => i.type === 'Video').length;
        const total = interactions.length;

        return [
            { name: 'Text', value: total > 0 ? (textCount / total) * 100 : 0, count: textCount, color: '#7E35E1' },
            { name: 'Call', value: total > 0 ? (callCount / total) * 100 : 0, count: callCount, color: '#244D3F' },
            { name: 'Video', value: total > 0 ? (videoCount / total) * 100 : 0, count: videoCount, color: '#37A163' },
        ];
    }, [interactions]);

    // মোট interaction সংখ্যা
    const totalInteractions = interactions?.length || 0;

    return (
        <div className='flex flex-col  justify-center bg-gray-90 items-center h-full container mx-auto'>
            <h1 className='text-4xl font-bold font-black my-5 text-center'>Friendship Analytics</h1>
            
            {/* সামারি কার্ড */}
            {/* <div className='grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto'>
                <div className='bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100'>
                    <p className='text-3xl font-bold text-purple-600'>{totalInteractions}</p>
                    <p className='text-sm text-gray-500'>Total Interactions</p>
                </div>
                <div className='bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100'>
                    <p className='text-3xl font-bold text-green-600'>
                        {interactions?.filter(i => i.type === 'Call').length || 0}
                    </p>
                    <p className='text-sm text-gray-500'>📞 Calls</p>
                </div>
                <div className='bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100'>
                    <p className='text-3xl font-bold text-blue-600'>
                        {interactions?.filter(i => i.type === 'Text').length || 0}
                    </p>
                    <p className='text-sm text-gray-500'>💬 Texts</p>
                </div>
            </div> */}

            {/* পাই চার্ট */}
           <div className="w-full max-w-4xl h-[500px] p-5 my-7 bg-white rounded-lg shadow-md ">
                <h3 className='text-[#244D3F] font-bold  mb-4'>By Interaction Type</h3>
                
                {totalInteractions === 0 ? (
                    <div className='flex flex-col justify-center items-center h-80 text-center'>
                        <p className='text-gray-400 text-lg'>No interactions yet</p>
                        <p className='text-sm text-gray-500 mt-2'>Go to friend details and add some interactions</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                innerRadius="60%"
                                outerRadius="90%"
                                cornerRadius="10%"
                                paddingAngle={5}
                                dataKey="value"
                                nameKey="name"
                                isAnimationActive={true}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Legend  verticalAlign="bottom" height={36}  wrapperStyle={{ paddingBottom: '20px' }} />
                            

                            <Tooltip  formatter={(value, name, props) => {
                                const item = chartData.find(d => d.name === name);
                                return [`${item?.count || 0} interactions (${value.toFixed(1)}%)`, name];
                            }} />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default Stats;









