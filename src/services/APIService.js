 
// let API_URL = "https://whsremote.free.beeceptor.com";
let API_URL = "https://ddc513152e6c.ngrok.io";
class APIService {
    static getClasses(token, user_id, callback) {
        (async () => {
            fetch(API_URL + "/classes?id=" + encodeURI(user_id), {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                if(response.ok) {
                    response.json().then(json => {
                        callback(json);
                    });    
                }
            });
        })();
    }

    static postClasses(token, data, callback) {
        (async () => {
            fetch(API_URL + "/classes", {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then(function(response) {
                if(response.ok) {
                    callback();
                }
            });
        })();
    }

    static getSchedule(token, user_id, callback) {

    }
}

export { APIService };