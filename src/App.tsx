import { useCallback, useMemo } from 'react'
import styled from '@emotion/styled'
import './App.css'
import { createTheme, IconButton, ThemeProvider } from '@mui/material'
import { Splitscreen } from '@mui/icons-material'
import { activeAreaState, areasState, AreaView, splitArea } from './libs/area'
import { useRecoilState, useRecoilValue } from 'recoil'

function App() {
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
    setAreas((areas) => splitArea(areas, {activeAreaId, direction: 'vertical' }))
  }, [activeAreaId, setAreas])
  const handleClickSplitHorizontal = useCallback(() => {
    if (!activeAreaId) return
    setAreas((areas) => splitArea(areas, {activeAreaId, direction: 'horizontal' }))
  }, [activeAreaId, setAreas])
  console.log(activeAreaId)

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Main>
          <AreaView area={rootArea} areas={areas} />
        </Main>
        <Footer>
          <IconButton onClickCapture={handleClickSplitVertical} size="small" disabled={!activeAreaId}>
            <Splitscreen fontSize="inherit" />
          </IconButton>
          <IconButton onClick={handleClickSplitHorizontal} size="small" disabled={!activeAreaId}>
            <SplitscreenHorizontal fontSize="inherit" />
          </IconButton>
        </Footer>
      </Container>
    </ThemeProvider>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Footer = styled.footer`
  width: 100%;
  padding: 8px;
`

const Main = styled.section`
  flex: 1;
`

const SplitscreenHorizontal = styled(Splitscreen)`
  transform: rotate(90deg);
`

export default App
