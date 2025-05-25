'use client';
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function LoginCard({ provider, img }) {
    return <button onClick={() => signIn(provider.toLowerCase())} className="provider cursor-pointer flex items-center justify-between gap-4 px-4 py-2 rounded-sm bg-white text-black">
        <img src={img} alt={img} className="h-6" />
        <p className="text-lg font-medium ">Login with {provider}</p>
    </button>
}


const Login = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push('/');
        }
    }, [session, router]);


    return (
        <div className="box h-[80vh] flex flex-col gap-5 items-center justify-center">
            <LoginCard
                img={"google.png"}
                provider={"Google"}
            />
            <LoginCard
                img={"github.png"}
                provider={"GitHub"}
            />
        </div>
    )
}

export default Login
