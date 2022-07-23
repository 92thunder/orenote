import { useCallback } from 'react'

let text: string | undefined

export const useMyText = () => {
  if (text === undefined) {
    throw chrome.storage.sync.get('text').then((value) => {
      text = value.text
    })
  }

  const saveMyText = useCallback((newText: string) => {
    chrome.storage.sync.set({ text: newText })
    text = newText
  }, [])

  return { text, saveMyText }
}
