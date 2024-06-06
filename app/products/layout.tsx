import Header from "@/components/header";
import { Fragment, PropsWithChildren } from "react";

export default function ProductsLayout({children}: PropsWithChildren) {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  )
}