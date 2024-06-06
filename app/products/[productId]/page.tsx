"use client"

import { Splash } from "@/components/auth"
import ProductEditForm from "@/components/productEditForm"
import { fetcher } from "@/utils/fetcher"
import useSWR from "swr"

interface IProductPage {
  params: {
    productId: string
  }
}


function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <p className="text-7xl font-bold">404</p>
      <p className="text-2xl">Product not found</p>
    </div>
  )
}

function ProductPage({params}: IProductPage) {
  const {isLoading, data, error} = useSWR(`https://dummyjson.com/products/${params.productId}`, fetcher)

  if (isLoading) return  <Splash />
  if (error) return <NotFound />
  return <ProductEditForm product={data} />
}

export default ProductPage