import { Areas, LayoutArea } from './types'

export const splitArea = (
  areas: Areas,
  {
    activeAreaId,
    direction,
  }: { activeAreaId: string; direction: LayoutArea['direction'] }
): Areas => {
	console.log(activeAreaId)
	const targetArea = areas.areas[activeAreaId]
	if (targetArea.type === 'layout') {
		console.error('Area type must be text.')
		return areas
	}

	const newId1 = crypto.randomUUID()
	const newId2 = crypto.randomUUID()
	return {
		...areas,
		areas: {
			...areas.areas,
			[activeAreaId]: {
				...targetArea,
				type: 'layout',
				direction,
				childAreas: [newId1, newId2],
			},
			[newId1]: {
				id: newId1,
				type: 'text',
				text: targetArea.type === 'text' ? targetArea.text : '',
			},
			[newId2]: {
				id: newId2,
				type: 'text',
				text: '',
			},
		},
	}
}
