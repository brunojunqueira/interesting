import { createContext, useState, useEffect} from "react"
import { supabase } from "../../utils/supabase"
import { useRouter } from "next/router";

export const AuthContext = createContext({});

export function AuthProvider({children}){

    const router = useRouter();

    const [id, setId] = useState(null)
    const [user, setUser] = useState(null)
    const [profile, setProfile ] = useState(null)

    useEffect(() => {

        const session = supabase.auth.session();

        if(session) setUser(session.user);
        
        const { data: listener } = supabase.auth.onAuthStateChange( 
            async (event, session) => { 
                setUser(session?.user ?? null);
            } 
        )
    
        return () => {
          listener?.unsubscribe()
        }

    }, [])

    useEffect(()=>{
        if(user) check.then( (result)=> { 
            if(result)
                setId(result[0].simple_id);
            
            else
                createUserData()
            
        }, 
        (erro) => {
            console.log(erro);             
        })
    }, [user]);
    
    async function createUserData() {        
        const profile = {
            id: user.id,
            avatar_url: user.user_metadata.avatar_url,
            name: user.user_metadata.name,
            email: user.email,
            posts: null
        }

        let { data } = await supabase
        .from('profiles')
        .insert(profile);        

        setId(data[0].simple_id);
    }

    const check = new Promise( async (resolve, reject) => {

        let { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('email', user?.email);
        
        if(data.length >= 1) resolve(data);
        else resolve(null)

        if(error) reject(error);        
    })

    async function getProfile(id){
        if(id){
            let { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('simple_id', id);
        
            if (error) {
                throw error;
            }
            if(data.length > 0){
                setProfile(data[0]);
                return 'success'
            }
            else{
                return null;
            }
        }
    }

    async function login(provider){
        await supabase.auth.signIn({
            provider: provider
        }, {
            redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL
        })
    }

    async function logout(){
        await supabase.auth.signOut();
    }

    return(
        <AuthContext.Provider value={{login, logout, getProfile, profile, user, id}}>
            {children}
        </AuthContext.Provider>
    )
    
}

