import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity'; // Adjust the path as necessary
import { faker } from '@faker-js/faker';
import { AppModule } from '../app.module'; // Adjust the path as necessary
import { NestFactory } from '@nestjs/core';

async function seed() {
  // args from command line
  const args = process.argv.slice(2);
  const productCount = parseInt(args[0]) || 1000; // count of products
  const clearFlag = args.includes('--clear'); // flag for clearing prev values
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const dataSource = appContext.get(DataSource); // Get the existing DataSource

  const productRepository = dataSource.getRepository(Product);

  if (clearFlag) {
    await dataSource.query('TRUNCATE TABLE "cart_item", "cart", "product" RESTART IDENTITY CASCADE');
  }

  const products = Array.from({ length: productCount }, () => {
    return {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      currency: faker.helpers.arrayElement(['USD']),
      availableCount: faker.number.int({ min: 1, max: 5 })
    };
  });

  await productRepository.save(products);
  console.log(`${productCount} products have been generated and saved to the database. ${clearFlag ? 'The previous values have been deleted.' : ''}`);

  await appContext.close(); // Close the application context
}

seed().catch((error) => {
  console.error('Error seeding products:', error);
});
