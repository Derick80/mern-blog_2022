
import {useQuery, useMutation  }from 'react-query'



const getProfiles = async ()=>{

    const response = await fetch('http://localhost:8077/api/profiles', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
       
      })
    const data = await response.json()
    const {profile} = data
    return profile
}

const useProfile = ()=>{
    return useQuery('profiles', getProfiles)
}

export { useProfile, getProfiles}

