import React from 'react';

const FriendsCards = ({data}) => {

    console.log(data, "friend data");

    // ট্যাগ থেকে ক্যাটাগরি বানানো (WORK, FAMILY, HOBBY, TRAVEL ইত্যাদি)

    const getCategoryLabel = (tag) => {

        const lowerTag = tag.toLowerCase();

        if (lowerTag.includes('work') || lowerTag.includes('coworker') || lowerTag.includes('job')) return 'WORK';

        if (lowerTag.includes('family') || lowerTag.includes('sister') || lowerTag.includes('brother') || lowerTag.includes('cousin')) return 'FAMILY';

        if (lowerTag.includes('hobby') || lowerTag.includes('music') || lowerTag.includes('book') || lowerTag.includes('dnd') || lowerTag.includes('game')) return 'HOBBY';

        if (lowerTag.includes('travel') || lowerTag.includes('adventure')) return 'TRAVEL';

        if (lowerTag.includes('college') || lowerTag.includes('university') || lowerTag.includes('school')) return 'COLLEGE';

        if (lowerTag.includes('gym') || lowerTag.includes('fitness')) return 'FITNESS';

        if (lowerTag.includes('church') || lowerTag.includes('volunteer')) return 'SERVICE';

        return tag.toUpperCase().slice(0, 8);

    };




    // JSON এর status অনুসারে কালার ও লেবেল
    const getStatusInfo = (status) => {
        switch (status?.toLowerCase()) {
            case "overdue":
                return {
                    label: "OVERDUE",
                    color: "bg-red-500 text-white"
                };
            case "almost due":
                return {
                    label: "ALMOST DUE",
                    color: "bg-amber-400 text-black"
                };
            case "on-track":
                return {
                    label: "ON TRACK",
                    color: "bg-emerald-600 text-white"
                };
            default:
                return {
                    label: status?.toUpperCase() || "UNKNOWN",
                    color: "bg-gray-400 text-white"
                };
        }
    };

    

    

    return (

        <div>

            <div className="card bg-base-100 w-96 shadow-sm rounded-lg border border-gray-200">

  <figure className="px-10 pt-10">

    <img

      src={data.picture}

      alt={data.name}

      className="rounded-full" />

  </figure>

  <div className="card-body items-center text-center">

    <h2 className="card-title">{data.name}</h2>

    <p className="text-gray-600 text-xl font-semibold">{data.goal}d ago</p>

    <div className="card-actions">

        {data.tags.map((tag, index) => (  

            <div key={index} className="badge bg-green-200 m-1">{getCategoryLabel(tag)}</div>

        ))}   
</div>

  </div>

   {/* Status Badge - এখন JSON এর status দেখাবে */}
                    <div className={`badge text-center mx-auto mb-5 rounded-full  ${getStatusInfo(data.status).color} font-semibold px-4 py-1.5 text-sm tracking-wider`}>
                        {getStatusInfo(data.status).label}
                    </div>

</div>
            

        </div>

    );

};

export default FriendsCards;