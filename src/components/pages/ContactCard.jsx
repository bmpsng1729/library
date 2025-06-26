import React from 'react';

function ContactCard({ icon: Icon, title, value, link }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition-all">
      <div className="flex justify-center mb-3 text-[#000000]">
        <Icon size={32} />
      </div>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-[#4B4B4B] hover:underline">
          {value}
        </a>
      ) : (
        <p className="text-[#4B4B4B]">{value}</p>
      )}
    </div>
  );
}

export default ContactCard;
