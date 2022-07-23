import { FC } from 'react'
import { Area, Areas } from '../types'
import { AreaContainer } from './AreaContainer'
import { MyTextArea } from './MyTextArea'

type Props = {
  area: Area
  areas: Areas
}

export const AreaView: FC<Props> = ({ area, areas }) => {
  if (area.type === 'text') {
    return <MyTextArea area={area} />
  } else {
    return <AreaContainer area={area} areas={areas} />
  }
}
