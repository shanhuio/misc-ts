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

export interface Meta {
    title: string
}

export interface Page {
    enter(path: string, pageData: any): Meta
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

    constructor(config: SwitcherConfig, initPath: string) {
        this.handler = config.handler
        this.prefix = config.prefix ? config.prefix : '/'
        this.initPath = initPath
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

    enter(path: string) { this.enterWithData(path, null) }

    enterWithData(path: string, pageData: any) {
        let page = this.handler.handle(path)
        if (!page) {
            console.log('invalid path: ' + path)
            return
        }

        if (this.currentPage && path != this.currentPath) {
            // We only call exit when changing path.
            // This makes sure the state is cleared.
            this.currentPage.exit()
        }

        this.currentPage = page
        this.currentPath = path
        let meta = page.enter(path, pageData)
        window.document.title = meta.title
    }

    init(pageData: any) {
        window.onpopstate = (ev: PopStateEvent) => { this.popState(ev) }
        history.replaceState(this.initPath, '')
        this.enterWithData(this.initPath, pageData)
    }
}
