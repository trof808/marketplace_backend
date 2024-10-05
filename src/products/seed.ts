import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity'; // Adjust the path as necessary
import { faker } from '@faker-js/faker';
import { AppModule } from '../app.module'; // Adjust the path as necessary
import { NestFactory } from '@nestjs/core';

async function seed() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const dataSource = appContext.get(DataSource); // Get the existing DataSource

  const productRepository = dataSource.getRepository(Product);

  const products = Array.from({ length: 1000 }, () => {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
    };
  });

  await productRepository.save(products);
  console.log('1000 products have been generated and saved to the database.');

  await appContext.close(); // Close the application context
}

seed().catch((error) => {
  console.error('Error seeding products:', error);
});