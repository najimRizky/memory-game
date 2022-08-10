import clickAudio from "./../assets/sound/click.mp3"

const clickSound = new Audio(clickAudio)
clickSound.volume = 0.5

export const ClickSound = () => {
    clickSound.play()
} 