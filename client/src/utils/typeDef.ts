export interface UserType {
    name: string,
    username: string,
    password: string,
    email: string,
    token: string,
    loggedIn: boolean
}

export type AppContextType = {
    user: UserType,
    setUser: (user: UserType) => void,
}

export type SeachProps = {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
    OnSearchHandler: (...args: any[]) => void
}