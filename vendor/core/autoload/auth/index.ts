let _auth: any = null

export function setAuth(auth: any) {
    _auth = auth;
}

export function Auth() {
    return _auth
}