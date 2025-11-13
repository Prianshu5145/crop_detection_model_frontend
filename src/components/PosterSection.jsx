import React from "react";
import { Link } from "react-router-dom";

const serviceCards = [
  {
    to: "/login",
    title: "🤖 AI Crop Detector",
    description:
      "बस एक फोटो खींचिए और AI से तुरंत जानिए आपकी फ़सल में कौन-सी बीमारी है। तेज़, सटीक और भरोसेमंद पहचान।",
    gradient: "bg-gradient-to-r from-green-500 to-emerald-600",
  },
  {
    to: "/login",
    title: "💰 Crop Prices (मंडी भाव)",
    description:
      "देशभर के मंडियों के ताज़ा फ़सल भाव देखें। अपनी फ़सल के लिए सबसे अच्छा दाम जानें और सही निर्णय लें।",
    gradient: "bg-gradient-to-r from-yellow-500 to-orange-500",
  },
  {
    to: "/login",
    title: "🏥 Nearby Hospitals",
    description:
      "अपने क्षेत्र के कृषि स्वास्थ्य केंद्र, क्लिनिक और अस्पताल खोजें। किसानों के स्वास्थ्य और सुविधा का साथी।",
    gradient: "bg-gradient-to-r from-sky-500 to-blue-600",
  },
  {
    to: "/login",
    title: "🌤️ Weather Updates",
    description:
      "आपके खेत के लिए सटीक मौसम जानकारी पाएँ — बारिश, तापमान और हवा की दिशा अब आपकी उंगलियों पर।",
    gradient: "bg-gradient-to-r from-purple-500 to-indigo-600",
  },
];

const ServiceCard = ({ title, description, gradient }) => {
  return (
    <div
      className={`rounded-2xl text-center p-6 w-full shadow-lg transform transition duration-300 hover:scale-105 ${gradient} text-white h-full flex flex-col justify-center items-center`}
    >
      <h2 className="text-3xl font-extrabold mb-3">{title}</h2>
      <p className="text-base font-medium leading-relaxed opacity-95">
        {description}
      </p>
    </div>
  );
};

const KisanServices = () => {
  return (
    <div className="bg-white pt-7 px-4 pb-10">
      <div className="border-t border-gray-200 mb-8"></div>

      {/* 🌾 Heading */}
      <h1 className="text-3xl font-extrabold text-center text-green-700 mb-3">
        किसान साथी सेवाएँ
      </h1>
      <p className="text-center text-gray-600 mb-10 text-lg">
        स्मार्ट खेती के लिए भरोसेमंद डिजिटल समाधान — हर किसान के साथ, हर मौसम में।
      </p>

      {/* 🌿 Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {serviceCards.map((card, index) => (
          <Link key={index} to={card.to} className="block h-full">
            <ServiceCard
              title={card.title}
              description={card.description}
              gradient={card.gradient}
            />
          </Link>
        ))}
      </div>
      <div className="lg:hidden border-t border-gray-200 mt-6 mb-0"></div>

     {/* Mobile Image */}
<img
  src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1762985970/ChatGPT-Image-Jun-14-2025-07_36_41-PM_gakjwt.webp"
  alt="Kisan Saathi Banner"
  className="w-full h-auto m-0 p-0 block lg:hidden"
/>


{/* Laptop Image */}
<img
  src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1762985970/ChatGPT-Image-Jun-14-2025-07_36_41-PM_gakjwt.webp"
  alt="Used car for sale laptop"
  className="w-full h-72 mt-10 mx-auto  hidden lg:block"
/>
    </div>
    
  );
};

export default KisanServices;
