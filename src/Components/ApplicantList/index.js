// Get jwt token from server in a react component

import axios from "axios";


function getToken() {
  var token = localStorage.getItem('token');
  if (token) {
    return token;
  } else {
    return false;
  }
}
// Get user info from server in a react component

export default function User(){
var token = getToken();
if(token){
axios.get('/api/user/'+token)
.then(function(response){
  console.log(response.data);
})
.catch(function(error){
  console.log(error);
}
)}

return (
  <div>
    <h1>User</h1>
  </div>
);
}

