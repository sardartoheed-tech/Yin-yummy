import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Soups
  { id: '1', name: 'Y&Y Special Soup', category: 'Soups', price: { Single: 300, Half: 700, Full: 1020 } },
  { id: '2', name: 'Hot & Sour Soup', category: 'Soups', price: { Single: 280, Half: 600, Full: 950 } },
  { id: '3', name: 'Chicken Corn Soup', category: 'Soups', price: { Single: 280, Half: 530, Full: 900 } },
  
  // Dry Items
  { id: '10', name: 'Y & Y Special Dry Chicken', category: 'Dry Items', price: { Half: 600, Full: 1000 } },
  { id: '11', name: 'Chicken Chilli Dry', category: 'Dry Items', price: { Half: 600, Full: 1000 } },
  { id: '12', name: 'Chicken Wings', category: 'Dry Items', price: { Half: 430, Full: 750 } },

  // Burgers
  { id: '34', name: 'Zinger Burger with Fries', category: 'Burgers', price: 400 },
  { id: '35', name: 'Zinger Cheesy Burger with Fries', category: 'Burgers', price: 450 },
  { id: '36', name: 'Chicken Burger with Fries', category: 'Burgers', price: 350 },

  // Pizza
  { id: '151', name: 'Y & Y Special Pizza', category: 'Pizza', price: { Small: 650, Medium: 1200, Large: 1700 } },
  { id: '152', name: 'Chicken Tikka Pizza', category: 'Pizza', price: { Small: 550, Medium: 1000, Large: 1500 } },
  { id: '153', name: 'Chicken Fajita Pizza', category: 'Pizza', price: { Small: 550, Medium: 1000, Large: 1500 } },

  // Deals
  { id: 'deal-1', name: 'Deal-1 (Egg Fried Rice + Chicken Manchurian/Black Pepper)', category: 'Deals', price: 600 },
  { id: 'deal-2', name: 'Deal-2 (Egg Fried Rice + Chicken Manchurian/Black Pepper + Chowmien)', category: 'Deals', price: 940 },
  { id: 'deal-3', name: 'Deal-3 (Egg Fried Rice + Chicken Manchurian/Black Pepper + Drum Stick)', category: 'Deals', price: 740 },

  // Shakes
  { id: '88', name: 'Y & Y Power Shake', category: 'Shakes', price: 450 },
  { id: '89', name: 'Kit Kat Shake', category: 'Shakes', price: 400 },
  { id: '90', name: 'Pina Colada', category: 'Shakes', price: 400 },
];

export const CATEGORIES = [
  'All',
  'Soups',
  'Dry Items',
  'Burgers',
  'Pizza',
  'Deals',
  'Shakes',
];
