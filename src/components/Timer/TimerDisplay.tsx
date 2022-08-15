type Props = {
    running: boolean,
    currentTimeMs: number,
    currentTimeSec: number,
    currentTimeMin: number,
    formatTime: (val: number, rest?: string) => string
}

const TimerDisplay = (props: Props) => {
    return (
        <div className={'stopwatch__display'}>
            <span>
                {props.formatTime(props.currentTimeMin)}:
                {props.formatTime(props.currentTimeSec)}:
                {props.formatTime(props.currentTimeMs, "ms")}
            </span>
        </div>
    );
}

export default TimerDisplay;