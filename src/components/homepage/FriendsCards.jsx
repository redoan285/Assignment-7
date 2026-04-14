import React from 'react';
import FriendesDetails from '../../pages/friendsDetais/FriendesDetails';
import { Link } from 'react-router';

const FriendsCards = ({data}) => {


    <FriendesDetails data={data} />

    // console.log(data, "friend data");

    // ট্যাগ থেকে ক্যাটাগরি বানানো (WORK, FAMILY, HOBBY, TRAVEL ইত্যাদি)

    const getCategoryLabel = (tag) => {

        const lowerTag = tag.toLowerCase();

         if (lowerTag.includes('work') || lowerTag.includes('coworker') || lowerTag.includes('job')) return 'WORK';
    };


// const getCategoryLabel = (tag) => { 
//         const lowerTag = tag.toLowerCase(); 
//         if (lowerTag.includes('work') || lowerTag.includes('coworker') || lowerTag.includes('job')) return 'WORK';

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

    

    // console.log(data);
    // <FriendesDetailsils data={data} />


    return (

        <div className="flex justify-center items-center ">

            <Link to={`/${data.id}`} className="card bg-base-100 w-96 shadow-sm rounded-lg border border-gray-200">

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

            <div key={index} className="badge w-min bg-green-200 m-1">{getCategoryLabel(tag)}</div>

        ))}   
</div>

  </div>

   {/* Status Badge - এখন JSON এর status দেখাবে */}
                    <div className={`badge text-center mx-auto mb-5 rounded-full  ${getStatusInfo(data.status).color} font-semibold px-4 py-1.5 text-sm tracking-wider`}>
                        {getStatusInfo(data.status).label}
                    </div>

</Link>
            

        </div>

    );

};

export default FriendsCards;