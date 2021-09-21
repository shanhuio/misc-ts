// Timestamp is a simple data structure that stores the time stamp.
// It always uses the UTC timezone. This maps to the Timestamp type in
// Go package shanhu.io/misc/timeutil
export class Timestamp {
    Sec: number
    Nano: number
}

// unix returns the Unix UTC timestamp (in seconds).
export function unix(ts: Timestamp) { return ts.Sec }

// Duration is a simple data structure that stores a time duration.
// It maps to the Duration type in Go package shanhu.io/misc/timeutil
export class Duration {
    Sec: number
    Nano: number
}
