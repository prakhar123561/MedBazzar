import axios from "axios";

var serverUrl = 'http://localhost:5000'
const postData = async (url,body)=>{
    try{
    var response = await axios.post(`${serverUrl}/${url}`,body)
    var result = response.data
    return(result)
    }
    catch(e){
        return(null)
    }
}

const getData = async(url)=>{
    try{
    var response = await axios.get(`${serverUrl}/${url}`)
    var result = response.data
    return(result)
    }
    catch(e){
        return(null)
    }
}

export{serverUrl,postData,getData}