import { useEffect, useState } from 'react'
const API_BASE_URL = "https://api.sws.speechify.com";
const API_KEY = "br07KB4pkrCemerCivaRdQgWIGW_EckZjVC55p_YXT4=";

export const useGetVoices = () => {
    const [voices, setVoices] = useState<[]>();
    
    useEffect(()=>{
        async function getVoices(){
            const res = await fetch(`${API_BASE_URL}/v1/voices`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${API_KEY}`,
                },
              });
              const response = await res.json()
              
              setVoices(response)
              console.log(response)
            
        }
        getVoices()
    }, [])
  return {voices}
}