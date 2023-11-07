import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  //init campus
  const isCampusExist = await prisma.campus.findMany();
  if (isCampusExist.length === 0) {
    await prisma.campus.createMany({
      data: [
        {
          name: "วิทยาเขตบางเขน",
        },
        {
          name: "วิทยาเขตกำแพงแสน",
        },
        {
          name: "วิทยาเขตศรีราชา",
        },
        {
          name: "วิทยาเขตเฉลิมพระเกียรติ จังหวัดสกลนคร",
        },
        {
          name: "โครงการจัดตั้ง วิทยาเขตสุพรรณบุรี",
        },
      ],
    });
  }

  // init club type
  const isClubTypeExist = await prisma.clubType.findMany();
  if (isClubTypeExist.length === 0) {
    await prisma.clubType.createMany({
      data: [
        {
          name: "วิชาการ",
        },
        {
          name: "ศิลปะวัฒนธรรม",
        },
        {
          name: "กีฬา",
        },
        {
          name: "เทคโนโลยี",
        },
        {
          name: "บำเพ็ญประโยชน์",
        },
      ],
    });
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
