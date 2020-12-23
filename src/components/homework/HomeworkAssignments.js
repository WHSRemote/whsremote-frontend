import React from "react";
import { Card, Row, Col, Table} from "react-bootstrap";

export default class HomeworkAssignments extends React.Component{
    constructor(props) {
        super(props);
    }

    toggleDone(assId) {
        let assCopy = JSON.parse(JSON.stringify(this.props.classHw[assId]));
        assCopy.done = !assCopy.done;
        console.log("ASSIGNMENT COPY: " + JSON.stringify(assCopy));
        this.props.updateAssignment(this.props.classId, assId, assCopy);
    }

    deleteAssignment(assId) {
        // if(window.confirm("Are you sure you want to delete this assignment?")) {
            this.props.deleteAssignment(this.props.classId, assId);
        // }
    }

    renderAssignments() {
        let assArray = [];
        for (let [assignmentId, assignmentObj] of Object.entries(this.props.classHw)) {
            assArray.push(
                <tr className="assignment-row">
                    <td className="cell-done">
                        <input type="checkbox" className="checkbox-done" checked={assignmentObj.done} onChange={() => {this.toggleDone(assignmentId)}}/>
                    </td>
                    <td>
                        <span className={"assignment" + (assignmentObj.done ? " done" : "")}>{assignmentObj.desc}</span>
                    </td>
                    <td className="cell-actions">
                        <button className="w-100 btn-sm btn-secondary" onClick={() => {this.deleteAssignment(assignmentId)}}>X</button>
                    </td>
                </tr>
            );
        }
        return assArray;
    }

    render() {
        return (
            <Col xs={12} className="m-0 mt-2 mb-2">
                <Card border="primary">
                    <Card.Body>
                        <Card.Title>{this.props.className}</Card.Title>
                        <table className="assignment-table">
                            <tbody>
                                {this.renderAssignments()}
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}