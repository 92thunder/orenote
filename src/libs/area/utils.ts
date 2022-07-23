import produce from 'immer'
import { Area, Areas, LayoutArea } from './types'

const getParentArea = (areas: Areas, activeAreaId: string) => {
  return Object.values(areas.areas).find((area) => {
    if (area.type === 'text') return false
    return area.childAreas.includes(activeAreaId)
  })
}

export const splitArea = (
  areas: Areas,
  {
    activeAreaId,
    direction,
  }: { activeAreaId: string; direction: LayoutArea['direction'] }
): Areas => {
  const targetArea = areas.areas[activeAreaId]
  if (targetArea.type === 'layout') {
    console.error('Area type must be text.')
    return areas
  }

  const layoutAreaId = crypto.randomUUID()
  const rootId = activeAreaId === areas.rootId ? layoutAreaId : areas.rootId
  const newTextAreaId = crypto.randomUUID()

  const parentArea = getParentArea(areas, activeAreaId)
  const getNewParentAreaChildAreas = (
    parentArea: Area
  ): LayoutArea['childAreas'] => {
    if (parentArea.type === 'text') throw new Error('text')
    const newChildAreas: [string, string] = [...parentArea.childAreas]
    const replaceIndex = newChildAreas.findIndex(
      (areaId) => areaId === activeAreaId
    )
    newChildAreas.splice(replaceIndex, 1, layoutAreaId)
    return newChildAreas
  }
  return {
    ...areas,
    rootId,
    areas: {
      ...areas.areas,
      ...(parentArea &&
        parentArea.type === 'layout' && {
          [parentArea.id]: {
            ...parentArea,
            childAreas: getNewParentAreaChildAreas(parentArea),
          },
        }),
      [layoutAreaId]: {
        id: layoutAreaId,
        type: 'layout',
        direction,
        childAreas: [activeAreaId, newTextAreaId],
      },
      [activeAreaId]: {
        id: activeAreaId,
        type: 'text',
      },
      [newTextAreaId]: {
        id: newTextAreaId,
        type: 'text',
      },
    },
  }
}

const getDefaultAreas = (): Areas => {
  const rootId = crypto.randomUUID()
  return {
    rootId,
    areas: {
      [rootId]: {
        id: rootId,
        type: 'text',
      },
    },
  }
}

export const closeArea = (areas: Areas, activeAreaId: string): Areas => {
  return produce(areas, (areas) => {
    const parentArea = getParentArea(areas, activeAreaId)
    if (!parentArea || parentArea.type === 'text') return

    const silblingAreaId = parentArea.childAreas.find(
      (areaId) => areaId !== activeAreaId
    )
    if (!silblingAreaId) return

    if (parentArea.id === areas.rootId) {
      areas.rootId = silblingAreaId
    } else {
      const parentOfParentArea = getParentArea(areas, parentArea.id)
      if (!parentOfParentArea || parentOfParentArea.type === 'text') return

      const newChildAreas: [string, string] = [...parentOfParentArea.childAreas]
      const replaceIndex = newChildAreas.findIndex(
        (areaId) => areaId === parentArea.id
      )
      newChildAreas.splice(replaceIndex, 1, silblingAreaId)
      areas.areas[parentOfParentArea.id] = {
        ...parentOfParentArea,
        childAreas: newChildAreas,
      }
    }
    delete areas.areas[parentArea.id]
    delete areas.areas[activeAreaId]
  })
}

export const getAreas = async () => {
  return (
    (await chrome.storage.sync.get('areas').then((value) => {
      return value.areas || getDefaultAreas()
    })) || getDefaultAreas()
  )
}
export const saveAreas = (areas: Areas) => {
  return chrome.storage.sync.set({ areas }).then()
}
