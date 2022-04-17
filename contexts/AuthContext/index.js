import { createContext, useState, useEffect} from "react"
import { supabase } from "../../utils/supabase"
import { useRouter } from "next/router";

export const AuthContext = createContext({});

export function AuthProvider({children}){

    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);
    
        const session = supabase.auth.session()
    
        setUser(session?.user?.user_metadata ?? null)
    
        setLoading(false);
    
        const { data: listener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
          }
        )
    
        return () => {
          listener?.unsubscribe()
        }

    })

    async function login(){
        await supabase.auth.signIn({
            provider: 'google'
        }, {
            redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL
        })
    }

    async function logout(){
        await supabase.auth.signOut();
        router.reload(window.location.pathname);
    }

    return(
        <AuthContext.Provider value={{login, logout, user}}>
            {children}
        </AuthContext.Provider>
    )
    
}

