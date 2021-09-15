
import {useQuery, useMutation  }from 'react-query'



const getProfile = async ()=>{

    const response = await fetch('http://localhost:8077/api/profile', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
       
      })
    const data = await response.json()
    const {profile} = data
    return profile
}

const useProfile = ()=>{
    return useQuery('profile', getProfile)
}

export { useProfile, getProfile}

