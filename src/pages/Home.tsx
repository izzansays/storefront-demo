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
            <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-10 gap-8">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Home</h1>
                    <p className="text-gray-500">View all products for sale</p>
                </div>
                <div className="flex gap-4 flex-col lg:flex-row">
                    <label>
                        Sort by:
                        <select value={sortBy} onChange={handleSortChange} className="ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2">
                            {SORT_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Items per page:
                        <select value={limit} onChange={handleLimitChange} className="ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2">
                            {LIMIT_OPTIONS.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-8">
                {data.data.map((product) => (
                    <Link to={`product/${product.id}`} key={product.id}>
                        <div className="w-full aspect-[1/1] bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img src={product.image} className="w-full h-full object-cover" />
                        </div>
                        <p className="font-semibold mt-2">{product.name}</p>
                        <p>${product.price}</p>
                    </Link>
                ))}
            </div>
            <div className="max-w-fit mx-auto">
                <button className="mx-1 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 hover:cursor-pointer disabled:border-gray-400 disabled:bg-gray-200 disabled:opacity-25 disabled:cursor-not-allowed" onClick={handlePrevPage} disabled={page <= 1}>Previous</button>
                {Array.from({ length: data.totalPages }, (_, i) => {
                    const pageNum = i + 1;
                    if (pageNum === page) {
                        return (
                            <button key={pageNum} className="mx-1 px-2 py-1 rounded bg-blue-500 text-white">{pageNum}</button>
                        )
                    }
                    return (
                        <button
                            key={pageNum}
                            className="mx-1 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
                            onClick={() => setSearchParams({ sortBy, page: String(pageNum), limit: String(limit) })}
                        >
                            {pageNum}
                        </button>
                    )
                })}
                <button className="mx-1 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 hover:cursor-pointer disabled:border-gray-400 disabled:bg-gray-200 disabled:opacity-25 disabled:cursor-not-allowed" onClick={handleNextPage} disabled={page === data.totalPages}>Next</button>
            </div>
        </div>
    )
}