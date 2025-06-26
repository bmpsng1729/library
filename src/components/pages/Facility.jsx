import React from "react";
import {
  Wifi,
  BookOpen,
  Clock,
  Volume2,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

function Facility() {
  const facilities = [
  {
    title: "24x7 Access",
    description: "The facility remains open all day and night for uninterrupted preparation.",
    icon: Clock,
  },
  {
    title: "Free Wi-Fi",
    description: "High-speed internet access is available for research and online tests.",
    icon: Wifi,
  },
  {
    title: "Important Books",
    description: "A well-stocked library with reference books and previous year papers.",
    icon: BookOpen,
  },
  {
    title: "Silent Environment",
    description: "A calm, focused space ideal for deep work and interview prep.",
    icon: Volume2,
  },
  {
    title: "Guidance Support",
    description: "Help from alumni, mentors, and T&P coordinators for queries and advice.",
    icon: Lightbulb,
  },
  {
    title: "Security & Cleanliness",
    description: "Safe and hygienic environment with regular cleaning and supervision.",
    icon: ShieldCheck,
  },
];
  return (
    <div className="  pb-8 px-4 pt-10 mb- bg-[#f2f2f2] text-black font-poppins">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Our Facilities
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {facilities.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-3 text-green-700">
              <Icon size={28} />
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <p className="text-gray-700 text-sm">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Facility
