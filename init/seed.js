const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcryptjs");
const listings = require("./data");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database started...");

  const hashedPassword = await bcrypt.hash("password123", 12);

  // ✅ UPSERT USER (NO DUPLICATE ERROR)
  const user = await prisma.user.upsert({
    where: { email: "demo@gmail.com" },
    update: {}, // nothing to update
    create: {
      username: "demo_user",
      email: "demo@gmail.com",
      password: hashedPassword,
    },
  });

  console.log("👤 Using user:", user.email);

  // OPTIONAL: clear old listings before re-seeding
  await prisma.listing.deleteMany({
    where: { ownerId: user.id },
  });

  // INSERT LISTINGS
  for (let listing of listings) {
    await prisma.listing.create({
      data: {
        title: listing.title,
        description: listing.description,
        imageUrl: listing.image.url,
        price: listing.price,
        location: listing.location,
        country: listing.country,
        ownerId: user.id,
      },
    });
  }

  console.log("🏡 Listings seeded successfully!");
}

main()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
