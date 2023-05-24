import axios from "axios"

export default class PostService {
    static async getAll(limit = 10, page = 1){
        console.log(limit, page);
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                params: {
                    _limit: limit,
                    _page: page
                }
            })
            return response;
        } catch (error) {
            console.log(error)
        }
        
    }
    static async getById(id = 1){
        console.log("inside funct id", id)
        try {
            const url = 'https://jsonplaceholder.typicode.com/posts/'+id
            console.log(url)
            const response = await axios.get(url);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
        }
        
    }
    static async getCommentsById(id = 1){
        console.log("inside funct commentsid", id)
        try {
            const url = 'https://jsonplaceholder.typicode.com/posts/'+id + '/comments'
            console.log(url)
            const response = await axios.get(url);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
        }
        
    }
    static async getProfile(userId){
        console.log("inside func getProfile", userId)
        try {
            const url = `https://sm-easy-test.site/api/users/${userId}/worksheet/`
            console.log(url)
            const response = await axios.get(url);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
        }
        
    }
    static async updateProfile(userId ,profile){
        console.log("inside func getProfile", profile)
        try {
            const url = `https://sm-easy-test.site/api/users/${userId}/worksheet/update`
            console.log(url)
            const response = await axios.put(url, profile, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
        }
        
    }
    static async getPositions(){
        console.log("inside func getPositions")
        try {
            const url = `https://sm-easy-test.site/api/positions/`
            console.log(url)
            const response = await axios.get(url, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
            console.log("inside func getPositions", response)
            return response;
        } catch (error) {
            console.log(error)
        }
        
    }

    static async getUserProjects(userId){
        console.log("inside func getPositions")
        try {
            const url = `https://sm-easy-test.site/api/users/${userId}/projects`
            console.log(url)
            const response = await axios.get(url, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
            console.log("inside func getPositions", response)
            return response;
        } catch (error) {
            console.log(error)
        }
        
    }

}


