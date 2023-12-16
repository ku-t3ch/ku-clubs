import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  //init campus
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
    skipDuplicates: true,
  });

  // init club type
  await prisma.clubType.createMany({
    data: [
      {
        name: "องค์การนิสิต",
      },
      {
        name: "สโมสรนิสิต",
      },
      {
        name: "ชุมนุมนิสิต",
      },
      {
        name: "ชมรมวิชาการ",
      },
      {
        name: "ชมรมศิลปวัฒนธรรม",
      },
      {
        name: "ชมรมบำเพ็ญประโยชน์",
      },
      {
        name: "ชมรมกีฬา",
      },
      {
        name: "กลุ่มกิจกรรม",
      },
    ],
    skipDuplicates: true,
  });

  // init event category
  await prisma.eventCategorie.createMany({
    data: [
      { name: "ศิลปะ & การออกแบบ" },
      { name: "ความงาม" },
      { name: "หนังสือ" },
      { name: "ธุรกิจ" },
      { name: "การกุศล" },
      { name: "ตลก" },
      { name: "คอนเสิร์ต" },
      { name: "การศึกษา" },
      { name: "อีสปอร์ต" },
      { name: "แฟชั่น" },
      { name: "การเงิน & การบัญชี" },
      { name: "อาหาร & เครื่องดื่ม" },
      { name: "บริการจัดส่งอาหาร" },
      { name: "เกม" },
      { name: "สุขภาพ" },
      { name: "งานอดิเรก & ความสนใจพิเศษ" },
      { name: "บ้าน & เฟอร์นิเจอร์" },
      { name: "งานหอการค้า" },
      { name: "เด็ก & ครอบครัว" },
      { name: "ภาพยนตร์" },
      { name: "เทศกาลดนตรี" },
      { name: "ชีวิตกลางคืน" },
      { name: "ปาร์ตี้" },
      { name: "ศิลปะการแสดง" },
      { name: "อสังหาริมทรัพย์" },
      { name: "วิ่ง" },
      { name: "การขาย & การตลาด" },
      { name: "กิจกรรมโรงเรียน" },
      { name: "จิตวิญญาณ" },
      { name: "กีฬา" },
      { name: "ละครเวที" },
      { name: "ทอล์กโชว์" },
      { name: "เทคโนโลยี" },
      { name: "ท่องเที่ยว" },
      { name: "ยานพาหนะ" },
      { name: "ประสบการณ์" },
    ],
    skipDuplicates: true,
  });

  // init event type
  await prisma.eventType.createMany({
    data: [
      { name: "ปาร์ตี้" },
      { name: "คอนเสิร์ต" },
      { name: "มินิคอนเสิร์ต" },
      { name: "เทศกาล" },
      { name: "มีทแอนด์กรีท" },
      { name: "วิ่ง" },
      { name: "ปั่นจักรยาน" },
      { name: "มวย" },
      { name: "ฟิตเนส" },
      { name: "อีสปอร์ต" },
      { name: "ทัวร์นาเมนท์" },
      { name: "ลีก" },
      { name: "เวิร์คช็อป" },
      { name: "คลาส" },
      { name: "แอคติเวชั่น" },
      { name: "แถลงข่าว" },
      { name: "การกุศล" },
      { name: "เน็ตเวิร์กกิ้ง" },
      { name: "ท่องเที่ยว" },
      { name: "ถ่ายภาพ" },
      { name: "งานแต่งงาน" },
      { name: "อินเซนทีฟ" },
      { name: "การแสดง" },
      { name: "ประกวด" },
      { name: "มีทอัพ" },
      { name: "แคมป์" },
      { name: "สัมมนา" },
      { name: "เอ็กซ์โป" },
      { name: "นิทรรศการ" },
      { name: "งานแสดงสินค้า" },
      { name: "สัมนาเชิงปฏิบัติการ" },
      { name: "การประชุม" },
      { name: "ระดมทุน" },
      { name: "เวบินาร์" },
      { name: "วิ่งออนไลน์" },
      { name: "คอร์สออนไลน์" },
      { name: "ไลฟ์สตรีม" },
      { name: "เอ็กซ์โปออนไลน์" },
    ],
    skipDuplicates: true,
  });
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
