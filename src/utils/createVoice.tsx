import * as FileSystem from "expo-file-system"

const API_BASE_URL = "https://api.sws.speechify.com/v1/voices"
const API_KEY = "br07KB4pkrCemerCivaRdQgWIGW_EckZjVC55p_YXT4="

export const createVoice = async(name: string, filePath: string) => {
    try {
        const response = await FileSystem.uploadAsync(`${API_BASE_URL}`, filePath, {
            headers: {
              Accept: '*/*',
              'content-type': 'multipart/form-data',
		          Authorization: `Bearer ${API_KEY}`,
            },
          fieldName: 'sample',
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          parameters: {
            name,
            consent: '{"fullName": "ricky","email": "herrmannoliver862@gmail.com"}'
          }
        });
        console.log(JSON.stringify(response, null, 4));
      } catch (error) {
        console.log(error);
      }
}


