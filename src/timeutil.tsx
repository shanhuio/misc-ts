class Timestamp {
    Sec: number
    Nano: number
}

function unix(ts: Timestamp) { return ts.Sec }

class Duration {
    Sec: number
    Nano: number
}
