import axios from "axios";

var checkUser = false;

function Authentication() {
    const url = "https://cors-everywhere.herokuapp.com/http://tweetapp-env.eba-ypubz2g3.us-west-2.elasticbeanstalk.com/api/v1.0/tweets/";
    const user = localStorage.getItem("loginId")

    axios.get(url + 'login/' + user)
        .then((e) => {
            checkUser =  e.data;
        })
}
export { checkUser, Authentication }