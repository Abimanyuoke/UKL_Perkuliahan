import { IUser } from "@/app/types";
import { getCookies } from "../../lib/server-cookies";
import { BASE_API_URL} from "@/global";
import { get } from "../../lib/bridge";
import { AlertInfo } from "@/components/alert";
import EditUser from "./editUser";

interface ApiResponse {
    status: boolean;
    data: IUser[];
}

const getUser = async (search: string): Promise<IUser[]> => {
    try {
        // const TOKEN = getCookies("token")
        const url = `${BASE_API_URL}/user?search=${search}`
        const response = await get(url);
        const data = response.data as ApiResponse;
        let result: IUser[] = []
        if (data.status) result = [...data.data]
        return result
    } catch (error) {
        console.log(error)
        return []
    }
}


const UserPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const search = searchParams.search ? searchParams.search.toString() : ``
    const user: IUser[] = await getUser(search)

    return (
        <div>
            <div className="mt-2 bg-slate-900 rounded-lg p-3 border-t-4 border-t-primary shadow-md">
                <h4 className="text-xl font-bold mb-2 text-white">User Data</h4>
                <p className="text-sm text-secondary mb-4">
                    This page displays menu data, allowing menus to view details,
                    search, and manage menu items by adding, editing, or deleting them.
                </p>
                {
                    user.length == 0 ?
                        <AlertInfo title="informasi">
                            No data Available
                        </AlertInfo>
                        :
                        <div className="m-2">
                            {user.map((data, index) => (
                                <div key={`keyPrestasi${index}`} className={`flex flex-wrap shadow m-2`}>
                                    <div className="w-full md:w-1/12 p-2 text-white">
                                    </div>
                                    <div className="w-full md:w-2/12 p-2 text-white">
                                        <small className="text-sm font-bold text-primary">Name</small> <br />
                                        {data.nama_pelanggan}
                                    </div>
                                    <div className="w-full md:w-1/12 p-2 text-white">
                                        <small className="text-sm font-bold text-primary">Alamat</small> <br />
                                        {data.alamat}
                                    </div>
                                    <div className="w-full md:w-5/12 px-36 p-2 text-white">
                                        <small className="text-sm font-bold text-primary">Gender</small> <br />
                                        {data.gender}
                                    </div>
                                    <div className="w-full md:w-5/12 px-36 p-2 text-white">
                                        <small className="text-sm font-bold text-primary">Telepon</small> <br />
                                        {data.telepon}
                                    </div>
                                    <div className="w-full md:w-2/12 p-2 text-white">
                                        <small className="text-sm font-bold text-primary">Action</small><br />
                                        <div className="flex gap-1">
                                            <EditUser selectedUser={data} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                }

            </div>
        </div>
    )
}
export default UserPage