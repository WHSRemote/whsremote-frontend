import { toast, Slide } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';

// let API_URL = "https://ecce11b0643a.ngrok.io";
let API_URL = "https://api-1599490315769.azurewebsites.net";
// let TOAST_OPTIONS = {
//     position: "top-right",
//     autoClose: 3000,
//     hideProgressBar: true,
//     closeOnClick: true,
//     pauseOnHover: false,
//     draggable: true,
//     progress: undefined, 
//     transition: {Slide}
// };
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
                } else {
                    toast.error("Something went wrong when retrieving class data.");
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
                    toast.success("Classes saved!");
                    callback();
                } else {
                    toast.error("Something went wrong when saving class data.");
                }
            });
        })();
    }

    static getScheduleUpdate(token, callback) {
        (async () => {
            fetch(API_URL + "/schedule/update", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                if(response.ok) {
                    // Expects {} for no new schedule, {day: 2} with new schedule
                    response.json().then(json => {
                        callback(json);
                    });    
                } else {
                    toast.error("Something went wrong when retrieving scheduling update.");
                }
            });
        })();
    }

    static getSchedule(token, user_id, callback) {
        (async () => {
            fetch(API_URL + "/schedule?id=" + encodeURI(user_id), {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                if(response.ok) {
                    response.json().then(json => {
                        callback(json);
                    });    
                } else {
                    toast.error("Something went wrong when retrieving schedule data.");
                }
            });
        })();
    }

    static postSchedule(token, data, callback) {
        (async () => {
            fetch(API_URL + "/schedule", {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then(function(response) {
                if(response.ok) {
                    toast.success("Schedule saved!");
                    callback();
                } else {
                    toast.error("Something went wrong when saving schedule data.");
                }
            });
        })();
    }
    
    static getHomework(token, user_id, callback) {
        (async () => {
            fetch(API_URL + "/homework?id=" + encodeURI(user_id), {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                if(response.ok) {
                    response.json().then(json => {
                        callback(json);
                    });    
                } else {
                    toast.error("Something went wrong when retrieving homework data.");
                }
            });
        })();
    }

    static postHomework(token, data, callback) {
        (async () => {
            fetch(API_URL + "/homework", {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then(function(response) {
                if(response.ok) {
                    toast.success("Homework assignment saved!");
                    callback();
                } else {
                    toast.error("Something went wrong when saving homework data.");
                }
            });
        })();
    }
}

export { APIService };