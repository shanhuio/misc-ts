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

export class Callbacks {
    success: (d: any, status: string, xhr: JQueryXHR) => (void)
    error: (xhr: JQueryXHR, status: string, err: string) => (void)
}

class Task {
    id: number
    url: string
    req: any
    callbacks: Callbacks
}

function call(url: string, req: any, cb: Callbacks) {
    jQuery.ajax({
        method: 'POST',
        url: url,
        cache: false,
        dataType: 'json',
        data: JSON.stringify(req),
        success: cb.success,
        error: cb.error,
    })
}

export class Caller {
    id: number = 0
    cur: Task = null
    queue: Task[] = []

    call(url: string, req: any, cb: Callbacks) {
        this.id += 1
        let task: Task = {
            id: this.id,
            url: url,
            req: req,
            callbacks: cb,
        }

        if (this.cur == null) {
            this.cur = task
            this.doTask(task)
        } else {
            this.queue.push(task)
        }
    }

    doTask(task: Task) {
        call(task.url, task.req, {
            success: (d: any, status: string, xhr: JQueryXHR) => {
                task.callbacks.success(d, status, xhr)
                this.next()
            },
            error: (xhr: JQueryXHR, status: string, err: string) => {
                task.callbacks.error(xhr, status, err)
                this.next()
            },
        })
    }

    next() {
        this.cur = null
        if (this.queue.length > 0) {
            this.cur = this.queue.shift()
            this.doTask(this.cur)
        }
    }
}
