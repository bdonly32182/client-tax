import jwtDecode from 'jwt-decode'
function setToken (token) {
    localStorage.setItem("ACCESS_TOKEN",token)
}

function getToken () {
  return  localStorage.getItem("ACCESS_TOKEN")
}

function removeToken (){
    localStorage.removeItem("ACCESS_TOKEN")
}
function getRole(){
    if(getToken()){
        let token = getToken();
        let role = jwtDecode(token).Role;
        return role
    }
    return "guest"
}
const allFunc = {
    setToken,
    getToken,
    removeToken,
    getRole
}
export default  allFunc