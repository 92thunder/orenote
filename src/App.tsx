import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import './App.css'
import { useMyText } from './hooks/useMyText'
import { useSaveMyText } from './hooks/useSaveMyText'

function App() {
  const text = useMyText()
  const saveText = useSaveMyText()
  const handleChangeMarkdown = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    saveText(event.target.value)
  }, [saveText])

  return (
    <Container>
      <Main>
        <TextArea defaultValue={text} onChange={handleChangeMarkdown} />
      </Main>
      <Footer></Footer>
    </Container>
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
  height: 40px;
`

const Main = styled.section`
  flex: 1;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: none;
  resize: none;
  line-height: 1.5;
  font-size: 14px;
  :focus {
    outline: 1px #666 solid;
  }
`

export default App
