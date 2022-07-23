type AreaId = string

export type TextArea = {
	id: AreaId
	type: 'text'
	text: string
}

export type LayoutArea = {
	id: AreaId
	type: 'layout'
	direction: 'vertical' | 'horizontal'
	childAreas: AreaId[]
}

export type Area = TextArea | LayoutArea

export type Areas = {
	rootId: AreaId
	areas: Record<AreaId, Area>
}