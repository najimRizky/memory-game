import clickAudio from "./../assets/sound/click.mp3"
import clickAudio2 from "./../assets/sound/click2.mp3"

const clickSound = new Audio(clickAudio)
const clickSound2 = new Audio(clickAudio2)
clickSound.volume = 0.5
// clickSound2.volume = 0.

export const ClickSound = () => {
    clickSound.currentTime = 0
    clickSound.play()
} 

export const ClickSound2 = () => {
    clickSound2.currentTime = 0
    clickSound2.play()
} 