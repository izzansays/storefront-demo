import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { Link, useSearchParams } from "wouter";


export default function Home() {
    const [data, setData] = useState<{ data: Product[], totalPages: number } | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const sortBy = searchParams.get('sortBy') || 'name'
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)

    const SORT_OPTIONS = [
        { value: 'name', label: 'Name A-Z' },
        { value: 'name_desc', label: 'Name Z-A' },
        { value: 'price', label: 'Price Low-High' },
        { value: 'price_desc', label: 'Price High-Low' },
    ]
    const LIMIT_OPTIONS = [5, 10, 20]

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`/product?sortBy=${sortBy}&page=${page}&limit=${limit}`)
                if (!res.ok) throw new Error('Failed to fetch products')
                const json = await res.json()
                setData(json)
            } catch (err: any) {
                setError(err.message || 'Unknown error')
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [sortBy, page, limit])

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams({ sortBy: e.target.value, page: '1', limit: String(limit) })
    }
    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams({ sortBy, page: '1', limit: e.target.value })
    }
    const handlePrevPage = () => {
        if (page > 1) setSearchParams({ sortBy, page: String(page - 1), limit: String(limit) })
    }
    const handleNextPage = () => {
        setSearchParams({ sortBy, page: String(page + 1), limit: String(limit) })
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!data) return null;

    return (
        <div>
            <h1>Home</h1>
            <div>
                <label>
                    Sort by:
                    <select value={sortBy} onChange={handleSortChange}>
                        {SORT_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Items per page:
                    <select value={limit} onChange={handleLimitChange}>
                        {LIMIT_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                {data.data.map((product) => (
                    <Link to={`product/${product.id}`} key={product.id}>
                        <img src={product.image} style={{ width: 200, height: 200 }} />
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                    </Link>
                ))}
            </div>
            <div>
                <button onClick={handlePrevPage} disabled={page <= 1}>Previous</button>
                <span>Page {page}</span>
                <button onClick={handleNextPage} disabled={page === data.totalPages}>Next</button>
            </div>
        </div>
    )
}