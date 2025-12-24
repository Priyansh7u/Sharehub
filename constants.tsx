
import React from 'react';
import { 
  Home, 
  Wrench, 
  Music, 
  Laptop, 
  Trophy, 
  PenTool, 
  Award, 
  Heart, 
  Leaf 
} from 'lucide-react';
import { Category, ShareItem, BadgeType } from './types';

export const CATEGORIES: { name: Category; icon: React.ReactNode }[] = [
  { name: 'Home and Appliances', icon: <Home className="w-6 h-6" /> },
  { name: 'Tools and Equipment', icon: <Wrench className="w-6 h-6" /> },
  { name: 'Event and Party Supplies', icon: <Music className="w-6 h-6" /> },
  { name: 'Electronics and Gadgets', icon: <Laptop className="w-6 h-6" /> },
  { name: 'Sports Tools', icon: <Trophy className="w-6 h-6" /> },
  { name: 'Stationery', icon: <PenTool className="w-6 h-6" /> },
];

export const BADGES: BadgeType[] = [
  { 
    id: 'b1', 
    name: 'Helpful Neighbour', 
    icon: '🤝', 
    description: 'Always ready to help those nearby.' 
  },
  { 
    id: 'b2', 
    name: 'Best Lender', 
    icon: '🌟', 
    description: 'Provides high-quality items and service.' 
  },
  { 
    id: 'b3', 
    name: 'Zero Waste Hero', 
    icon: '♻️', 
    description: 'Saving the planet through shared resources.' 
  },
];

export const MOCK_ITEMS: ShareItem[] = [
  {
    id: '1',
    name: 'Drill Machine',
    description: 'Heavy duty Bosch drill for home construction.',
    category: 'Tools and Equipment',
    ownerId: 'u1',
    ownerName: 'Rahul Sharma',
    distance: '0.4 km',
    pricePerDay: 150,
    imageUrl: 'https://picsum.photos/seed/drill/400/300',
    status: 'available',
    /* Added missing lendingCount */
    lendingCount: 15
  },
  {
    id: '2',
    name: 'Microwave Oven',
    description: 'Compact microwave, perfect for quick heating.',
    category: 'Home and Appliances',
    ownerId: 'u2',
    ownerName: 'Priya Verma',
    distance: '0.8 km',
    pricePerDay: 300,
    imageUrl: 'https://picsum.photos/seed/oven/400/300',
    status: 'available',
    /* Added missing lendingCount */
    lendingCount: 42
  },
  {
    id: '3',
    name: 'Projector',
    description: 'Full HD 1080p projector for outdoor movie nights.',
    category: 'Electronics and Gadgets',
    ownerId: 'u3',
    ownerName: 'Amit Singh',
    distance: '0.2 km',
    pricePerDay: 500,
    imageUrl: 'https://picsum.photos/seed/projector/400/300',
    status: 'available',
    /* Added missing lendingCount */
    lendingCount: 28
  }
];
