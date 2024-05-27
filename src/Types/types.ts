export type UsersType = {
    followed: boolean
    name: string
    id: number
    photos:PhotosType
    status: string | undefined
}
export type ContactsType = {
        github: string | undefined
        vk: string | undefined
        facebook: string | undefined
        instagram: string | undefined
        twitter: string | undefined
        website: string | undefined
        youtube: string | undefined
        mainLink: string | undefined
}
export type ProfileType = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | undefined
    fullName: string
    aboutMe: string | undefined
    contacts: ContactsType
    photos: PhotosType
}


export type PhotosType = {
    small: string | undefined
    large: string | undefined
}
