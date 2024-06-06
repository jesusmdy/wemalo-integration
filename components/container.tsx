import React, { FC, PropsWithChildren } from 'react'

const Container: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="max-w-screen-xl mx-auto border-x dark:border-zinc-700 h-screen overflow-auto">{children}</div>
  )
}

export default Container