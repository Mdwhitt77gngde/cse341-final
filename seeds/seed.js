// seeds/seed.js
require('dotenv').config();
const mongodb = require('../data/database');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

async function run() {
  mongodb.initDb(async (err) => {
    if (err) {
      console.error('DB init failed:', err);
      process.exit(1);
    }
    try {
      const db = mongodb.getDatabase().db();

      console.log('Clearing collections...');
      await db.collection('authors').deleteMany({});
      await db.collection('books').deleteMany({});
      await db.collection('users').deleteMany({});

      console.log('Inserting authors...');
      const authorRes = await db.collection('authors').insertMany([
        {
          _id: new ObjectId('650a1b2c3d4e5f0012345678'),
          firstName: 'Jane',
          lastName: 'Austen',
          bio: 'English novelist known for Pride and Prejudice.',
          birthdate: '1775-12-16',
          nationality: 'British'
        },
        {
          _id: new ObjectId('650a1b2c3d4e5f0012345679'),
          firstName: 'Mark',
          lastName: 'Twain',
          bio: 'American writer known for Adventures of Huckleberry Finn.',
          birthdate: '1835-11-30',
          nationality: 'American'
        }
      ]);

      console.log('Inserting books...');
      await db.collection('books').insertMany([
        {
          title: 'Pride and Prejudice',
          authorId: authorRes.insertedIds['0'],
          isbn: '978-0141199078',
          publisher: 'Penguin',
          publishedDate: '1813-01-28',
          pages: 279,
          genre: 'Classic',
          summary: 'A novel about manners and marriage in early 19th-century England.'
        },
        {
          title: 'Adventures of Huckleberry Finn',
          authorId: authorRes.insertedIds['1'],
          isbn: '978-0142437179',
          publisher: 'Penguin',
          publishedDate: '1884-12-10',
          pages: 366,
          genre: 'Classic',
          summary: 'A young boy\'s adventures on the Mississippi River.'
        }
      ]);

      console.log('Inserting test user...');
      const plainPassword = 'Password123!';
      const hash = await bcrypt.hash(plainPassword, 10);
      await db.collection('users').insertOne({
        email: 'test@example.com',
        password: hash,
        name: 'Test User',
        createdAt: new Date()
      });

      console.log('Seeding complete.');
      console.log('Test user credentials: test@example.com / Password123!');
      process.exit(0);
    } catch (err) {
      console.error('Seeding error:', err);
      process.exit(1);
    }
  });
}

run();
