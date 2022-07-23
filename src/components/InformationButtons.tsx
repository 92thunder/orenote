import styled from '@emotion/styled'
import { GitHub } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { FC } from 'react'

export const InformationButtons: FC = () => {
  return (
    <InformationButtonsContainer>
      <IconButton
        onClick={() => window.open('https://github.com/92thunder/orenote')}
      >
        <GitHub fontSize="inherit" />
      </IconButton>
    </InformationButtonsContainer>
  )
}

const InformationButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
