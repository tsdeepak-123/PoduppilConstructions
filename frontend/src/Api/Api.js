import axios from 'axios'

// export const axiosAdmin = axios.create({
//     baseURL:'http://localhost:5001/admin/' //base url here
// })




// import axios from "axios";

import {adminApi,userApi} from '../Stores/Api'

import { useCookies } from 'react-cookie';



  const getTokenFromCookie=(cookieName)=>{
  
        const cookieValue = document.cookie.split('; ').find(row => row.startsWith(`${cookieName}=`))?.split('=')[1];
        console.log(cookieValue,'cookieValue');
    
        return cookieValue || null;
 

  }




const createApiInstance = (baseURL) => {
   try {
    
   
   
    const instance = axios.create({
        baseURL:baseURL,
        // withCredentials: true,
      
    });
    instance.interceptors.request.use(config=>{
        
        const token=getTokenFromCookie('AdminsecretKey')
        console.log('tokennew',token); 
        if(token){
            // config.headers ['Authorization']=`Bearer${token}`
            config.headers['Authorization'] = `Bearer ${token}`;

            
        }
        console.log(config.headers,'config');
        return config
    })
   
console.log(instance,'instanceee');
    return instance;
} catch (error) {
   
        <error500/>
         
}
    
};

// export const UserApiInstance = createApiInstance(userApi,"jwtOfUser");

export const UserApiInstance = createApiInstance(userApi, "");
export const axiosAdmin = createApiInstance(adminApi);
