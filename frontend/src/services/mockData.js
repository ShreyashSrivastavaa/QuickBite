// 25 Rich Gourmet Dishes with high-res images, pricing in INR (₹), ratings, ready times, categories, and isVeg status
export const MOCK_CATEGORIES = [
  'Biryani',
  'Burgers',
  'Pizza',
  'Curries',
  'Sides',
  'Desserts',
  'Beverages',
];

export const MOCK_FOODS = [
  // --- BIRYANI ---
  {
    _id: 'food_biryani_01',
    name: 'Hyderabadi Dum Chicken Biryani',
    description: 'Fragrant basmati rice slow-cooked with tender marinated chicken, saffron, and aromatic spices.',
    category: 'Biryani',
    price: 349,
    readyTime: 25,
    rating: { rate: 4.9, count: 210 },
    images: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: false,
  },
  {
    _id: 'food_biryani_02',
    name: 'Royal Awadhi Mutton Dum Biryani',
    description: 'Tender margs of bone-in mutton slow-cooked with long-grain basmati, rose water, and kewra essence.',
    category: 'Biryani',
    price: 449,
    readyTime: 30,
    rating: { rate: 4.9, count: 185 },
    images: ['https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: false,
  },
  {
    _id: 'food_biryani_03',
    name: 'Paneer Tikka Dum Biryani (Veg)',
    description: 'Chargrilled cottage cheese cubes layered with spiced biryani rice and caramelized fried onions.',
    category: 'Biryani',
    price: 299,
    readyTime: 20,
    rating: { rate: 4.8, count: 160 },
    images: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },
  {
    _id: 'food_biryani_04',
    name: 'Kathal Gourmet Veg Dum Biryani',
    description: 'Juicy marinated tender jackfruit infused with whole Indian spices and basmati rice.',
    category: 'Biryani',
    price: 279,
    readyTime: 25,
    rating: { rate: 4.7, count: 110 },
    images: ['https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },

  // --- BURGERS ---
  {
    _id: 'food_burger_01',
    name: 'Truffle Smash Beef Cheese Burger',
    description: 'Double smashed Angus patty, black truffle mayo, melted cheddar, and caramelized onions on toasted brioche.',
    category: 'Burgers',
    price: 299,
    readyTime: 20,
    rating: { rate: 4.8, count: 145 },
    images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: false,
  },
  {
    _id: 'food_burger_02',
    name: 'Crispy Peri-Peri Chicken Burger',
    description: 'Crispy fried chicken breast, spicy peri-peri sauce, crunchy coleslaw, and smoked cheese slice.',
    category: 'Burgers',
    price: 259,
    readyTime: 18,
    rating: { rate: 4.8, count: 190 },
    images: ['https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: false,
  },
  {
    _id: 'food_burger_03',
    name: 'Gourmet Veggie Loaded Cheese Burger (Veg)',
    description: 'Crispy herb potato patty, melted cheddar cheese, fresh lettuce, tomatoes, and house garlic aioli.',
    category: 'Burgers',
    price: 199,
    readyTime: 15,
    rating: { rate: 4.7, count: 130 },
    images: ['https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },
  {
    _id: 'food_burger_04',
    name: 'Fiery Paneer Crunch Burger (Veg)',
    description: 'Spicy marinated paneer block in crunchy panko crust with sriracha mayo and jalapenos.',
    category: 'Burgers',
    price: 229,
    readyTime: 18,
    rating: { rate: 4.8, count: 175 },
    images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },

  // --- PIZZA ---
  {
    _id: 'food_pizza_01',
    name: 'Artisan Wood-Fired Margherita Pizza (Veg)',
    description: 'San Marzano tomato sauce, fresh buffalo mozzarella, aromatic basil leaves, and extra virgin olive oil.',
    category: 'Pizza',
    price: 399,
    readyTime: 25,
    rating: { rate: 4.9, count: 180 },
    images: ['https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },
  {
    _id: 'food_pizza_02',
    name: 'Loaded BBQ Chicken & Bacon Pizza',
    description: 'Smoky BBQ chicken chunks, crispy bacon strips, red onions, mozzarella, and cilantro drizzle.',
    category: 'Pizza',
    price: 549,
    readyTime: 25,
    rating: { rate: 4.9, count: 240 },
    images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: false,
  },
  {
    _id: 'food_pizza_03',
    name: 'Truffle Mushroom & Cheese Pizza (Veg)',
    description: 'Wild portobello mushrooms, creamy fontina & mozzarella, white truffle oil, and fresh thyme.',
    category: 'Pizza',
    price: 479,
    readyTime: 22,
    rating: { rate: 4.8, count: 155 },
    images: ['https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },
  {
    _id: 'food_pizza_04',
    name: 'Spicy Pepperoni Feast Pizza',
    description: 'Imported Italian pork pepperoni, spicy tomato passata, double mozzarella, and hot honey drizzle.',
    category: 'Pizza',
    price: 529,
    readyTime: 22,
    rating: { rate: 4.9, count: 310 },
    images: ['https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: false,
  },

  // --- CURRIES & MAINS ---
  {
    _id: 'food_curry_01',
    name: 'Old Delhi Butter Chicken',
    description: 'Tandoori chicken tikka simmered in a velvety makhani gravy enriched with butter, cream, and dried fenugreek.',
    category: 'Curries',
    price: 379,
    readyTime: 20,
    rating: { rate: 4.9, count: 420 },
    images: ['https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: false,
  },
  {
    _id: 'food_curry_02',
    name: 'Dal Makhani Velvet Pot (Veg)',
    description: 'Black lentils slow-cooked overnight on charcoal with rich white butter and fresh malai cream.',
    category: 'Curries',
    price: 249,
    readyTime: 15,
    rating: { rate: 4.9, count: 380 },
    images: ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },
  {
    _id: 'food_curry_03',
    name: 'Paneer Butter Masala Special (Veg)',
    description: 'Soft malai paneer cubes cooked in a rich tomato, cashew, and aromatic butter gravy.',
    category: 'Curries',
    price: 299,
    readyTime: 18,
    rating: { rate: 4.8, count: 290 },
    images: ['https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },
  {
    _id: 'food_curry_04',
    name: 'Kashmiri Mutton Rogan Josh',
    description: 'Tender lamb shanks cooked in authentic Kashmiri red chili, fennel seed, and dry ginger gravy.',
    category: 'Curries',
    price: 459,
    readyTime: 25,
    rating: { rate: 4.9, count: 215 },
    images: ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: false,
  },

  // --- SIDES & STARTERS ---
  {
    _id: 'food_side_01',
    name: 'Tandoori Malai Chicken Tikka',
    description: 'Boneless chicken chunks marinated in cream, cashew paste, green cardamom, and grilled in bhatti.',
    category: 'Sides',
    price: 329,
    readyTime: 18,
    rating: { rate: 4.9, count: 260 },
    images: ['https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: false,
  },
  {
    _id: 'food_side_02',
    name: 'Charcoal Grilled Paneer Tikka (Veg)',
    description: 'Cottage cheese cubes marinated in hung curd, mustard oil, and spices, charred in clay tandoor.',
    category: 'Sides',
    price: 279,
    readyTime: 15,
    rating: { rate: 4.8, count: 230 },
    images: ['https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },
  {
    _id: 'food_side_03',
    name: 'Crispy Peri-Peri Garlic Fries (Veg)',
    description: "Hand-cut golden fries tossed with spicy African bird's eye chili seasoning and garlic dip.",
    category: 'Sides',
    price: 149,
    readyTime: 12,
    rating: { rate: 4.7, count: 195 },
    images: ['https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },
  {
    _id: 'food_side_04',
    name: 'Honey Chili Crispy Potato Crunch (Veg)',
    description: 'Crispy fried potato fingers tossed in sesame seeds, honey, chili garlic glaze, and spring onions.',
    category: 'Sides',
    price: 199,
    readyTime: 15,
    rating: { rate: 4.8, count: 165 },
    images: ['https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },

  // --- DESSERTS ---
  {
    _id: 'food_dessert_01',
    name: 'Belgian Chocolate Lava Cake (Veg)',
    description: 'Warm, gooey chocolate cake filled with molten Belgian dark chocolate lava, served with vanilla bean scoop.',
    category: 'Desserts',
    price: 199,
    readyTime: 15,
    rating: { rate: 4.9, count: 310 },
    images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },
  {
    _id: 'food_dessert_02',
    name: 'Saffron Gulab Jamun with Rabri (Veg)',
    description: 'Hot mawa gulab jamun soaked in saffron syrup, served over chilled thick pistachio rabri.',
    category: 'Desserts',
    price: 169,
    readyTime: 10,
    rating: { rate: 4.9, count: 280 },
    images: ['https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },

  // --- BEVERAGES ---
  {
    _id: 'food_beverage_01',
    name: 'Mango Passionfruit Mocktail (Veg)',
    description: 'Refreshing blend of fresh Alphonso mango pulp, passionfruit, mint leaves, sparkling soda, and lime.',
    category: 'Beverages',
    price: 129,
    readyTime: 10,
    rating: { rate: 4.8, count: 188 },
    images: ['https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },
  {
    _id: 'food_beverage_02',
    name: 'Cold Brew Caramel Iced Coffee (Veg)',
    description: 'Slow-steeped Arabica coffee over ice with salted caramel drizzle and cold foam topping.',
    category: 'Beverages',
    price: 149,
    readyTime: 8,
    rating: { rate: 4.8, count: 140 },
    images: ['https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },
  {
    _id: 'food_beverage_03',
    name: 'Sparkling Berry Lemonade (Veg)',
    description: 'Fizzy lemonade infused with crushed wild raspberries, blueberries, fresh lemon juice, and crushed ice.',
    category: 'Beverages',
    price: 119,
    readyTime: 8,
    rating: { rate: 4.7, count: 95 },
    images: ['https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'],
    isAvailable: true,
    isVeg: true,
  },
];

// Helper to filter items locally (by search, category, 30-min quick delivery, and veg/non-veg)
export function getFilteredFoods({
  searchQuery = '',
  selectedCategory = '',
  inThirtyMinOnly = false,
  vegFilter = 'all', // 'all' | 'veg' | 'non-veg'
} = {}) {
  let list = [...MOCK_FOODS];

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    list = list.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }

  if (selectedCategory && selectedCategory.trim()) {
    list = list.filter(
      (item) => item.category.toLowerCase() === selectedCategory.trim().toLowerCase()
    );
  }

  if (inThirtyMinOnly) {
    list = list.filter((item) => (item.readyTime || 0) <= 30);
  }

  if (vegFilter === 'veg') {
    list = list.filter(
      (item) => item.isVeg === true || item.name.toLowerCase().includes('(veg)')
    );
  } else if (vegFilter === 'non-veg') {
    list = list.filter(
      (item) => item.isVeg === false && !item.name.toLowerCase().includes('(veg)')
    );
  }

  return list;
}

// Demo Accounts
export const DEMO_USER = {
  _id: 'demo_user_01',
  email: 'user@zymeal.com',
  firstName: 'Shreyash',
  lastName: 'Srivastava',
  phone: '+91 9876543210',
  address: 'B-42, Cyber City, Sector 62, Noida, UP, 201309',
  role: 'user',
};

export const DEMO_ADMIN = {
  _id: 'demo_admin_01',
  email: 'admin@zymeal.com',
  name: 'Super Admin',
  role: 'admin',
};
