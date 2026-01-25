import { PrismaClient } from '@ask-the-stars/database';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ take: 5 });
  const makers = await prisma.maker.findMany({ take: 5 });
  const categories = await prisma.category.findMany({ take: 5 });

  console.log('--- USERS ---');
  console.log(users.map(u => ({ id: u.id, email: u.email, role: u.role })));
  console.log('--- MAKERS ---');
  console.log(makers);
  console.log('--- CATEGORIES ---');
  console.log(categories);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
