"use client"
import { TProduct } from "@/types/product"
import { fetcher } from "@/utils/fetcher"
import _ from "lodash"
import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"
import ProductItem from "./productItem"

function ProducstTable() {
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState<TProduct[]>([])
  
  const skip = useMemo(
    () => {
      if (page === 1) return 0
      return (page - 1) * 10
    },
    [page]
  )

  const {data, isLoading, error} = useSWR(`https://dummyjson.com/products?limit=10&skip=${skip}`, fetcher)

  useEffect(
    () => {
      if (data) {
        setProducts(
          [...products, ...data.products]
        )
      }
    },
    [data]
  )

  function handleLoadMore() {
    setPage(page + 1)
  }
  const rows = [
    "id",
    "title",
    "description",
    "price",
    "stock",
    "sku",
  ]

  return (
    <div className="m-4 border rounded-md bg-white dark:bg-zinc-900 dark:border-zinc-700">
      <div className="p-2 border-b border-b-inherit bg-zinc-100 dark:bg-zinc-800 rounded-t-md flex items-center">
        <h1 className="flex-1">Products</h1>
        {
          isLoading && (
            <div className="size-4 border-2 rounded-full border-t-purple-500 animate-spin"></div>
          )
        }
      </div>
      <div className="flex items-center border-b border-inherit">
        {
          _.map(
            rows,
            (row, index) => (
              <div className="flex-1 border-r last:border-r-0 border-inherit p-2" key={index}>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 truncate capitalize font-bold ">{row}</p>
              </div>
            )
          )
        }
      </div>
      <div className="flex flex-col border-inherit">
        {
          _.map(
            products,
            (product) => <ProductItem product={product} key={product.id} />
          )
        }
        {
          error && products.length === 0 && (
            <div className="p-4 text-center font-bold">No records found</div>
          )
        }
      </div>
      <div className="border-t border-inherit p-2">
        <button
          onClick={handleLoadMore}
          className="border bg-white dark:bg-zinc-800 rounded-md text-sm px-2 py-1 font-semibold border-inherit disabled:text-zinc-300 dark:disabled:text-zinc-600"
          disabled={error}
        >
          Load more ➕
        </button>
      </div>
    </div>
  )
}

export default ProducstTable