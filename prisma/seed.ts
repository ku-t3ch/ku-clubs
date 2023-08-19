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

  // init club
  const isClubExist = await prisma.club.findMany();
  if (isClubExist.length === 0) {
    await prisma.club.create({
      data: {
        name: "Club 1",
        detail: `<h1><strong class="nextui-c-PJLV nextui-c-PJLV-ijnlmIz-css text-[2rem] transition-all duration-200 md:text-[3rem]">KU Tech คืออะไร ?</strong></h1>
            <div class="text-[1.2rem] md:text-[1.5rem]">KU Tech คือ การรวมกลุ่มนิสิตที่มีความสนใจด้านเทคโนโลยีเข้าด้วยกันเพื่อสร้างและพัฒนาเทคโนโลยีที่สามารถใช้งานได้จริงและสร้างประโยชน์ต่อมหาวิทยาลัยและสังคม โดยให้เน้นการพัฒนาศักยภาพของนิสิตด้านเทคโนโลยี นอกจากนี้ยังเป็นที่รวบรวมนิสิตที่มีความสนใจด้านเทคโนโลยีเพื่อสร้างพื้นที่ในการแลกเปลี่ยนความรู้ และสร้างความสัมพันธ์ที่ดีกันระหว่างนิสิตในชมรม KU Tech อีกด้วย</div>
            `,
        logo: "https://tech.nisit.ku.ac.th/logo/KUTechWhite.png",
        campus: {
          connect: {
            name: "วิทยาเขตบางเขน",
          },
        },
        owner: {
          connect: {
            email: "teerut.sr@ku.th",
          },
        },
      },
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
          name: "วัฒนธรรม",
        },
        {
          name: "ศิลปะ",
        },
        {
          name: "กีฬา",
        },
        {
          name: "สังคม",
        },
        {
          name: "สิ่งแวดล้อม",
        },
        {
          name: "สุขภาพ",
        },
        {
          name: "เทคโนโลยี",
        },
        {
          name: "อาชีพ",
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
