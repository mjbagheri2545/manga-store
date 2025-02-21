import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: "دسته بندی ۱۱", slug: "category-asdasdad" },
      { name: "دسته بندی ۱۲", slug: "category-asda" },
      { name: "۱دسته بندی ۳", slug: "category-gsdfgfdsas" },
      { name: "۱دسته بندی ۴", slug: "category-qqeqw" },
      { name: "۱دسته بندی ۵", slug: "category-fddfg" },
      { name: "۱دسته بندی ۶", slug: "category-fsd" },
      { name: "۱دسته بندی ۷", slug: "category-sexczvxdgven" },
      { name: "۱دسته بندی ۸", slug: "category-eighbfghfgt" },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
