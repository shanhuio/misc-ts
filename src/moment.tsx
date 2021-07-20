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

function localDateStr(now: Date, d: Date): string {
    let y = d.getFullYear()
    let ret = '' + (d.getMonth() + 1) + '/' + d.getDate()
    if (y === now.getFullYear()) {
        return ret
    }
    return '' + y + '/' + ret
}

export function shortFormat(now: number, ts: number): string {
    let delta = now - ts
    if (delta <= 5) return 'just now'
    if (delta < 90) return '1m ago'
    let min = Math.round(delta / 60)
    if (min < 10) return (min + 'm ago')
    let min5 = Math.round(min / 5) * 5
    if (min < 60) return (min5 + 'm ago')
    let hour = Math.round(min / 60)
    if (hour <= 1) return '1h ago'
    if (hour < 24) return (hour + 'h ago')

    let dateNow = new Date(now * 1e3)
    let dateYesterday = new Date((now - 24 * 60 * 60) * 1e3)
    let dateStamp = new Date(ts * 1e3)

    let dateStr = localDateStr(dateNow, dateStamp)

    if (localDateStr(dateNow, dateYesterday) === dateStr) return 'yesterday'

    return dateStr
}

export function format(now: number, ts: number): string {
    let delta = now - ts
    if (delta <= 5) return 'just now'
    if (delta < 90) return 'a minute ago'
    let min = Math.round(delta / 60)
    if (min < 10) return (min + ' minutes ago')
    let min5 = Math.round(min / 5) * 5
    if (min < 60) return (min5 + ' minutes ago')
    let hour = Math.round(min / 60)
    if (hour <= 1) return 'an hour ago'
    if (hour < 24) return (hour + ' hours ago')

    let dateNow = new Date(now * 1e3)
    let dateYesterday = new Date((now - 24 * 60 * 60) * 1e3)
    let dateStamp = new Date(ts * 1e3)

    let dateStr = localDateStr(dateNow, dateStamp)

    if (localDateStr(dateNow, dateYesterday) === dateStr) return 'yesterday'

    return dateStr
}

function timeStr(d: Date) {
    let h = d.getHours()
    let m = d.getMinutes()
    if (m < 9) {
        return '' + h + ':0' + m
    }
    return '' + h + ':' + m
}

export function longFormat(now: number, t: number): string {
    let dateNow = new Date(now * 1e3)
    let d = new Date(t * 1e3)
    let s = '' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + timeStr(d)
    let y = d.getFullYear()
    if (y == dateNow.getFullYear()) {
        return s
    }

    return '' + y + '/' + s
}