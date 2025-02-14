import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"

export const useGetSession = () => {
    const [session, setSession] = useState<null | {}>(null)
    
    const getUserFromLocalStorage = async() => {
        const user = await AsyncStorage.getItem("@user")
        console.log(user)
        if(!user){return}
        setSession(user)
    }

    useEffect(()=>{}, [
        getUserFromLocalStorage()
    ])

    return {session}
}