import React from "react";
import { Accordion, Form } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import ClassConfig from "./ClassConfig";
import { APIService } from "../../../services/APIService";
import { Loading } from "../../loading/Loading";

class ClassSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classList: {}
        }

        this.submitClasses = this.submitClasses.bind(this);
        this.appendClass = this.appendClass.bind(this);
        this.changeClassData = this.changeClassData.bind(this);
    }

    componentDidMount() {
        console.log("Settings: " + JSON.stringify(this.props.classSettings))
        if(this.props.classSettings != null && Object.keys(this.props.classSettings).length > 0) {
            this.setState({
                classList: this.props.classSettings
            })
        }
    }

    submitClasses(event) {
        event.preventDefault();
        if(!window.confirm('Are you sure your class information is correct before submitting?')) {
            return;
        }

        // Clear out the elements where the class name is blank
        let classListCopy = this.state.classList;
        for (let [id, classObj] of Object.entries(this.state.classList)) {
            if (classObj.class === "") {
                delete classListCopy[id];
            } 
        }
        
        let user_id = this.props.auth0.user.sub;

        let classData = {
            userId: user_id,
            json: JSON.stringify(classListCopy)
        };
        console.log(classData);
        // console.log(form.elements["period" + "1" + "-class"].value);
        
        let _this = this;
        _this.setState({loading: true});
        (async function () {
            let token = await _this.props.auth0.getAccessTokenSilently();
            APIService.postClasses(token, classData, (response => {
                console.log("POST CLASSES: " + JSON.stringify(response));
                _this.setState({loading: false});
            }));
        })();
    }

    appendClass() {
        let modifiedList = this.state.classList;
        modifiedList[this.getUnique()] = {
            period: 1,
            room: "",
            class: "",
            teacher: "",
            link: ""
        };
        this.setState({
            classList: modifiedList
        })
    }

    changeClassData(id, key, value){
        let currentClassList = this.state.classList;
        currentClassList[id][key] = (key === "period") ? Number(value) : value;
        
        this.setState({
            classList: currentClassList
        });
        console.log(JSON.stringify(this.state.classList));
    }

    render() {
        let classConfigDOM = [];
        for (let [id, classObj] of Object.entries(this.state.classList)) {
            classConfigDOM.push(
                <ClassConfig id={id} classSettings={classObj} changeClassData={this.changeClassData}/>
            );
        }
        return (
            <>
            <Form onSubmit={this.submitClasses}>
                {
                    classConfigDOM
                }
                <button className="add-classes" type="button" onClick={this.appendClass}>+ Add Classes</button>
                <button className="center mt-3" type="submit">Save Classes</button>
            </Form>
            </>
        );
    }

    getUnique() {
        return Math.random().toString(36).substr(2, 9);
    }
}

export default withAuth0(ClassSettings);
