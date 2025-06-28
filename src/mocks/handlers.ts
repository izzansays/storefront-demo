import { http, HttpResponse } from 'msw'
import { db } from './db'
import type { Product } from '../types/Product'

export const handlers = [
    // GET /product?sortBy=name&limit=10&page=2
    http.get('/product', ({ request }) => {
        const url = new URL(request.url)
        const sortBy = url.searchParams.get('sortBy') || 'name'
        const limit = parseInt(url.searchParams.get('limit') || '10', 10)
        const page = parseInt(url.searchParams.get('page') || '1', 10)

        let orderBy
        switch (sortBy) {
            case 'name':
                orderBy = [{ name: 'asc' as const }]
                break
            case 'name_desc':
                orderBy = [{ name: 'desc' as const }]
                break
            case 'price':
                orderBy = [{ price: 'asc' as const }]
                break
            case 'price_desc':
                orderBy = [{ price: 'desc' as const }]
                break
            default:
                orderBy = [{ name: 'asc' as const }]
        }

        const result = db.product.findMany({
            orderBy,
            skip: (page - 1) * limit,
            take: limit,
        }) as Product[]

        const total = db.product.count()
        const totalPages = Math.ceil(total / limit)

        return HttpResponse.json({
            data: result,
            totalPages,
        })
    }),

    // GET /product/:id
    http.get('/product/:id', ({ params }) => {
        const product = db.product.findFirst({
            where: { id: { equals: params.id as string } },
        })
        if (!product) {
            return HttpResponse.json({ message: 'Product not found' }, { status: 404 })
        }
        return HttpResponse.json(product)
    }),
]
