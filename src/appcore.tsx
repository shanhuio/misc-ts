// Copyright (C) 2022  Shanhu Tech Inc.
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

import * as ajax from './ajax'
import * as redraw from './redraw'
import * as apppage from './apppage'

export class Core {
    redraw: redraw.Redraw
    caller: ajax.Caller
    switcher: apppage.Switcher

    constructor(r: redraw.Redraw, s: apppage.Switcher) {
        this.redraw = r
        this.caller = new ajax.Caller()
        this.switcher = s
    }

    call(url: string, req: any, cb: ajax.Callbacks) {
        this.caller.call(url, req, cb)
    }

    gotoPath(path: string) {
        this.switcher.goto(path)
        this.redraw()
    }
}

export function make(r: redraw.Redraw, s: apppage.Switcher): Core {
    return new Core(r, s)
}
