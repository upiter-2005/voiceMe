import React from "react"
import { TouchableOpacity, Image } from "react-native"
import userStore, { Plan } from "../store/userStore"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"

interface IPlanBtn {
    name: Plan
    img: ImageData 
}
export const PlanButton:React.FC<IPlanBtn> = ({name, img}) => {
    const {changePlan, setRegisteredTime} = userStore()

      const changeSubscribePlan = async() => {
        const now = Date.now()
        await AsyncStorage.setItem("@hasPlan", JSON.stringify({planType: name, planStart: now}))
        changePlan(name)
        setRegisteredTime(now)
        router.replace('/record')
    }

    return (
        <TouchableOpacity onPress={changeSubscribePlan}>
            <Image
                source={img}
                resizeMode='contain'
                style={{width:313, height:123}}
            />
        </TouchableOpacity>
    )
}