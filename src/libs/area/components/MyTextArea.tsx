import styled from '@emotion/styled'
import { ChangeEvent, FC, useCallback } from 'react'
import { useMyText } from '../../../hooks/useMyText'
import { TextArea as TextAreaType } from '../types'

type Props = {
  area: TextAreaType
}

export const MyTextArea: FC<Props> = ({ area }) => {
  const { text, saveMyText } = useMyText()
  const handleChangeMarkdown = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    saveMyText(event.target.value)
  }, [saveMyText])
  console.log(area)
  return <TextArea defaultValue={text} onChange={handleChangeMarkdown} spellCheck={false} />
}

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #444;
  resize: none;
  line-height: 1.5;
  font-size: 16px;
  :focus {
    outline: 1px #777 solid;
  }
`
