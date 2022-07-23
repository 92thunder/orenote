import { atom } from 'recoil'
import { Areas } from './types'
import { getAreas } from './utils'

export const areasState = atom<Areas>({
  key: 'Areas',
  default: getAreas(),
})

export const activeAreaState = atom<null | string>({
  key: 'ActiveAreaId',
  default: null,
})

export const editModeState = atom<boolean>({
  key: 'EditMode',
  default: false,
})
