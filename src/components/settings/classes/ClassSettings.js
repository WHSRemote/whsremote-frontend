import React from "react";
import { Accordion, Form } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import ClassAccordion from "./ClassAccordion";
import { APIService } from "../../../services/APIService";
import { Loading } from "../../loading/Loading";

class ClassSettings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            period1: "",
            period2: "",
            period3: "",
            period4: "",
            period5: "",
            period6: "",
            period7: "",
            period8: "",
        }

        this.submitClasses = this.submitClasses.bind(this);
    }

    submitClasses(event) {
        if(!window.confirm('Are you sure your class information is correct before submitting?')) {
            return;
        }
        event.preventDefault();

        let form = event.target;

        let classesObj = [];
        for(let i = 1; i < 9; i++) {
            let class_name = form.elements["period" + i + "-class"].value;
            if(class_name.length === 0) continue;

            classesObj.push({
                period: i,
                class: form.elements["period" + i + "-class"].value,
                teacher: form.elements["period" + i + "-teacher"].value,
                link: form.elements["period" + i + "-link"].value
            });
        }
        
        let user_id = this.props.auth0.user.sub;

        let classData = {
            userId: user_id,
            json: JSON.stringify(classesObj)
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

    render() {
        return (
            <>
            {this.state.loading ? <Loading /> : <></>}
            <Form onSubmit={this.submitClasses}>
                <Accordion>
                    <ClassAccordion period="1" />
                    <ClassAccordion period="2" />
                    <ClassAccordion period="3" />
                    <ClassAccordion period="4" />
                    <ClassAccordion period="5" />
                    <ClassAccordion period="6" />
                    <ClassAccordion period="7" />
                    <ClassAccordion period="8" />
                </Accordion>
                <button className="center mt-3" type="submit">Save Classes</button>
            </Form>
            </>
        );
    }
}

export default withAuth0(ClassSettings);
