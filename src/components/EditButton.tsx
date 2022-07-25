import { Edit } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { FC, useEffect } from 'react'

type Props = {
  onClick: () => void
}

export const EditButton: FC<Props> = ({ onClick }) => {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'e') {
        onClick()
      }
    }
    document.addEventListener('keyup', listener)
    return () => document.removeEventListener('keyup', listener)
  }, [onClick])

  return (
    <Tooltip title="Edit (E)" placement="right">
      <IconButton onClick={onClick}>
        <Edit fontSize="inherit" />
      </IconButton>
    </Tooltip>
  )
}
