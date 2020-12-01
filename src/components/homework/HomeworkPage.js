import React from "react";
import Navbar  from "../navbar/Navbar";
import HomeworkAssignments from "./HomeworkAssignments";
import { Loading } from "../loading/Loading";
import { withAuth0 } from "@auth0/auth0-react";
import { APIService } from '../../services/APIService';

class HomeworkPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: "homework",
            loading: false,
            homework: null,
            classes: null,
            selectedClass: "",
            assignmentText: ""
        };     

        this.submitAssignment = this.submitAssignment.bind(this);
        this.renderHomework = this.renderHomework.bind(this);
        this.updateAssignment = this.updateAssignment.bind(this);
        this.deleteAssignment = this.deleteAssignment.bind(this);
    }

    componentDidMount() {
        this.setState({loading: true});

        let user_id = this.props.auth0.user.sub;
        let _this = this;
        (async function () {
            let token = await _this.props.auth0.getAccessTokenSilently();
            APIService.getClasses(token, user_id, (classes => {
                console.log(classes);
                _this.setState({
                    classes: classes   
                });

                APIService.getHomework(token, user_id, (homework => {
                    _this.setState({
                        homework: homework   
                    });
                    _this.setState({loading: false});
                }));
            }));
        })();
    }

    // Push homework changes
    postHomework(hwCopy) {
        let user_id = this.props.auth0.user.sub;
        let _this = this;
        (async function () {
            let token = await _this.props.auth0.getAccessTokenSilently();
            let homeworkData = {
                userId: user_id,
                json: JSON.stringify(hwCopy)
            };

            APIService.postHomework(token, homeworkData, () => {
                _this.setState({
                    homework: hwCopy,
                    assignmentText: ""
                });
            });
        })();
    }

    // Create new assignment
    submitAssignment() {
        if(this.state.selectedClass.length <= 0 || this.state.assignmentText.length <= 0) return;
        let hwCopy = JSON.parse(JSON.stringify(this.state.homework));

        let existingClass = hwCopy[this.state.selectedClass];
        if(existingClass != null) {
            // Append assignment obj to class arr
            existingClass[this.getUnique()] = {
                desc: this.state.assignmentText,
                done: false
            };
            hwCopy[this.state.selectedClass] = existingClass;
        } else {
            // Create new array with obj to class
            let id = this.getUnique();
            hwCopy[this.state.selectedClass] = {
                [id]: {
                    desc: this.state.assignmentText,
                    done: false
                }
            };
        }

        console.log(JSON.stringify(hwCopy));
        
        this.postHomework(hwCopy);
   
    }

    updateAssignment(classId, assignmentId, assignmentObj) {
        let hwCopy = JSON.parse(JSON.stringify(this.state.homework));
        hwCopy[classId][assignmentId] = assignmentObj;
        this.postHomework(hwCopy);
    }

    deleteAssignment(classId, assignmentId) {
        let hwCopy = JSON.parse(JSON.stringify(this.state.homework));
        delete hwCopy[classId][assignmentId];
        if(Object.entries(hwCopy[classId]).length <= 0) delete hwCopy[classId];
        this.postHomework(hwCopy);
    }

    // Render classes select dropdown
    returnAllClasses() {
        let classSelect = [<option value="" disabled selected>Select a class...</option>]
        if(this.state.classes != null && Object.keys(this.state.classes).length > 0) {
            for (let [classId, classObj] of Object.entries(this.state.classes)) {
                classSelect.push(
                    <option value={classId}>{classObj.class}</option>
                )
            }
        }
        return classSelect;
    }

    handleClassSelectChange(selectedId) {
        this.setState({
            selectedClass: selectedId
        });
    }

    handleAssignmentTextChange(text) {
        this.setState({
            assignmentText: text
        });
    }

    renderHomework() {
        if(this.state.homework == null) return;
        
        let homeworkArr = [];
        for (let [classId, classHwObj] of Object.entries(this.state.homework)) {
            homeworkArr.push(
              <HomeworkAssignments classId={classId} className={this.state.classes[classId].class} classHw={classHwObj} updateAssignment={this.updateAssignment} deleteAssignment={this.deleteAssignment}/>
            );
        }

        return homeworkArr;
    }

    render() {
        return (
            (this.state.loading || this.state.classes == null || this.state.homework == null) ? <Loading /> :
            <>
                <main>
                    <fieldset>
                        <legend>Homework Logger</legend>
                        <div className="input-group">
                            <label>Class:</label>
                            <select className="homework-classes-selector" onChange={(e) => {this.handleClassSelectChange(e.target.value)}}> 
                                {this.returnAllClasses()}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Assignment:</label>
                            <input type="text" className="homework-assignment" value={this.state.assignmentText} onChange={(e) => {this.handleAssignmentTextChange(e.target.value)}}/>
                        </div>
                        <button type="submit" className="homework-submit center" onClick={() => {this.submitAssignment()}}>Submit</button>
                    </fieldset>

                    <hr/>

                    {this.renderHomework()}
                </main>
                
                <Navbar currentPage={this.state.currentPage} />
            </>
        );
    }

    getUnique() {
        return Math.random().toString(36).substr(2, 9);
    }

}

export default withAuth0(HomeworkPage);