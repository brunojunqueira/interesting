import { createContext, useState, useEffect} from "react"
import { supabase } from "../../utils/supabase"

export const AuthContext = createContext({});

export function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);
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
        const { user, session, error } = await supabase.auth.signIn({
            // provider can be 'github', 'google', 'gitlab', and more
            provider: 'google'
        });

    }
    async function logout(){
        const { error } = await supabase.auth.signOut();
        console.log(error);
    }

    return(
        <AuthContext.Provider value={{login, logout, user, session, error}}>
            {children}
        </AuthContext.Provider>
    )
    
}

