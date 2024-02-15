import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  const { argv } = process;
  const command = argv[2];
  const email = argv[3];

  if (!command || !email) {
    console.log("remove <email> : remove user");
    process.exit(1);
  }

  try {
    switch (command) {
      case "remove":
        await prisma.user.delete({
          where: {
            email,
          },
          include: {
            accounts: true,
          },
        });
        break;
      default:
        break;
    }
  } catch (error: any) {
    console.log("-------------");
    console.log(error.message);
    console.log("-------------");
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
