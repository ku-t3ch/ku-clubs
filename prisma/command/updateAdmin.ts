import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  const { argv } = process;
  const command = argv[2];
  const email = argv[3];

  if (!command || !email) {
    console.log("Please provide command and email");
    console.log("give <email> : give admin");
    console.log("remove <email> : remove admin");
    process.exit(1);
  }

  try {
    switch (command) {
      case "give":
        let checkExisting = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (checkExisting) {
          await prisma.user.update({
            where: {
              email,
            },
            data: {
              isAdmin: true,
            },
          });
        } else {
          throw new Error("User not found");
        }

        break;
      case "remove":
        let checkExisting2 = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!checkExisting2) {
          throw new Error("User not found");
        }

        await prisma.user.update({
          where: {
            email,
          },
          data: {
            isAdmin: false,
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
