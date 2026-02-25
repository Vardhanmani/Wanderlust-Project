const listings = [
  {
    title: "Modern City Apartment",
    description: "A modern apartment in the heart of the city.",
    image: { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60" },
    price: 2200,
    location: "Bangalore",
    country: "India",
  },
  {
    title: "Cozy Mountain Cabin",
    description: "A peaceful cabin surrounded by mountains.",
    image: { url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60" },
    price: 1500,
    location: "Manali",
    country: "India",
  },
  {
    title: "Beachside Villa",
    description: "A relaxing villa near the beach with stunning views.",
    image: { url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60" },
    price: 2800,
    location: "Goa",
    country: "India",
  },
  {
    title: "Luxury Desert Villa",
    description: "A luxury villa with a private pool in the desert.",
    image: { url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60" },
    price: 3500,
    location: "Dubai",
    country: "UAE",
  },
  {
    title: "Paris Studio Apartment",
    description: "A charming studio apartment near Eiffel Tower.",
    image: { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60" },
    price: 3000,
    location: "Paris",
    country: "France",
  },

  // -------- COPY PATTERN CONTINUES --------

  {
    title: "Lake View Cottage",
    description: "A calm cottage with beautiful lake views.",
    image: { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=60" },
    price: 2000,
    location: "Udaipur",
    country: "India",
  },
  {
    title: "Forest Tree House",
    description: "Live close to nature in this forest tree house.",
    image: { url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=60" },
    price: 1800,
    location: "Wayanad",
    country: "India",
  },
  {
    title: "Snowy Mountain Chalet",
    description: "A cozy chalet surrounded by snow-covered mountains.",
    image: { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60" },
    price: 2600,
    location: "Shimla",
    country: "India",
  },
  {
    title: "City Penthouse",
    description: "A premium penthouse with skyline views.",
    image: { url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60" },
    price: 4200,
    location: "Mumbai",
    country: "India",
  },
  {
    title: "Countryside Farmhouse",
    description: "A spacious farmhouse away from city noise.",
    image: { url: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=800&q=60" },
    price: 1700,
    location: "Punjab",
    country: "India",
  },

  {
  title: "Luxury Lake View Villa",
  description: "A luxury villa overlooking a serene lake.",
  image: {
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=60",
  },
  price: 3200,
  location: "Udaipur",
  country: "India",
},
{
  title: "Hilltop Wooden Cottage",
  description: "A wooden cottage located on a peaceful hilltop.",
  image: {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60",
  },
  price: 1900,
  location: "Ooty",
  country: "India",
},
{
  title: "Downtown Studio Flat",
  description: "A compact studio flat in the city center.",
  image: {
    url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
  },
  price: 2100,
  location: "Hyderabad",
  country: "India",
},
{
  title: "Riverside Bamboo Hut",
  description: "A peaceful bamboo hut beside a flowing river.",
  image: {
    url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=60",
  },
  price: 1400,
  location: "Rishikesh",
  country: "India",
},
{
  title: "Heritage Palace Stay",
  description: "Experience royal living in a heritage palace.",
  image: {
    url: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=800&q=60",
  },
  price: 4200,
  location: "Jaipur",
  country: "India",
},
{
  title: "Minimalist White Apartment",
  description: "A clean and minimalist apartment with modern design.",
  image: {
    url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=60",
  },
  price: 2300,
  location: "Chennai",
  country: "India",
},
{
  title: "Countryside Stone House",
  description: "A charming stone house surrounded by greenery.",
  image: {
    url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=60",
  },
  price: 1600,
  location: "Coorg",
  country: "India",
},
{
  title: "Seafront Glass Villa",
  description: "A modern glass villa with direct sea views.",
  image: {
    url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
  },
  price: 5000,
  location: "Malibu",
  country: "USA",
},
{
  title: "Urban Loft Apartment",
  description: "A stylish loft apartment with open interiors.",
  image: {
    url: "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&w=800&q=60",
  },
  price: 2700,
  location: "New York",
  country: "USA",
},
{
  title: "Tropical Jungle Retreat",
  description: "A hidden retreat surrounded by tropical forest.",
  image: {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
  },
  price: 1850,
  location: "Bali",
  country: "Indonesia",
},
{
  title: "Snow View Mountain Home",
  description: "A cozy home with stunning snow-covered mountain views.",
  image: {
    url: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=800&q=60",
  },
  price: 2600,
  location: "Gulmarg",
  country: "India",
},
{
  title: "Business Class Service Apartment",
  description: "Perfect for business travelers with premium facilities.",
  image: {
    url: "https://images.unsplash.com/photo-1560448071-98a9c6f5b1c1?auto=format&fit=crop&w=800&q=60",
  },
  price: 2400,
  location: "Pune",
  country: "India",
},
{
  title: "Old Town European Flat",
  description: "A classic flat in the heart of old town.",
  image: {
    url: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=60",
  },
  price: 3100,
  location: "Prague",
  country: "Czech Republic",
},
{
  title: "Cliffside Ocean Bungalow",
  description: "A breathtaking bungalow perched on a cliff.",
  image: {
    url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60",
  },
  price: 4800,
  location: "Santorini",
  country: "Greece",
},
{
  title: "Modern Suburban Home",
  description: "A peaceful home in a quiet suburban neighborhood.",
  image: {
    url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=60",
  },
  price: 2000,
  location: "Austin",
  country: "USA",
}

  
  
];

module.exports = listings;
