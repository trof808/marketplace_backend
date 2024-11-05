import { Product } from '../entities/product.entity'
import { FormattedProduct } from '../products.service'

export function formatProduct(product: Product): FormattedProduct {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: {
      amount: product.price,
      currency: product.currency,
    },
    categoryId: 0,
    availableCount: product.availableCount,
  };
}