'use client';
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react'; 

type CardProps = {
    title: string;
    price?: number | any; 
    change?: number | null  | any; 
    lastMonth?: string;
};

const Card = ({ title, price, change, lastMonth }: CardProps) => {
    const percentage = change ? Math.abs(change) : 0; 
    const color =change > 40 ? 'green' :change < 0 ? 'red' :  (change > 0 && change < 40 ? '#F05F97' : 'green');
    const textColor = change > 40 ? 'text-green-500' :change < 0 ? 'text-red-500' :  (change > 0 && change < 40 ? 'text-pink-500' : 'green');
    const remainingPercentage = 100 - percentage; // Calculate remaining percentage for gray line

    return (
        <div className="bg-white shadow-md overflow-hidden w-96 h-28 px-1" style={{ boxShadow: '3px 8px 8px rgba(0, 0, 0, 0.4)', }}>
            <div className="p-2">
                <h3 className="text-black font-bold text-sm ml-1">{title}</h3>
                <div className="flex items-center">
                    <span className={`text-3xl ml-1 font-extrabold ${textColor}`}>$</span>
                    <span className={`text-3xl ml-1 font-extrabold ${textColor}`}>
                        {price}
                    </span>
                </div>

                <div className="h-1 bg-white" />
                <div className="flex ml-1 ">
                    <div 
                        className="h-1 rounded-lg bg-[color]" 
                        style={{ backgroundColor: color, width: `${percentage}%` }} 
                    />
                    <div 
                        className="h-1 mr-4 rounded-lg bg-gray-300" // Adjust this to match your desired gray color
                        style={{ width: `${remainingPercentage}%` }} 
                    />
                </div>
            </div>
            <div className="flex justify-between items-center px-2 mt-1">
                {lastMonth && <span className="text-xs text-gray-600">{lastMonth}</span>}
                {change !== undefined && (
                    <span className="flex items-center text-xs text-gray-600">
                        {change > 0 ? (
                            <ArrowUp size={12} className="text-green-500" />
                        ) : (
                            <ArrowDown size={12} className="text-red-500" />
                        )}
                        <span className="ml-1">{percentage}%</span>
                    </span>
                )}
            </div>
        </div>
    );
};

export default Card;
