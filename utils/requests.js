import { supabase } from "./supabase";


/**
 * Return all posts avaible in range on public-posts.
 * @param id User simple_id used to search posts.
 */
 async function getPostsFromUser(id){

    let { data, error } = await supabase
        .from('posts')
        .select()
        .eq('author_simple_id', id)
        .order('created_at', {ascending: false});

    if(error)
        throw error;

    if(data)
        return data;

    else 
        return null;
}

/**
 * Return all posts avaible in range on public-posts.
 * @param from Column to begin search.
 * @param to Column to end search.
 */
async function getPostsInRange(from, to){

    let { data, error } = await supabase
        .from('posts')
        .select()
        .range(from, to)
        .order('created_at', {ascending: false});

    if(error)
        throw error;

    if(data)
        return data;

    else 
        return null;
}

/**
 * Return the profile corresponding the simple_id.
 * @param in simple_id of the user.
 */
async function getProfile(id){
    if(id){
        let { data, error } = await supabase
            .from('profiles')
            .select()
            .eq('simple_id', id);
    
        if (error) 
            throw error;

        if (data.length > 0)
            return data[0];

        else
            return null;
    }
}

export { getProfile, getPostsInRange, getPostsFromUser }