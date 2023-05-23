import { useMemo } from "react"

export const useSortedPosts = (posts, sort) => {

    const sortedPosts = useMemo( () => {
        console.log("function get sorted posts")
        if (sort){
          return [...posts].sort((a,b) => a[sort].localeCompare(b[sort]))
    
        }
        return posts
      }, [sort, posts])


      return sortedPosts;
}

export const UsePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort)

    const sortedAndSearchedPosts = useMemo( ()=> {
        return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
      }, [query, sortedPosts])

      return sortedAndSearchedPosts;

}