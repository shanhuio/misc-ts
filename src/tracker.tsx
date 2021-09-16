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

export interface State {
    url(): string
    title(): string
    encode(): string
}

export class TrackerConfig {
    // stateFunc is called when the page's location state is changed.
    stateFunc: (state: State) => (void)
    decodeFunc: (s: string) => (State)
}

export class Tracker {
    state: State = null
    initState: State = null
    stateFunc: (state: State) => (void)
    decodeFunc: (s: string) => (State)

    constructor(config: TrackerConfig) {
        this.stateFunc = config.stateFunc
        this.decodeFunc = config.decodeFunc
        window.onpopstate = (ev: PopStateEvent) => { this.popState(ev) }
    }

    goto(next: State) {
        // if url is the same, then do not switch
        let url = next.url()
        if (this.state && url == this.state.url()) return
        history.pushState(next.encode(), '', url)
        this.enterState(next)
    }

    enterState(state: State) {
        this.stateFunc(state)
        if (!this.initState && state) {
            this.initState = state
        }
        this.state = state
        window.document.title = state.title()
    }

    popState(ev: PopStateEvent) {
        let s = history.state as string
        if (!s && this.initState) {
            this.enterState(this.initState)
        } else {
            this.enterState(this.decodeFunc(s))
        }
    }
}
