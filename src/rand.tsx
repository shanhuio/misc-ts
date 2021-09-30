export function ID(n: number): string {
    var ret = ''
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < n; i++) {
        ret += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return ret
}
