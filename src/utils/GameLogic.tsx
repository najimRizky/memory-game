import Level from "./../rules/Level.json"

const allColor: string[] = ["tomato", "aguamarine", "cyan", "orchid", "black", "yellowgreen", "lightsteelblue", "crimson", "lightpink", "seagreen"]

const generateTile = (level: string): string[] => {
    const tilesSize = Number(Level[Level.findIndex((lvl) => lvl.level === level)].size) * 2
    
    let colorType = allColor.slice(0, tilesSize/2)
    const finalColor: string[] = []

    for (let i = 0; i < tilesSize; i++) {
        const randomId: number = Math.floor(Math.random() * (colorType.length));
        if (finalColor.includes(colorType[randomId])) {
            finalColor.push(colorType[randomId])
            colorType.splice(colorType.indexOf(colorType[randomId]), 1)
        } else {
            finalColor.push(colorType[randomId])
        }
    }
    return finalColor
}

export {generateTile}