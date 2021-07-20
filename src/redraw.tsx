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

class Signal {
    pending: boolean
    f: () => void

    constructor(f: () => void) {
        this.pending = false
        this.f = f
    }

    trigger() {
        if (this.pending) {
            return
        }

        this.pending = true
        setTimeout(() => {
            // clear pending before calling f
            // because f() might trigger more, which should schedule
            // a new round 
            this.pending = false
            this.f()
        }, 0)
    }
}

export type Redraw = () => void

export function NewRedraw(c: { forceUpdate(): void }): Redraw {
    let signal = new Signal(() => {
        c.forceUpdate()
    })

    return () => { signal.trigger() }
}
