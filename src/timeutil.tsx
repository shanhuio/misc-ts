// Copyright (C) 2021  Shanhu Tech Inc.
//
// This program is free software: you can redistribute it and/or modify it
// under the terms of the GNU Affero General Public License as published by the
// Free Software Foundation, either version 3 of the License, or (at your
// option) any later version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License
// for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
