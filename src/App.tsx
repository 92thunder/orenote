import { useCallback, useEffect, useMemo } from 'react'
import styled from '@emotion/styled'
import './App.css'
import { createTheme, IconButton, ThemeProvider, Tooltip } from '@mui/material'
import { CancelPresentation, GitHub, Splitscreen } from '@mui/icons-material'
import {
  activeAreaState,
  areasState,
  AreaView,
  closeArea,
  saveAreas,
  splitArea,
} from './libs/area'
import { useRecoilState, useRecoilValue } from 'recoil'
import { deleteText } from './hooks/useMyText'

export function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  const [areas, setAreas] = useRecoilState(areasState)
  const rootArea = useMemo(() => {
    return areas.areas[areas.rootId]
  }, [areas])
  const activeAreaId = useRecoilValue(activeAreaState)

  const handleClickSplitVertical = useCallback(() => {
    if (!activeAreaId) return
    setAreas((areas) =>
      splitArea(areas, { activeAreaId, direction: 'vertical' })
    )
  }, [activeAreaId, setAreas])
  const handleClickSplitHorizontal = useCallback(() => {
    if (!activeAreaId) return
    setAreas((areas) =>
      splitArea(areas, { activeAreaId, direction: 'horizontal' })
    )
  }, [activeAreaId, setAreas])
  const handleClickCloseArea = useCallback(() => {
    if (!activeAreaId) return
    setAreas((areas) => closeArea(areas, activeAreaId))
    deleteText(activeAreaId)
  }, [activeAreaId, setAreas])

  useEffect(() => {
    saveAreas(areas)
  }, [areas])

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <StyledAside>
          <ControlButtons>
            <Tooltip title="Split Horizontal" placement="right">
              <IconButton onClick={handleClickSplitHorizontal}>
                <SplitscreenHorizontal fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Split Vertical" placement="right">
              <IconButton onClickCapture={handleClickSplitVertical}>
                <Splitscreen fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close Area" placement="right">
              <IconButton onClick={handleClickCloseArea}>
                <CancelPresentation fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </ControlButtons>
          <InformationButtons>
            <IconButton
              onClick={() =>
                window.open('https://github.com/92thunder/orenote')
              }
            >
              <GitHub fontSize="inherit" />
            </IconButton>
          </InformationButtons>
        </StyledAside>
        <Main>
          <AreaView area={rootArea} areas={areas} />
        </Main>
      </Container>
    </ThemeProvider>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const StyledAside = styled.section`
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ControlButtons = styled.div`
  display: flex;
  flex-direction: column;
`

const InformationButtons = styled.div`
  display: flex;
  flex-direction: column;
`

const Main = styled.section`
  flex: 1;
`

const SplitscreenHorizontal = styled(Splitscreen)`
  transform: rotate(90deg);
`
