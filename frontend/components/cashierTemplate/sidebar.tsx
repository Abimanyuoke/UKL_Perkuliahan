"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import Image from "next/image"
import MenuItem from "./menuItem"
import { getCookies, removeCookie, } from "@/lib/client-cookies"
import { useRouter } from "next/navigation";
import { BASE_IMAGE_PROFILE } from "@/global"
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import Link from "next/link"


type MenuType = {
    id: string,
    icon: ReactNode
    path: string,
    label: string
}

type CahsierProp = {
    children: ReactNode,
    id: string,
    title: string,
    menuList: MenuType[]
}


const Sidebar = ({ children, id, title, menuList }: CahsierProp) => {
    const router = useRouter();
    const userName = getCookies("name") || "Guest";
    const profilePicture = getCookies("profile_picture");
    const role = getCookies(`role`)
    
    const handleLogout = () => {
        removeCookie("token")
        removeCookie("id")
        removeCookie("name")
        removeCookie("role")
        router.replace(`/login`)
    };
    
    const [isShow, setIsShow] = useState(false)
    let menuRef = useRef<HTMLButtonElement>(null);

    // useEffect(() => {
    //     let handler = (e: any) => {
    //         if (menuRef.current && menuRef.current.contains(e.target)) {
    //             setIsShow(false)
    //         }
    //     };
    //     document.addEventListener("mousedown", handler);

    //     return () => {
    //         document.removeEventListener("mousedown", handler);}
    // })

const sidebarRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    const handler = (e: MouseEvent) => {
        if (
            sidebarRef.current &&
            !sidebarRef.current.contains(e.target as Node) &&
            menuRef.current &&
            !menuRef.current.contains(e.target as Node)
        ) {
            setIsShow(false);
        }
    };

    document.addEventListener("mousedown", handler);
    return () => {
        document.removeEventListener("mousedown", handler);
    };
}, []);

    


    return (
        <div className="w-full min-h-dvh">
            {/* header section */}
            <header className="flex justify-between items-center p-4 mb-0 bg-primary shadow-md">
                <div className="flex gap-2">
                    <button onClick={() => setIsShow(true)} ref={menuRef} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </button>
                    <h1 className="font-bold text-xl text-black">
                        {title}
                    </h1>
                </div>

                {/* user section */}

                <div className="flex items-center">   
                        <img src={`${BASE_IMAGE_PROFILE}/${profilePicture}`} alt="Profile" width={50} height={50} className="rounded-full" />
                    <div className="text-white p-3 flex flex-col items-center rounded-lg">
                        <p className="font-bold">Welcome Back</p>
                        <div className="flex items-center gap-2">
                            <div className="text-lg font-semibold">
                                {userName}
                            </div>
                            <div className="rounded-lg">
                                <div className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-transparent text-xs bg-clip-text font-medium">
                                    {role}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end user section */}

            </header>
            {/* end header section */}

            {/* content section */}
            <div className="relative">
                {children}
            </div>
            {/* end content section */}

            <Link href="/chat">
                <div className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition">
                    <IoChatbubbleEllipsesSharp className="w-5 h-5" />
                </div>
            </Link>

            {/* sidebar section */}
            <div ref={sidebarRef} className={`flex flex-col w-2/3 md:w-1/2 lg:w-1/4 h-full p-5 fixed top-0 right-full transition-transform z-50 border-r border-primary bg-white ${isShow ? `translate-x-full` : ``}`}>

                <div className="flex justify-between items-center p-4 mb-0">
                    {/* logo section */}
                    <div className="mb-3 w-full flex justify-start">
                        <div className="flex items-center space-x-2">
                            <Image src="../Logo.svg" alt="Logo" width={150} height={150} />
                        </div>
                    </div>
                </div>

                {/* menu section */}
                <div className="w-full overflow-y-auto">
                    <div className="px-5 mt-10">
                        {
                            menuList.map((menu, index) => (
                                <MenuItem icon={menu.icon} label={menu.label} path={menu.path} active={menu.id === id} key={`keyMenu${index}`} />
                            ))
                        }
                    </div>
                </div>
                {/* menu section */}

                {/* logout */}
                <div className="absolute bottom-4 w-full p-2">
                    <div className="flex items-center space-x-2 text-[#333333] px-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                        <button className="font-bold cursor-pointer" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
            {/* end sidebar section */}

        </div>
    )
}

export default Sidebar
