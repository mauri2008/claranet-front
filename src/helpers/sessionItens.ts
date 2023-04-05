export function  getAuthorizationToken(){
    const authorizationToken = sessionStorage.getItem('authorizationToken');

    return authorizationToken || '';
}

export function setAuthorizationToken(token: string){
    sessionStorage.setItem('authorizationToken', token)
}

export function removeAuthorizationToken(){
    sessionStorage.removeItem('authorizationToken')
}