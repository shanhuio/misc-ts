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

interface PasswordState {
    value: string
}

interface PasswordProps {
    session: number
    autoFocus?: boolean
    focus?: boolean
    onChange: (v: string) => void
}

export class Password extends React.Component<PasswordProps, PasswordState> {
    session: number
    input: Element

    constructor(props: PasswordProps) {
        super(props)
        this.session = props.session
        this.state = { value: '' }
    }

    change(ev: React.FormEvent<HTMLElement>) {
        let line: string = (ev.target as any).value
        if (this.props.onChange) {
            this.props.onChange(line)
        }
        this.setState({ value: line })
    }

    componentDidUpdate() {
        if (this.session != this.props.session) {
            this.session = this.props.session
            this.setState({ value: '' })
            this.refocus()
        }
    }

    componentDidMount() {
        this.refocus()
    }

    refocus() {
        if (this.props.focus) {
            (this.input as any).focus()
        } else {
            (this.input as any).blur()
        }
    }

    render() {
        let props = {
            className: 'pwd',
            type: 'password',
            value: this.state.value,
            autoFocus: this.props.autoFocus || false,
            onChange: (ev: React.FormEvent<HTMLElement>) => { this.change(ev) },
            ref: (input: Element) => { this.input = input },
        }
        return <input {...props} />
    }
}
