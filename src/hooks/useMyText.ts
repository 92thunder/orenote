import { useCallback, useMemo } from 'react'

const texts: Record<string, string | undefined> = {}
const getTextKey = (areaId: string) => `text/${areaId}`

export const useMyText = (areaId: string) => {
  const textKey = useMemo(() => getTextKey(areaId), [areaId])

  if (texts[textKey] === undefined) {
    throw chrome.storage.sync.get(textKey).then((value) => {
      texts[textKey] = value[textKey] || ''
    })
  }

  const saveMyText = useCallback(
    (newText: string) => {
      chrome.storage.sync.set({ [textKey]: newText })
    },
    [textKey]
  )

  return { text: texts[textKey], saveMyText }
}
