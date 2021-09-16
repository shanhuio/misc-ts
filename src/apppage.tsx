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

import * as React from 'react' // for tsx

export interface Meta {
    title: string
}

export interface Page {
    enter(path: string): Meta
    render(): JSX.Element
    exit(): void
}

export interface Handler {
    handle(path: string): Page
}

export class SwitcherConfig {
    handler: Handler
    prefix?: string
}

export class Switcher {
    handler: Handler
    prefix: string // For URL path in location bar.
    initPath: string = ''
    currentPath: string
    currentPage: Page = null

    constructor(config: SwitcherConfig, init: string) {
        this.handler = config.handler
        this.prefix = config.prefix ? config.prefix : '/'
        this.initPath = init

        this.install()
        this.enter(init)
    }

    install() {
        window.onpopstate = (ev: PopStateEvent) => { this.popState(ev) }
    }

    popState(ev: PopStateEvent) {
        let s = history.state as string
        if (!s) {
            // First item in history has an empty state.
            this.enter(this.initPath)
        } else {
            this.enter(s)
        }
    }

    page(): Page { return this.currentPage }
    path(): string { return this.currentPath }

    goto(nextPath: string) {
        if (this.currentPath == nextPath) return
        let url = this.prefix + nextPath
        history.pushState(nextPath, '', url)
        this.enter(nextPath)
    }

    enter(path: string) {
        let page = this.handler.handle(path)
        if (!page) {
            console.log('invalid path: ' + path)
            return
        }

        if (path != this.currentPath) {
            // We only call exit when changing path.
            // This makes sure the state is cleared.
            this.currentPage.exit()
        }

        this.currentPage = page
        this.currentPath = path
        let meta = page.enter(path)
        window.document.title = meta.title
    }
}