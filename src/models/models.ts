/* These interfaces are used to give Typescript a more certain idea
 * to what's happening in the code.
 * */

export interface Authed {
    authed: number
}

export interface User {
    name: string
}

export interface UserInfo {
    Name: string,
    Surname: string
    Username: string,
    Age: number,
    Email: string
}

export interface Salt {
    PassSalt: string
}