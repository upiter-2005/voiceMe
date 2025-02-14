import * as FileSystem from "expo-file-system"
import * as Sharing from 'expo-sharing'
import {Buffer} from "buffer"

const API_BASE_URL = "https://api.sws.speechify.com"
const API_KEY = "br07KB4pkrCemerCivaRdQgWIGW_EckZjVC55p_YXT4="


export async function getAudio(fileTitle: string, text: string, voiceId: string) {
	const res = await fetch(`${API_BASE_URL}/v1/audio/speech`, {
		method: "POST",
		body: JSON.stringify({
			input: `<speak>${text}</speak>`,
			voice_id: voiceId,
			audio_format: "mp3",
		}),
		headers: {
			Authorization: `Bearer ${API_KEY}`,
			"content-type": "application/json",
		},
	});

	if (!res.ok) {
		return new Error(`${res.status} ${res.statusText}\n${await res.text()}`)
	}

	const responseData = await res.json()
	const audio = Buffer.from(responseData.audio_data, "base64")
    console.log('==================================================================')
	console.log(responseData)
    
    //const fileUri = await FileSystem.documentDirectory + `${encodeURI(Date.now().toString())}${fileTitle}.mp3`
	const fname = fileTitle || encodeURI(Date.now().toString())
	const fileUri = await FileSystem.documentDirectory + `${fileTitle}.mp3`
    await FileSystem.writeAsStringAsync(fileUri, audio.toString('base64'), { encoding: FileSystem.EncodingType.Base64 });
    //await Sharing.shareAsync(fileUri)
    return fileUri
   
}


