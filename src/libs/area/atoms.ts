import { atom } from 'recoil'
import { Areas } from './types'

const rootId = 'root'

export const areasState = atom<Areas>({
  key: 'Areas',
  default: {
    rootId,
    areas: {
      [rootId]: {
        id: rootId,
        type: 'text',
        text: '',
      },
    },
  },
})

export const activeAreaState = atom<null | string>({
  key: 'ActiveAreaId',
  default: null
})
