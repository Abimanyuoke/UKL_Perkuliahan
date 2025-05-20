"use client"

import { INasabah } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { post } from "@/lib/bridge"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { InputGroupComponent } from "@/components/InputComponent"
import FileInput from "@/components/fileInput"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Select from "@/components/select"

const SignUp = () => {
    const [nasabah, setNasabah] = useState<INasabah>({
        id: 0, uuid: ``, name: ``, email: ``, username: ``, alamat: ``, telepon: ``,
        password: ``, profile_picture: ``, gender: ``, createdAt: ``, updatedAt: ``
    })
    const router = useRouter()
    // const TOKEN = getCookies("token") || ""
    const [file, setFile] = useState<File | null>(null)

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/api/register`
            const { name, email, password, gender, alamat, telepon, username } = nasabah
            const payload = new FormData()
            payload.append("name", name || "")
            payload.append("email", email || "")
            payload.append("password", password || "")
            payload.append("gender", gender || "")
            payload.append("alamat", alamat || "")
            payload.append("telepon", telepon || "")
            payload.append("username", username || "")
            if (file !== null) payload.append("profile_picture", file)

            const response = await post(url, payload)
            const data = response as { status: boolean; message: string }

            if (data.status) {
                toast.success(data.message, { hideProgressBar: true, containerId: `toastUser` })
                setTimeout(() => {
                    router.replace(`/login`)
                }, 1000)
            } else {
                toast.warning(data.message, { hideProgressBar: true, containerId: `toastUser` })
            }
        } catch (error) {
            console.error(error)
            toast.error(`Something went wrong`, { hideProgressBar: true, containerId: `toastUser` })
        }
    }



    return (
        <div className="w-screen h-screen bg-slate-900 bg-cover flex justify-center items-center relative z-10">
            <ToastContainer containerId={`toastUser`} />
            <div className="max-w-7xl lg:w-full h-full flex mx-auto justify-between items-center">
                <div className="flex flex-col lg:w-1/2 p-5 justify-center lg:p-0 items-start gap-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">Ayo Cegah <span className="text-[#62C44A]">Stunting Pada Anak - anak</span></h1>
                    <p className="text-start text-white">Masalah stunting pada balita masih cukup hangat diperbincangkan dan masih banyak orang tua tidak menegerti cara pencegahannya. Oleh karena itu, kami menawarkan kepada Ibu - Ibu yang mempunyai balita untuk bekerja sama dalam mengatasi masalah stunting pada balita. Produk yang kami buat adalah sebuah produk untuk Pencegahan, Pengedukasian, dan Monitoring masalah stunting.</p>
                </div>
                <div className="w-full md:w-6/12 lg:w-1/3 rounded-lg p-5 bg-white flex flex-col items-center relative">
                    <form onSubmit={handleSubmit}>
                        {/* modal header */}
                        <div className="flex space-x-5 justify-center">
                            <div className="bg-white text-primary border-2 border-primary flex justify-center items-center rounded-md py-1 px-12">
                                <Link className="font-semibold text-xl" href={"/login"}>Masuk</Link>
                            </div>
                            <div className="bg-primary text-white flex justify-center items-center rounded-md px-12">
                                <Link className="font-semibold text-xl" href={"/signup"}>Sign Up</Link>
                            </div>
                        </div>
                        {/* end modal header */}

                        {/* modal body */}
                        <div className="pt-5 text-black">
                            <InputGroupComponent id={`name`} type="text" value={nasabah.name}
                                onChange={val => setNasabah({ ...nasabah, name: val })}
                                required={true} label="Name" />

                            <InputGroupComponent id={`email`} type="text" value={nasabah.email}
                                onChange={val => setNasabah({ ...nasabah, email: val })}
                                required={true} label="Email" />

                            <InputGroupComponent id={`username`} type="text" value={nasabah.username}
                                onChange={val => setNasabah({ ...nasabah, username: val })}
                                required={true} label="Username" />

                            <InputGroupComponent id={`password`} type="text" value={nasabah.password}
                                onChange={val => setNasabah({ ...nasabah, password: val })}
                                required={true} label="Password" />

                            <Select id={`gender`} value={nasabah.gender} label="Gender"
                                required={true} onChange={val => setNasabah({ ...nasabah, gender: val })}>
                                <option value="">--- Select Gender ---</option>
                                <option value="PRIA">PRIA</option>
                                <option value="WANITA">WANITA</option>
                            </Select>

                            <InputGroupComponent id={`alamat`} type="text" value={nasabah.alamat}
                                onChange={val => setNasabah({ ...nasabah, alamat: val })}
                                required={true} label="Alamat" />

                            <InputGroupComponent id={`telepon`} type="text" value={nasabah.telepon}
                                onChange={val => setNasabah({ ...nasabah, telepon: val })}
                                required={true} label="Telepon" />

                            <FileInput acceptTypes={["application/pdf", "image/png", "image/jpeg", "image/jpg"]} id="profile_picture"
                                label="Upload Picture (Max 2MB, PDF/JPG/JPEG/PNG)" onChange={f => setFile(f)} required={false} />

                        </div>
                        {/* end modal body */}

                        {/* modal footer */}
                        <div className="my-10">
                            <button type="submit" className="bg-primary hover:bg-primary uppercase w-full py-3 font-semibold cursor-pointer rounded-md text-white">
                                Signup
                            </button>
                        </div>
                        {/* end modal footer */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp