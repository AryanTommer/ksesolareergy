import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@suryaghar.in" },
    update: {},
    create: {
      email: "admin@suryaghar.in",
      name: "Admin",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("Admin user created:", admin.email);

  const settings = await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      phone: "1800-XXX-XXXX",
      whatsapp: "+91 99999-99999",
      email: "info@suryagharup.in",
    },
  });

  console.log("Site settings created:", settings.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
