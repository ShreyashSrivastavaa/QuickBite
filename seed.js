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
    console.log("Created default Admin accounts: admin@zymeal.com & admin@quickbite.com / Admin@123456");

    // Seed Sample User Accounts
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
    console.log("Created default User accounts: user@zymeal.com & user@quickbite.com / User@123456");

    // Seed Sample Restaurants & Foods in INR (₹)
    const restaurant1 = new Restaurant({
      name: "The Royal Spice Kitchen",
      foodType: "North Indian, Biryani, Mughlai",
      pincode: "201309",
      address: "Sector 62, Noida, Uttar Pradesh",
      phone: "+91 9876543211",
      rating: { rate: 4.9, count: 320 },
      images: ["https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80"],
      isOpen: true,
    });

    const food1 = await new Food({
      name: "Hyderabadi Dum Chicken Biryani",
      description: "Fragrant basmati rice slow-cooked with tender marinated chicken, saffron, and aromatic spices.",
      category: "Biryani",
      price: 349,
      readyTime: 25,
      rating: { rate: 4.9, count: 210 },
      images: ["https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"],
      isAvailable: true,
    }).save();

    const food2 = await new Food({
      name: "Truffle Smash Cheeseburger",
      description: "Double Angus beef patty, black truffle mayo, melted cheddar, and caramelized onions on toasted brioche.",
      category: "Burgers",
      price: 299,
      readyTime: 20,
      rating: { rate: 4.8, count: 145 },
      images: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"],
      isAvailable: true,
    }).save();

    const food3 = await new Food({
      name: "Artisan Wood-Fired Margherita Pizza",
      description: "San Marzano tomato sauce, fresh buffalo mozzarella, aromatic basil leaves, and extra virgin olive oil.",
      category: "Pizza",
      price: 499,
      readyTime: 25,
      rating: { rate: 4.9, count: 180 },
      images: ["https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80"],
      isAvailable: true,
    }).save();

    const food4 = await new Food({
      name: "Crispy Peri-Peri Garlic Fries",
      description: "Hand-cut golden fries tossed with spicy African bird's eye chili seasoning and garlic dip.",
      category: "Sides",
      price: 149,
      readyTime: 12,
      rating: { rate: 4.7, count: 95 },
      images: ["https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80"],
      isAvailable: true,
    }).save();

    const food5 = await new Food({
      name: "Belgian Chocolate Lava Cake",
      description: "Warm, gooey chocolate cake filled with molten Belgian dark chocolate lava, served with vanilla bean scoop.",
      category: "Desserts",
      price: 199,
      readyTime: 15,
      rating: { rate: 4.9, count: 310 },
      images: ["https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"],
      isAvailable: true,
    }).save();

    const food6 = await new Food({
      name: "Mango Passionfruit Mocktail",
      description: "Refreshing blend of fresh Alphonso mango pulp, passionfruit, mint leaves, sparkling soda, and lime.",
      category: "Beverages",
      price: 129,
      readyTime: 10,
      rating: { rate: 4.8, count: 88 },
      images: ["https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"],
      isAvailable: true,
    }).save();

    restaurant1.foods.push(food1._id, food2._id, food3._id, food4._id, food5._id, food6._id);
    await restaurant1.save();

    console.log("Seeded sample restaurant and 6 menu food items in INR (₹) successfully.");
    console.log("Database Seeding Completed Successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Database Seeding Failed:", err);
    process.exit(1);
  }
};

seedDatabase();
