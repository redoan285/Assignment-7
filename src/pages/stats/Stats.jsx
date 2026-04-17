import React, { useContext, useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ContactsFriendProviderContext } from '../../contest/ContactFriendProviderContext';

const Stats = () => {
    const { interactions } = useContext(ContactsFriendProviderContext);

    // ✅ select filter state
    const [filter, setFilter] = useState('All');

    // ✅ filtered interactions
    const filteredInteractions = useMemo(() => {
        if (!interactions) return [];

        if (filter === 'All') return interactions;

        return interactions.filter(i => i.type === filter);
    }, [interactions, filter]);

    // chart data
    const chartData = useMemo(() => {
        if (!filteredInteractions || filteredInteractions.length === 0) {
            return [
                { name: 'Text', value: 0, color: '#7E35E1' },
                { name: 'Call', value: 0, color: '#244D3F' },
                { name: 'Video', value: 0, color: '#37A163' },
            ];
        }

        const textCount = filteredInteractions.filter(i => i.type === 'Text').length;
        const callCount = filteredInteractions.filter(i => i.type === 'Call').length;
        const videoCount = filteredInteractions.filter(i => i.type === 'Video').length;
        const total = filteredInteractions.length;

        return [
            { name: 'Text', value: total > 0 ? (textCount / total) * 100 : 0, count: textCount, color: '#7E35E1' },
            { name: 'Call', value: total > 0 ? (callCount / total) * 100 : 0, count: callCount, color: '#244D3F' },
            { name: 'Video', value: total > 0 ? (videoCount / total) * 100 : 0, count: videoCount, color: '#37A163' },
        ];
    }, [filteredInteractions]);

    const totalInteractions = filteredInteractions?.length || 0;

    return (
        <div className='flex flex-col justify-center bg-gray-90 items-center h-full container mx-auto'>
            <h1 className='text-4xl font-bold font-black my-5 text-center'>Friendship Analytics</h1>

            {/* ✅ DROPDOWN FILTER */}
            <div className="w-full max-w-xs mb-4">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                    <option value="All">All</option>
                    <option value="Text">Text</option>
                    <option value="Call">Call</option>
                    <option value="Video">Video</option>
                </select>
            </div>

            {/* Chart */}
            <div className="w-full max-w-4xl h-[500px] p-5 my-7 bg-white rounded-lg shadow-md ">
                <h3 className='text-[#244D3F] font-bold mb-4'>By Interaction Type</h3>

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

                            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingBottom: '20px' }} />

                            <Tooltip formatter={(value, name) => {
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