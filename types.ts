
export type Category = 
  | 'Home and Appliances' 
  | 'Tools and Equipment' 
  | 'Event and Party Supplies' 
  | 'Electronics and Gadgets' 
  | 'Sports Tools' 
  | 'Stationery';

export type TrackingStatus = 'Order Placed' | 'Picked Up' | 'In Transit' | 'Out for Delivery' | 'Delivered';

export interface User {
  id: string;
  name: string;
  email: string;
  contactNo: string;
  address: string;
  password?: string;
  badges: BadgeType[];
  itemsCount: number;
  role: 'user' | 'admin';
}

export interface BadgeType {
  id: string;
  name: 'Helpful Neighbour' | 'Best Lender' | 'Zero Waste Hero';
  icon: string;
  description: string;
  count?: number;
}

export interface ShareItem {
  id: string;
  name: string;
  description: string;
  category: Category;
  ownerId: string;
  ownerName: string;
  distance: string;
  pricePerDay: number;
  imageUrl: string;
  status: 'available' | 'rented';
  lendingCount: number;
}

export interface Order {
  id: string;
  itemId: string;
  itemName: string;
  itemImage: string;
  buyerId: string;
  ownerId: string;
  carrierId?: string;
  status: TrackingStatus;
  orderDate: string;
  deliveryDate?: string;
  pickupAddress: string;
  deliveryAddress: string;
  eta: string;
}

export interface Loan {
  id: string;
  itemId: string;
  itemName: string;
  ownerName: string;
  amount: number;
  status: 'pending' | 'cleared';
  dueDate: string;
  message?: string;
}

export interface CommunityPost {
  id: string;
  userName: string;
  content: string;
  imageUrl?: string;
  likes: number;
  badgeDedicated?: string;
  timestamp: string;
}

export interface BookingDetails {
  quantity: number;
  pickupDate: string;
  lendingTime: string;
}
