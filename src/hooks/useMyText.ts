let text: string | undefined

export const useMyText = (): string => {
	if (text === undefined) {
		throw chrome.storage.sync.get('text').then((value) => {
			text = value['text']
		})
	}
	return text
}