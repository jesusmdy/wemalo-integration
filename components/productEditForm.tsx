import { TProduct } from "@/types/product"
import { inputClassNames } from "@/utils/classes";
import { useToggle } from "@uidotdev/usehooks";
import Link from "next/link";
import { FC, Fragment } from "react"
import { FormProvider, useForm } from "react-hook-form";

const fullInputClassNames = `${inputClassNames} flex-1 resize-vertical read-only:border-0 read-only:bg-transparent read-only:p-0 read-only:text-zinc-500`
const labelClassNames = "text-xs mb-1 text-zinc-500 dark:text-zinc-400"

interface IProductEditForm {
  product: TProduct;
}

type TForm = Omit<TProduct, "id">

function SavedDialog() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center ">
      <div className="w-full max-w-md bg-white border dark:border-zinc-700 dark:bg-zinc-800 p-4 rounded-md flex flex-col justify-center items-center py-12">
        <p className="text-6xl mb-4">✅</p>
        <p className="text-xl font-bold">Product updated</p>
        <Link href="/products" className="px-4 py-2 bg-purple-500 text-purple-50 mt-4 rounded-md">Continue</Link>
      </div>
    </div>
  )
}

const ProductEditForm: FC<IProductEditForm> = ({product}) => {
  const [loading, toggleLoading] = useToggle()
  const [saved, toggleSaved] = useToggle()
  const [error, toggleError] = useToggle()
  const form = useForm<TForm>({
    defaultValues: product
  })

  async function onSubmit(values: TForm) {
    toggleLoading(true)
    try {
      await fetch('https://dummyjson.com/products/1', {
        method: 'PUT',
        body: JSON.stringify({
          title: 'iPhone Galaxy +1'
        })
      })
      toggleSaved(true)
    } catch(e) {
      toggleError()
      setTimeout(
        () => toggleError(false),
        3000
      )
    } finally {
      toggleLoading(false)
    }
  }

  return (
    <Fragment>
      {
        saved && <SavedDialog />
      }
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-lg border mx-auto mt-4 flex flex-col rounded-md border-inherit bg-white dark:bg-zinc-900"
        >
          <div className="px-4 py-2 border-b border-inherit dark:bg-zinc-800 rounded-t-[inherit] flex">
            <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 flex-1">Edit product</p>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="title" className={labelClassNames}>Product title</label>
              <input type="text" id="title" {...form.register("title")} className={fullInputClassNames} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className={labelClassNames}>Product description</label>
              <textarea id="description" {...form.register("description")} className={fullInputClassNames} />
            </div>
            <div className="border-t dark:border-zinc-700 my-4"></div>
            <div className="flex flex-col">
              <label htmlFor="price" className={labelClassNames}>Product price</label>
              <input type="text" id="price" {...form.register("price")} className={fullInputClassNames} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="sku" className={labelClassNames}>Product SKU</label>
              <input type="text" id="sku" {...form.register("sku")} className={fullInputClassNames} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="stock" className={labelClassNames}>Product stock</label>
              <input type="number" id="stock" {...form.register("stock")} className={fullInputClassNames} />
            </div>
            {
              error && (
                <p className="text-red-500 text-sm">Error updating product</p>
              )
            }
            <div className="flex justify-end">
              {
                loading
                  ? (
                    <div className="size-4 border-2 border-t-purple-500 rounded-full animate-spin" />
                  )
                  : (
                    <button
                      type="submit"
                      className="px-4 py-1 border rounded-md text-sm dark:border-zinc-700"
                      disabled={!form.formState.isValid || !form.formState.touchedFields}
                    >
                      Update
                    </button>
                  )
              }
            </div>
          </div>
        </form>
      </FormProvider>
    </Fragment>
  )
}

export default ProductEditForm