import Level from "./../rules/Level.json"
import {modeType} from "./../rules/Type"
import { allColor, allAnimals, allFruits } from "../rules/Types"

const generateTile = (level: string, type: string): string[] | null => {
    if(Level.findIndex((lvl) => lvl.level === level) === -1 || modeType.findIndex(typ => typ.type === type) === -1)
        return null

    const tilesSize = Number(Level[Level.findIndex((lvl) => lvl.level === level)].size) * 2
    let tmp: any = []

    switch (type) {
        case "color": tmp = [...allColor]
            break
        case "animal": tmp = [...allAnimals]
            break
        case "fruit": tmp = [...allFruits]
            break
        default: 
    }

    // Choose dataType as source for randomize before generate
    const dataType = []

    while (dataType.length < tilesSize / 2) {
        const tmpRandom: number = Math.floor(Math.random() * (tmp.length))
        dataType.push(tmp[tmpRandom])
        tmp.splice(tmpRandom, 1)
    }

    // Generate tile (randomize)
    const finalColor: string[] = []

    for (let i = 0; i < tilesSize; i++) {
        const randomId: number = Math.floor(Math.random() * (dataType.length))
        if (finalColor.includes(dataType[randomId])) {
            finalColor.push(dataType[randomId])
            dataType.splice(dataType.indexOf(dataType[randomId]), 1)
        } else {
            finalColor.push(dataType[randomId])
        }
    }
    return finalColor
}

export { generateTile }