import { useCallback } from "react"

export const useSaveMyText = () => {
	return useCallback((text: string) => {
		chrome.storage.sync.set({ 'text': text })
	}, [])
}