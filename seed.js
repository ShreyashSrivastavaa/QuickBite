const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { MONGODB_URI } = require("./config/AppConst");

const User = require("./models/user");
const Admin = require("./models/admin");
const Restaurant = require("./models/restaurant");
const Food = require("./models/food");

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB Atlas for database seeding...");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 8000,
    });
    console.log("Connected to MongoDB successfully.");

    // Clear existing sample collections
    await Admin.deleteMany({});
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await Food.deleteMany({});

    console.log("Cleared existing test collections.");

    // Seed Admin Accounts
    const hashedAdminPassword = await bcrypt.hash("Admin@123456", 12);
    const adminZymeal = new Admin({
      email: "admin@zymeal.com",
      password: hashedAdminPassword,
      name: "Super Admin",
      role: "admin",
    });
    await adminZymeal.save();

    const adminQuickbite = new Admin({
      email: "admin@quickbite.com",
      password: hashedAdminPassword,
      name: "Super Admin",
      role: "admin",
    });
    await adminQuickbite.save();

    // Seed User Accounts
    const hashedUserPassword = await bcrypt.hash("User@123456", 12);
    const userZymeal = new User({
      email: "user@zymeal.com",
      password: hashedUserPassword,
      firstName: "Shreyash",
      lastName: "Srivastava",
      phone: "+91 9876543210",
      address: "B-42, Cyber City, Sector 62, Noida, UP, 201309",
      lat: 28.6273,
      lng: 77.3725,
    });
    await userZymeal.save();

    const userQuickbite = new User({
      email: "user@quickbite.com",
      password: hashedUserPassword,
      firstName: "Shreyash",
      lastName: "Srivastava",
      phone: "+91 9876543210",
      address: "B-42, Cyber City, Sector 62, Noida, UP, 201309",
      lat: 28.6273,
      lng: 77.3725,
    });
    await userQuickbite.save();

    // Seed 3 Top Restaurants
    const restaurant1 = await new Restaurant({
      name: "The Royal Spice Kitchen",
      foodType: "North Indian, Biryani, Mughlai",
      pincode: "201309",
      address: "Sector 62, Noida, Uttar Pradesh",
      phone: "+91 9876543211",
      rating: { rate: 4.9, count: 420 },
      images: ["https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80"],
      isOpen: true,
    }).save();

    const restaurant2 = await new Restaurant({
      name: "Artisan Wood-Fired Bistro",
      foodType: "Italian, Wood-Fired Pizza, Burgers",
      pincode: "201309",
      address: "DLF CyberHub, Sector 24, Gurgaon",
      phone: "+91 9876543212",
      rating: { rate: 4.8, count: 350 },
      images: ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"],
      isOpen: true,
    }).save();

    // 25 Rich Veg & Non-Veg Gourmet Food Items
    const foodItemsData = [
      // --- BIRYANI (Veg & Non-Veg) ---
      {
        name: "Hyderabadi Dum Chicken Biryani",
        description: "Fragrant basmati rice slow-cooked with tender marinated chicken, saffron, and aromatic spices.",
        category: "Biryani",
        price: 349,
        readyTime: 25,
        rating: { rate: 4.9, count: 210 },
        images: ["https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Royal Awadhi Mutton Dum Biryani",
        description: "Tender margs of bone-in mutton slow-cooked with long-grain basmati, rose water, and kewra essence.",
        category: "Biryani",
        price: 449,
        readyTime: 30,
        rating: { rate: 4.9, count: 185 },
        images: ["https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Paneer Tikka Dum Biryani (Veg)",
        description: "Chargrilled cottage cheese cubes layered with spiced biryani rice and caramelized fried onions.",
        category: "Biryani",
        price: 299,
        readyTime: 20,
        rating: { rate: 4.8, count: 160 },
        images: ["https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Kathal Gourmet Veg Dum Biryani",
        description: "Juicy marinated tender jackfruit infused with whole Indian spices and basmati rice.",
        category: "Biryani",
        price: 279,
        readyTime: 25,
        rating: { rate: 4.7, count: 110 },
        images: ["https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },

      // --- BURGERS (Veg & Non-Veg) ---
      {
        name: "Truffle Smash Beef Cheese Burger",
        description: "Double smashed Angus patty, black truffle mayo, melted cheddar, and caramelized onions on toasted brioche.",
        category: "Burgers",
        price: 299,
        readyTime: 20,
        rating: { rate: 4.8, count: 145 },
        images: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Crispy Peri-Peri Chicken Burger",
        description: "Crispy fried chicken breast, spicy peri-peri sauce, crunchy coleslaw, and smoked cheese slice.",
        category: "Burgers",
        price: 259,
        readyTime: 18,
        rating: { rate: 4.8, count: 190 },
        images: ["https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Gourmet Veggie Loaded Cheese Burger (Veg)",
        description: "Crispy herb potato patty, melted cheddar cheese, fresh lettuce, tomatoes, and house garlic aioli.",
        category: "Burgers",
        price: 199,
        readyTime: 15,
        rating: { rate: 4.7, count: 130 },
        images: ["https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Fiery Paneer Crunch Burger (Veg)",
        description: "Spicy marinated paneer block in crunchy panko crust with sriracha mayo and jalapenos.",
        category: "Burgers",
        price: 229,
        readyTime: 18,
        rating: { rate: 4.8, count: 175 },
        images: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },

      // --- PIZZA (Veg & Non-Veg) ---
      {
        name: "Artisan Wood-Fired Margherita Pizza (Veg)",
        description: "San Marzano tomato sauce, fresh buffalo mozzarella, aromatic basil leaves, and extra virgin olive oil.",
        category: "Pizza",
        price: 399,
        readyTime: 25,
        rating: { rate: 4.9, count: 180 },
        images: ["https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Loaded BBQ Chicken & Bacon Pizza",
        description: "Smoky BBQ chicken chunks, crispy bacon strips, red onions, mozzarella, and cilantro drizzle.",
        category: "Pizza",
        price: 549,
        readyTime: 25,
        rating: { rate: 4.9, count: 240 },
        images: ["https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Truffle Mushroom & Cheese Pizza (Veg)",
        description: "Wild portobello mushrooms, creamy fontina & mozzarella, white truffle oil, and fresh thyme.",
        category: "Pizza",
        price: 479,
        readyTime: 22,
        rating: { rate: 4.8, count: 155 },
        images: ["https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Spicy Pepperoni Feast Pizza",
        description: "Imported Italian pork pepperoni, spicy tomato passata, double mozzarella, and hot honey drizzle.",
        category: "Pizza",
        price: 529,
        readyTime: 22,
        rating: { rate: 4.9, count: 310 },
        images: ["https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },

      // --- CURRIES & MAINS (Veg & Non-Veg) ---
      {
        name: "Old Delhi Butter Chicken",
        description: "Tandoori chicken tikka simmered in a velvety makhani gravy enriched with butter, cream, and dried fenugreek.",
        category: "Curries",
        price: 379,
        readyTime: 20,
        rating: { rate: 4.9, count: 420 },
        images: ["https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Dal Makhani Velvet Pot (Veg)",
        description: "Black lentils slow-cooked overnight on charcoal with rich white butter and fresh malai cream.",
        category: "Curries",
        price: 249,
        readyTime: 15,
        rating: { rate: 4.9, count: 380 },
        images: ["https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Paneer Butter Masala Special (Veg)",
        description: "Soft malai paneer cubes cooked in a rich tomato, cashew, and aromatic butter gravy.",
        category: "Curries",
        price: 299,
        readyTime: 18,
        rating: { rate: 4.8, count: 290 },
        images: ["https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Kashmiri Mutton Rogan Josh",
        description: "Tender lamb shanks cooked in authentic Kashmiri red chili, fennel seed, and dry ginger gravy.",
        category: "Curries",
        price: 459,
        readyTime: 25,
        rating: { rate: 4.9, count: 215 },
        images: ["https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },

      // --- STARTERS & SIDES (Veg & Non-Veg) ---
      {
        name: "Tandoori Malai Chicken Tikka",
        description: "Boneless chicken chunks marinated in cream, cashew paste, green cardamom, and grilled in bhatti.",
        category: "Sides",
        price: 329,
        readyTime: 18,
        rating: { rate: 4.9, count: 260 },
        images: ["https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Charcoal Grilled Paneer Tikka (Veg)",
        description: "Cottage cheese cubes marinated in hung curd, mustard oil, and spices, charred in clay tandoor.",
        category: "Sides",
        price: 279,
        readyTime: 15,
        rating: { rate: 4.8, count: 230 },
        images: ["https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Crispy Peri-Peri Garlic Fries (Veg)",
        description: "Hand-cut golden fries tossed with spicy African bird's eye chili seasoning and garlic dip.",
        category: "Sides",
        price: 149,
        readyTime: 12,
        rating: { rate: 4.7, count: 195 },
        images: ["https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Honey Chili Crispy Potato Crunch (Veg)",
        description: "Crispy fried potato fingers tossed in sesame seeds, honey, chili garlic glaze, and spring onions.",
        category: "Sides",
        price: 199,
        readyTime: 15,
        rating: { rate: 4.8, count: 165 },
        images: ["https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },

      // --- DESSERTS & BEVERAGES (Veg) ---
      {
        name: "Belgian Chocolate Lava Cake (Veg)",
        description: "Warm, gooey chocolate cake filled with molten Belgian dark chocolate lava, served with vanilla bean scoop.",
        category: "Desserts",
        price: 199,
        readyTime: 15,
        rating: { rate: 4.9, count: 310 },
        images: ["https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Saffron Gulab Jamun with Rabri (Veg)",
        description: "Hot mawa gulab jamun soaked in saffron syrup, served over chilled thick pistachio rabri.",
        category: "Desserts",
        price: 169,
        readyTime: 10,
        rating: { rate: 4.9, count: 280 },
        images: ["https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Mango Passionfruit Mocktail (Veg)",
        description: "Refreshing blend of fresh Alphonso mango pulp, passionfruit, mint leaves, sparkling soda, and lime.",
        category: "Beverages",
        price: 129,
        readyTime: 10,
        rating: { rate: 4.8, count: 188 },
        images: ["https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Cold Brew Caramel Iced Coffee (Veg)",
        description: "Slow-steeped Arabica coffee over ice with salted caramel drizzle and cold foam topping.",
        category: "Beverages",
        price: 149,
        readyTime: 8,
        rating: { rate: 4.8, count: 140 },
        images: ["https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
      {
        name: "Sparkling Berry Lemonade (Veg)",
        description: "Fizzy lemonade infused with crushed wild raspberries, blueberries, fresh lemon juice, and crushed ice.",
        category: "Beverages",
        price: 119,
        readyTime: 8,
        rating: { rate: 4.7, count: 95 },
        images: ["https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"],
        isAvailable: true,
      },
    ];

    const foodDocIds = [];
    for (const foodItem of foodItemsData) {
      const created = await new Food(foodItem).save();
      foodDocIds.push(created._id);
    }

    restaurant1.foods = foodDocIds;
    await restaurant1.save();

    restaurant2.foods = foodDocIds.slice(4, 16);
    await restaurant2.save();

    console.log(`Successfully seeded ${foodItemsData.length} Veg & Non-Veg gourmet dishes across 3 restaurants!`);
    console.log("Database Seeding Completed Successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Database Seeding Failed:", err);
    process.exit(1);
  }
};

seedDatabase();
