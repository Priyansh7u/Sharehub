
import { ShareItem, User, Loan, CommunityPost, Order } from '../types';
import { MOCK_ITEMS } from '../constants';

const KEYS = {
  ITEMS: 'hub_items',
  USERS: 'hub_users',
  LOANS: 'hub_loans',
  POSTS: 'hub_posts',
  ORDERS: 'hub_orders'
};

export const db = {
  // Items
  getItems: (): ShareItem[] => {
    const saved = localStorage.getItem(KEYS.ITEMS);
    if (!saved) {
      localStorage.setItem(KEYS.ITEMS, JSON.stringify(MOCK_ITEMS));
      return MOCK_ITEMS;
    }
    return JSON.parse(saved);
  },
  
  saveItem: (item: ShareItem) => {
    const items = db.getItems();
    const index = items.findIndex(i => i.id === item.id);
    if (index > -1) items[index] = item;
    else items.push(item);
    localStorage.setItem(KEYS.ITEMS, JSON.stringify(items));
  },

  deleteItem: (id: string) => {
    const items = db.getItems().filter(i => i.id !== id);
    localStorage.setItem(KEYS.ITEMS, JSON.stringify(items));
  },

  // Orders & Tracking
  getOrders: (): Order[] => {
    const saved = localStorage.getItem(KEYS.ORDERS);
    if (!saved) {
      const initialOrders: Order[] = [
        {
          id: 'ORD-001',
          itemId: '1',
          itemName: 'Drill Machine',
          itemImage: 'https://picsum.photos/seed/drill/400/300',
          buyerId: 'u1',
          ownerId: 'u2',
          status: 'In Transit',
          orderDate: new Date().toISOString(),
          pickupAddress: 'Sector 15, Rohini, Delhi',
          deliveryAddress: 'KV Narela, Delhi',
          eta: '45 mins'
        }
      ];
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(initialOrders));
      return initialOrders;
    }
    return JSON.parse(saved);
  },

  saveOrder: (order: Order) => {
    const orders = db.getOrders();
    const index = orders.findIndex(o => o.id === order.id);
    if (index > -1) orders[index] = order;
    else orders.push(order);
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  },

  getUserOrders: (userId: string): Order[] => {
    return db.getOrders().filter(o => o.buyerId === userId || o.ownerId === userId);
  },

  getAvailableDeliveries: (): Order[] => {
    return db.getOrders().filter(o => !o.carrierId || o.status !== 'Delivered');
  },

  // User Specific
  getUserItems: (userId: string): ShareItem[] => {
    return db.getItems().filter(item => item.ownerId === userId);
  },

  // Stats
  getGlobalStats: () => {
    const items = db.getItems();
    return {
      totalItems: items.length,
      totalShares: items.reduce((acc, curr) => acc + curr.lendingCount, 0),
      co2Saved: (items.reduce((acc, curr) => acc + curr.lendingCount, 0) * 4.2).toFixed(1)
    };
  }
};
