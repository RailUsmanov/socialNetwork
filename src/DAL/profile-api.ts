import {instance, ResultCode} from "./api";
import {PhotosType, ProfileType} from "../Types/types";

export const profileApi = {
    setProfile(userId: number) {
        return instance.get<ProfileType>(`/profile/${userId}`);
    },
    getStatus(userId: number) {
        return instance.get<string>(`/profile/status/${userId}`)
            .then(result => result.data)
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusDataType>(`/profile/status`, {status})
            .then(result => result.data)
    },
    setPhotoProfile(file: File) {
        const formData = new FormData()
        formData.append("image", file)
        return instance.put<SetPhotoProfileDataType>(`/profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(result => result.data)
    },
    saveProfileInfo(profile: any) {
        return instance.put<SaveProfileInfoDataType>(`/profile`, profile)
            .then(result => result.data)
    }
}

export type UpdateStatusDataType = {
    resultCode: ResultCode
    messages: Array<string>
    data: {}
}
export type SetPhotoProfileDataType = {
    data: PhotosType
    resultCode: ResultCode
    messages: Array<string>
}

type SaveProfileInfoDataType = {
    resultCode: ResultCode
    messages: Array<string>
    data: {}
}
