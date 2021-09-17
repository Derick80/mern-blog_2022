import { useSession, getSession } from 'next-auth/client'
import { useQuery } from 'react-query'

import ProfilesCard from '../../components/ProfilesCard'


const UserProfiles = () => {

    const [session] = useSession()

    const getProfiles = async (props: any) => {

        const response = await fetch('http://localhost:8077/api/profiles', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },

        })
        const data = await response.json()
        const { profiles } = data
        return profiles

    }

    const { data: profiles, status, error } = useQuery('profiles', getProfiles)

 



    if (!session) {
        return (
            <div>
                <div>You need to be authenticated to view this page.</div>
            </div>
        )
    } else if
        (status === 'loading') {
        return (
            <div>
                profiles are loading
            </div>
        )

    }
    else if (status === 'success') {
        return <div>
            <ProfilesCard  props={profiles} />

        </div>
    }
    else {
        return (<div>Nothing to see here</div>)
    }
}




export default UserProfiles
