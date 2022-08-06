export const slideTransition = {
    initial: {
        x: "50vw", 
        opacity: 0
    },
    animate: {
        x: "0", 
        opacity: 1,
        transition: { type: 'linear', ease: "easeOut", duration: 0.3 }
    },
    exit: {
        x: "-50vw",
        opacity: 0,
        transition: { type: 'linear', ease: "easeIn", duration: 0.3 }
    }
}

export const fadeTransition = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0}
}