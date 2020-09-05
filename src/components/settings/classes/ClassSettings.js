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
            classList: []
        }

        this.submitClasses = this.submitClasses.bind(this);
        this.appendClass = this.appendClass.bind(this);
        this.changeClassData = this.changeClassData.bind(this);
    }

    componentDidMount() {
        console.log("Settings: " + JSON.stringify(this.props.classSettings))
        if(this.props.classSettings != null && this.props.classSettings.length > 0) {
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
        let classListCopy = this.state.classList.filter((item) => item.class !== "");
        
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
        this.setState({
            classList: [...this.state.classList, {
                period: 1,
                class: "",
                teacher: "",
                link: ""
            }]
        })
    }

    changeClassData(i, key, value){
        let currentClassList = this.state.classList;
        currentClassList[i][key] = value;
        this.setState({
            classList: currentClassList
        });
        // console.log(JSON.stringify(this.state.classList));
    }

    render() {
        return (
            <>
            {this.state.loading ? <Loading /> : <></>}
            <Form onSubmit={this.submitClasses}>
                {
                    this.state.classList.map((classObj, i) => {
                        return (
                            <ClassConfig index={i} classSettings={classObj} changeClassData={this.changeClassData}/>
                        );
                    })
                }
                <button className="add-classes" type="button" onClick={this.appendClass}>+ Add Classes</button>
                <button className="center mt-3" type="submit">Save Classes</button>
            </Form>
            </>
        );
    }
}

export default withAuth0(ClassSettings);
