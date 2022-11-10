import setCookie from "../utils/setCookie"


const useLogin = (username, password) => {
   const body = {'username': username, 'password': password}
   return fetch(`${process.env.REACT_APP_HOST_API}/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
   })
   .then(res => {
      if (!res.ok) {throw Error("Some error occured with the json response")}
      return res.json()
   })
   .then(data => {
      console.log(data)
      if (data.token){
         setCookie('usrin', data.token)
         return true
      }
      return false
   })
   .catch(err => {
      console.log(err.message)
   })
}

export default useLogin;