import axios from "axios"
import { v4 as uuidv4 } from 'uuid';

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
        console.log("inside func getProfile", userId, typeof(userId))
        try {
            const url = 'https://sm-easy-test.site/api/users/'+ userId.toString() + '/worksheet/';
            console.log("URL=",url);
            const response = await axios.get(url);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
        }
        
    }
    static async updateProfile(userId ,profile){
        console.log("inside func updateProfile", profile)
        profile = {...profile, "id": uuidv4()}
        try {
            const url = `https://sm-easy-test.site/api/users/${userId.toString()}/worksheet/update`
            console.log(url, profile)
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
    static async createProfile(profile){
        console.log("inside func updateProfile", profile)
        profile = {...profile, "id": uuidv4()}
        try {
            const url = "https://sm-easy-test.site/api/worksheet/create";
            console.log(url, profile)
            const response = await axios.post(url, profile, {
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

    static async getParsedPositions(){
        
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
    
          const positionsList = response.data.map(item => ({
            value: item.id,
            label: item.name
          }));
          console.log("posis", positionsList)
          return positionsList
        } catch (error) {
          console.error('Error fetching positions:', error);
        }
      }

    static async getUserProjects(userId){
        console.log("inside func getPositions")
        try {
            const url = `https://sm-easy-test.site/api/users/${userId.toString()}/projects`
            console.log(url)
            const response = await axios.get(url, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
            console.log("inside func getUserProjects", response)
            return response;
        } catch (error) {
            console.log(error)
        }
        
    }

    static async getProjectTasks(projectId){
        try {
            const url = `https://sm-easy-test.site/api/projects/${projectId.toString()}/tasks`
            const response = await axios.get(url, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
            //console.log("inside func getProjetcsTasks", response)
            return response

        } catch (error) {
            console.log(error)
        }
    }

    static async addProject(project){
            const url = "https://sm-easy-test.site/api/projects/"
            project = {...project, "id": uuidv4()}
            const response = await axios.post(url, project,{
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
            console.log("inside func addProjects", response)
            return response

       
            
    }

    static async editProject(projectId,project){
        const url = `https://sm-easy-test.site/api/projects/${projectId}`
        const response = await axios.put(url, project,{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
        console.log("inside func editProjects", response)
        return response      
    }



    
    static async getTask(taskId){
            
        try {
            const url = `https://sm-easy-test.site/api/tasks/${taskId.toString()}`
            console.log(url)
            const response = await axios.get(url, {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
            })
            console.log("inside func getUserProjects", response)
            return response;
        } catch (error) {
            console.log(error)
        }

    }

    static async addTask(task){
        const url = "https://sm-easy-test.site/api/tasks/"
        task = {...task, "id": uuidv4()}
        const response = await axios.post(url, task,{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
        console.log("inside func addProjects", response)
        return response    
    }


    static async updateTask(taskId, task){
        const url = `https://sm-easy-test.site/api/tasks/${taskId}`
        const response = await axios.put(url, task,{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
        console.log("inside func addTask", response)
        return response    
    }

    static async deleteTask(taskId){
        console.log("inside func taskDelte", taskId)
        try {
            const url = 'https://sm-easy-test.site/api/tasks/'+ taskId.toString();
            console.log(url)
            const response = await axios.delete(url);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
        }
        
    }

    static async deleteProject(projectId){
        console.log("inside func projectDelete", projectId)
        try {
            const url = 'https://sm-easy-test.site/api/projects/'+ projectId.toString();
            console.log(url)
            const response = await axios.delete(url);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
        }
        
    }

    static async getExecutorTasks(userId){
        try {
            const url = `https://sm-easy-test.site/api/users/${userId.toString()}/tasks`
            const response = await axios.get(url, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
            return response

        } catch (error) {
            console.log(error)
        }
    }

    static async getProject(projectId){
        console.log("inside func getPositions")
        try {
            const url = `https://sm-easy-test.site/api/projects/${projectId.toString()}`
            console.log(url)
            const response = await axios.get(url, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
            console.log("inside func getUserProjects", response)
            return response;
        } catch (error) {
            console.log(error)
        }
        
    }

    static async changeTaskStatus(userId,taskId, newStatus){
        console.log("inside func changeTaskStatus")
        const queryParams = {
            status: newStatus
          };
          
        try {
            const url = `https://sm-easy-test.site/api/users/${userId.toString()}/tasks/${taskId.toString()}/update_status`
            console.log(url, userId, taskId, newStatus)
            const response = await axios.put(url,null,{params: queryParams}, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
            console.log("inside func getUserProjects", response)
            return response;
        } catch (error) {
            console.log(error)
        }

    }

    

}


