export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number | { [key: string]: number };
  description?: string;
  image?: string;
  threeDModel?: string;
  videoUrl?: string;
  ingredients?: string[];
}

export interface OrderItem extends MenuItem {
  quantity: number;
  selectedSize?: string;
  selectedPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'out-for-delivery' | 'delivered';
  createdAt: number;
  address: string;
  phone: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  address?: string;
  phone?: string;
}
