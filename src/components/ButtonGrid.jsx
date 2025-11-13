import React from 'react';
import { Link } from 'react-router-dom';

const actions = [
  {
    title: 'AI Crop Detector',
    icon: 'https://res.cloudinary.com/dunsl7vvf/image/upload/v1762984814/images-removebg-preview_wuf0o2.png',
    link: '/login',
  },
  {
    title: 'Crop Price',
    icon: 'https://res.cloudinary.com/dunsl7vvf/image/upload/v1762984923/dataset-card-removebg-preview_atvbsy.png',
    link: '/login',
  },
  {
    title: 'Nearby Hospitals',
    icon: 'https://res.cloudinary.com/dunsl7vvf/image/upload/v1762985049/unnamed_dcfl9r.png',
    link: '/login',
  },
  {
    title: 'Weather Forecast',
    icon: 'https://res.cloudinary.com/dunsl7vvf/image/upload/v1762985153/541346-200_mzajow.png',
    link: '/login',
  },
];

export default function CarActionCard() {
  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, index) => (
          <Link to={action.link} key={index}>
            <div className="group bg-white/80 backdrop-blur-md border border-gray-200 hover:border-blue-400 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center justify-center hover:scale-105">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3">
                <img
                  src={action.icon}
                  alt={action.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-blue-600 text-center">
                {action.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
