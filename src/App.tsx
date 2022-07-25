import { useEffect, useMemo } from 'react'
import styled from '@emotion/styled'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { createTheme, ThemeProvider } from '@mui/material'
import { areasState, AreaView, saveAreas } from './libs/area'
import { useRecoilValue } from 'recoil'
import { ControlButtons, InformationButtons } from './components'
import './App.css'

export function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  const areas = useRecoilValue(areasState)
  const rootArea = useMemo(() => {
    return areas.areas[areas.rootId]
  }, [areas])

  useEffect(() => {
    saveAreas(areas)
  }, [areas])

  return (
    <ThemeProvider theme={darkTheme}>
      <EmotionThemeProvider theme={darkTheme}>
        <Container>
          <StyledAside>
            <ControlButtons />
            <InformationButtons />
          </StyledAside>
          <Main>
            <AreaView area={rootArea} areas={areas} />
          </Main>
        </Container>
      </EmotionThemeProvider>
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
  background-color: ${(props) => props.theme.palette.background.default};
`

const Main = styled.section`
  flex: 1;
  background-color: ${(props) => props.theme.palette.grey['800']};
`
