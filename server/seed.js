const mongoose = require('mongoose');
const Car = require('./models/Car');
require('dotenv').config();

const vehicles = [
  {
    name: 'Canam MAVERICK TURBO',
    brand: 'Can-Am',
    model: 'Maverick Turbo',
    year: 2024,
    pricePerDay: 1100,
    price30min: 600,
    price60min: 1100,
    currency: 'AED',
    seats: 2,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    image: '/assets/vehicles/canam-maverick-turbo.jpg',
    description: 'Powerful turbocharged 2-seater for extreme desert adventures',
    available: true
  },
  {
    name: 'Polaris RZR1000',
    brand: 'Polaris',
    model: 'RZR 1000',
    year: 2024,
    pricePerDay: 650,
    price30min: 350,
    price60min: 650,
    currency: 'AED',
    seats: 2,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    image: '/assets/vehicles/polaris-rzr1000.jpg',
    description: 'High-performance 2-seater RZR for thrilling desert rides',
    available: true
  },
  {
    name: 'Polaris RZR1000 Four Seater',
    brand: 'Polaris',
    model: 'RZR 1000 XP',
    year: 2024,
    pricePerDay: 750,
    price30min: 400,
    price60min: 750,
    currency: 'AED',
    seats: 4,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    image: '/assets/vehicles/polaris-rzr1000-4seater.jpg',
    description: 'Spacious 4-seater perfect for family desert adventures',
    available: true
  },
  {
    name: 'DIRT BIKE',
    brand: 'KTM',
    model: 'Dirt Bike',
    year: 2024,
    pricePerDay: 600,
    price30min: 300,
    price60min: 600,
    currency: 'AED',
    seats: 1,
    transmission: 'Manual',
    fuelType: 'Petrol',
    image: '/assets/vehicles/dirt-bike.jpg',
    description: 'Professional motocross bike for extreme off-road riding',
    available: true
  },
  {
    name: 'CanAm Maverick XRS 2 Seater',
    brand: 'Can-Am',
    model: 'Maverick XRS',
    year: 2024,
    pricePerDay: 1400,
    price30min: 700,
    price60min: 1400,
    currency: 'AED',
    seats: 2,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    image: '/assets/vehicles/canam-maverick-xrs.jpg',
    description: 'Premium 2-seater XRS with advanced suspension and power',
    available: true
  },
  {
    name: 'Raptor 700',
    brand: 'Yamaha',
    model: 'Raptor 700',
    year: 2024,
    pricePerDay: 550,
    price30min: 300,
    price60min: 550,
    currency: 'AED',
    seats: 1,
    transmission: 'Manual',
    fuelType: 'Petrol',
    image: '/assets/vehicles/raptor-700.jpg',
    description: 'Powerful single-seater ATV for solo desert exploration',
    available: true
  },
  {
    name: 'Quad Bike Single Seater',
    brand: 'KYMCO',
    model: 'Quad Bike',
    year: 2024,
    pricePerDay: 200,
    price30min: 100,
    price60min: 200,
    currency: 'AED',
    seats: 1,
    transmission: 'Manual',
    fuelType: 'Petrol',
    image: '/assets/vehicles/quad-bike-single.jpg',
    description: 'Affordable single-seater quad bike for beginners',
    available: true
  },
  {
    name: 'Quad Bike 2 Seater',
    brand: 'KYMCO',
    model: 'Quad Bike 2 Seater',
    year: 2024,
    pricePerDay: 275,
    price30min: 150,
    price60min: 275,
    currency: 'AED',
    seats: 2,
    transmission: 'Manual',
    fuelType: 'Petrol',
    image: '/assets/vehicles/quad-bike-2seater.jpg',
    description: 'Comfortable 2-seater quad bike for couples',
    available: true
  },
  {
    name: 'Polaris RZR XP 1000',
    brand: 'Polaris',
    model: 'RZR XP 1000',
    year: 2024,
    pricePerDay: 800,
    price30min: 450,
    price60min: 800,
    currency: 'AED',
    seats: 2,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    image: '/assets/vehicles/polaris-rzr-xp-1000.jpg',
    description: 'Premium XP model with enhanced performance and comfort',
    available: true
  },
  {
    name: 'Can-Am Maverick X3',
    brand: 'Can-Am',
    model: 'Maverick X3',
    year: 2024,
    pricePerDay: 1200,
    price30min: 650,
    price60min: 1200,
    currency: 'AED',
    seats: 2,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    image: '/assets/vehicles/canam-maverick-x3.jpg',
    description: 'Ultimate performance machine for serious off-road enthusiasts',
    available: true
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rental-car-booking', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing cars
    await Car.deleteMany({});
    console.log('Cleared existing cars');

    // Insert new vehicles
    await Car.insertMany(vehicles);
    console.log(`Seeded ${vehicles.length} vehicles`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

