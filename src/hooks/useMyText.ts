import { useCallback, useMemo } from 'react'

const textMap: Map<string, string> = new Map()
const getTextKey = (areaId: string) => `text/${areaId}`

export const deleteText = (areaId: string) => {
  return chrome.storage.sync.remove(getTextKey(areaId))
}

export const useMyText = (areaId: string) => {
  const textKey = useMemo(() => getTextKey(areaId), [areaId])
  const cachedText = textMap.get(textKey)

  if (cachedText === undefined) {
    throw chrome.storage.sync.get(textKey).then((value) => {
      textMap.set(textKey, value[textKey] || '')
    })
  }

  const saveMyText = useCallback(
    (newText: string) => {
      textMap.set(textKey, newText)
      chrome.storage.sync.set({ [textKey]: newText })
    },
    [textKey]
  )

  return { text: cachedText, saveMyText }
}
