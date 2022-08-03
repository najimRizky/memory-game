const generateTile = (): string[] => {
    let colorType: string[] = ["tomato", "aguamarine", "cyan", "orchid", "black", "yellowgreen", "lightsteelblue", "crimson"]
    const finalColor: string[] = []
    for (let i = 0; i < 16; i++) {
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