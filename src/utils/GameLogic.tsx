import Level from "./../rules/Level.json"
import { allColor, allAnimals } from "../rules/Types"


const generateTile = (level: string, type: string): string[] => {
    const tilesSize = Number(Level[Level.findIndex((lvl) => lvl.level === level)].size) * 2

    let dataType = type === "color" ?  allColor.slice(0, tilesSize / 2) :  allAnimals.slice(0, tilesSize / 2)
    const finalColor: string[] = []

    for (let i = 0; i < tilesSize; i++) {
        const randomId: number = Math.floor(Math.random() * (dataType.length));
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