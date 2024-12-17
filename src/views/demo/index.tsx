import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  name: string
  age: number
  height?: number
}
const Template: FC<IProps> = (props) => {
  return (
    <div>
      <div>name:{props.name}</div>
      <div>name:{props.age}</div>
      <div>name:{props.height}</div>
      <div>{props.children}</div>
    </div>
  )
}

export default memo(Template)
