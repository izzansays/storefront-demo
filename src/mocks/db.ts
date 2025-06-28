import { factory, primaryKey } from "@mswjs/data"
import type { Product } from "../types/Product"
import { faker } from '@faker-js/faker'

faker.seed(4128)

export const db = factory({
  product: {
    id: primaryKey(faker.string.nanoid),
    image: () => faker.image.urlPicsumPhotos({ width: 500, height: 500, grayscale: false, blur: 0 }),
    name: () => faker.commerce.productName(),
    price: () => Number(faker.commerce.price({ min: 10, max: 1000 })),
    description: () => faker.commerce.productDescription(),
    length: () => faker.number.int({ min: 10, max: 100 }),
    width: () => faker.number.int({ min: 10, max: 100 }),
    height: () => faker.number.int({ min: 10, max: 100 }),
    weight: () => faker.number.int({ min: 1, max: 20 }),
    colour: () => faker.color.human(),
  },
})

export const products: Product[] = Array.from({ length: 20 }, () => db.product.create())