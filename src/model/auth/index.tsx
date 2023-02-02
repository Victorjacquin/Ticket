export interface Auth {
    token: string|null,
    email: string|null,
}

export const initialState: Auth = {
    token: localStorage.getItem('token'),
    email : localStorage.getItem('email')
}