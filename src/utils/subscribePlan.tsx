import AsyncStorage from "@react-native-async-storage/async-storage"
import userStore, { Plan } from "../store/userStore"
import { router } from "expo-router"



   export  const useSubscribe = async(value: Plan) => {
        const {changePlan, setRegisteredTime} = userStore()
        const now = Date.now()
        await AsyncStorage.setItem("@hasPlan", JSON.stringify({planType: value, planStart: now}))
        changePlan(value)
        setRegisteredTime(now)
        router.replace('/record')
    }
  

    