import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}
const Ablum: FC<IProps> = () => {
  return <div>Ablum</div>
}

export default memo(Ablum)
