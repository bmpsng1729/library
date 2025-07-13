import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import {ContactCard} from '../index';

function Contact() {
  const [open, setOpen] = useState(false);

  const contacts = [
    {
      icon: Mail,
      title: 'Email',
      value: 'tpocell@nitjsr.ac.in',
      link: 'mailto:tpocell@nitjsr.ac.in',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 98765 43210',
      link: 'tel:+919876543210',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+91 98765 43210',
      link: 'https://wa.me/919876543210',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F2] text-[#000000] px-4 mt-7 flex flex-col items-center">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Contact Us</h1>
      <p className="text-lg text-center max-w-xl mb-8">
        We'd love to hear from you! Reach out to us through any of the methods below.
      </p>

      {/* Contact Info Grid */}
       <div className="grid gap-6 md:grid-cols-3 w-full max-w-4xl mb-12">
        {contacts.map(({ icon, title, value, link }) => (
          <ContactCard
            key={title}      // title is unique enough here
            icon={icon}
            title={title}
            value={value}
            link={link}
          />
        ))}
      </div>

      {/* Google Map Embed */}
      <div className="w-full max-w-4xl mb-6">
        <iframe
          title="Daltonganj Location"
          className="w-full h-64 md:h-96 rounded-lg shadow-md"
          frameBorder="0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.168141008396!2d84.06290857450758!3d24.045823478438515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b2dc8fdfd33a3%3A0x4c503947f44c4b5f!2sDaltonganj%2C%20Jharkhand%20822101!5e0!3m2!1sen!2sin!4v1719420000000"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className=" text-center">
          <MapPin className="inline-block mr-2" />
          <span className="text-lg font-medium">
            Daltonganj, Palamu, Jharkhand - 822101, India
          </span>
        </div>
      </div>

      {/* Mobile Contact Menu */}
      <div className="w-full md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full bg-black text-[#F2F2F2] py- px-4 rounded-md flex justify-between items-center"
        >
          Contact Options
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {open && (
          <div className="mt-4 space-y-4">
            <div className="bg-white  rounded-md shadow-md">
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">tpocell@nitjsr.ac.in</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="font-semibold">WhatsApp</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
