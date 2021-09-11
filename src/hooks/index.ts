
import {useQuery, useMutation  }from 'react-query'



const getProfile = async ()=>{

    const response = await fetch('api/profile')
    const data = await response.json()
    const {profile} = data
    return profile
}

const useProfile = ()=>{
    return useQuery('profile', getProfile)
}

export { useProfile, getProfile}

