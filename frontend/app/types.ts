export interface INasabah {
    id: number,
    uuid: string,
    name: string,
    username: string,
    email: string,
    password: string,
    telepon: string,
    alamat: string,
    profile_picture: string,
    gender: string,
    createdAt: string,
    updatedAt: string
}

export interface IUser {
    id: number,
    uuid: string,
    nama_pelanggan: string,
    alamat: string,
    gender: string,
    telepon: string
}