// components/TeamMemberCard.jsx
import React from 'react';

const TeamMemberCard = ({ member }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-blue-600 font-medium mb-2">{member.position}</p>
        <p className="text-gray-600 mb-3"><span className="font-semibold">Especialidad:</span> {member.expertise}</p>
        <p className="text-gray-600"><span className="font-semibold">Experiencia:</span> {member.experience}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;