import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create users
  console.log("Creating users...");
  const user1 = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: await bcrypt.hash("password123", 10),
      role: "SUPER_ADMIN",
    },
  });

  console.log("Creating store owner...");
  const user2 = await prisma.user.upsert({
    where: { email: "storeowner@example.com" },
    update: {},
    create: {
      name: "Store Owner",
      email: "storeowner@example.com",
      password: await bcrypt.hash("password123", 10),
      role: "STORE_OWNER",
    },
  });

  // Create a store
  console.log("Creating store...");
  const store = await prisma.store.create({
    data: {
      name: "TechStore",
      ownerId: user2.id,
    },
  });

  console.log("Assigning user1 to store...");
  // Assign user2 to store
  await prisma.storeUser.create({
    data: {
      userId: user2.id,
      storeId: store.id,
      role: "ADMIN",
    },
  });

  // Create categories
  console.log("Creating categories...");
  const category = await prisma.category.create({
    data: {
      name: "Electronics",
      storeId: store.id,
    },
  });

  // Create products
  console.log("Creating products...");
  const product1 = await prisma.product.create({
    data: {
      name: "Laptop",
      description: "A powerful laptop",
      price: 1200.0,
      stock: 10,
      storeId: store.id,
      categoryId: category.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Smartphone",
      description: "Latest model smartphone",
      price: 800.0,
      stock: 15,
      storeId: store.id,
      categoryId: category.id,
    },
  });

  // Create an order
  console.log("Creating order...");
  const order = await prisma.order.create({
    data: {
      storeId: store.id,
      status: "PENDING",
      total: 2000.0,
      orderItems: {
        create: [
          {
            productId: product1.id,
            quantity: 1,
            price: product1.price,
          },
          {
            productId: product2.id,
            quantity: 1,
            price: product2.price,
          },
        ],
      },
      details: {
        create: {
          customerName: "John Doe",
          email: "johndoe@example.com",
          phoneNumber: "1234567890",
          address: "123 Main St",
          city: "New York",
          state: "NY",
          postalCode: "10001",
          country: "USA",
        },
      },
    },
  });

  // Create payment for the order
  console.log("Creating payment...");
  await prisma.payment.create({
    data: {
      orderId: order.id,
      amount: order.total,
      status: "PENDING",
    },
  });

  console.log("Database seeded successfully");
}
console.log("Seeding database...");
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Closing the database connection...");
    await prisma.$disconnect();
  });
