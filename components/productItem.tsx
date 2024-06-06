"use client"

import { TProduct } from "@/types/product"
import { useToggle } from "@uidotdev/usehooks"
import _ from "lodash"
import Link from "next/link"
import { FC, useMemo } from "react"

function toCurrency(number: number) {
  return new Intl.NumberFormat("en-US", {currency: "USD"}).format(Math.abs(number))
}

const ProductItem: FC<{
  product: TProduct
}> = ({product}) => {
  const [truncate, toggleTruncate] = useToggle(true)
  const columns = useMemo(
    () => (
      [
        {
          label: "ID",
          value: product.id
        },
        {
          label: "Title",
          value: product.title
        },
        {
          label: "Description",
          value: product.description,
          onClick: toggleTruncate
        },
        {
          label: "Price",
          value: toCurrency(product.price)
        },
        {
          label: "Stock",
          value: `${product.stock} In stock`
        },
        {
          label: "SKU",
          value: product.sku
        },
      ]
    ),
    [product]
  )
  return (
    <div className="border-b relative dark:border-zinc-700 even:bg-zinc-200 dark:even:bg-zinc-800 last:border-b-0 flex">
      <div className="absolute right-0 top-0 p-1 border-inherit">
        <Link href={`/products/${product.id}`} className="size-6 border text-xs bg-zinc-300 dark:bg-zinc-800 flex items-center justify-center border-inherit rounded-md">{"✏️"}</Link>
      </div>
      {
        _.map(
          columns,
          (column, key) => (
            <div
              className={
                ` w-1/6 flex-1 border-r border-inherit last:border-r-0 p-2 ${column.onClick && "cursor-pointer hover:opacity-90"}`
              }
              key={key}
              onClick={column.onClick as never}
            >
              <p className={`text-xs text-zinc-600 dark:text-zinc-300  ${truncate ? "truncate" : ""}`}>{column.value}</p>
            </div>
          )
        )
      }
    </div>
  )
}

export default ProductItem