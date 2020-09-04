import React from "react";

import Navbar  from "../navbar/Navbar";

export class HomeworkPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: "homework"
        };     
    }

    render() {
        return (
            <>
                <section>
                    <fieldset>
                        <legend>Homework Logger</legend>
                        <div class="input-group">
                            <label>Class:</label>
                            <select class="homework-classes-selector">
                                <option>Biology</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label>Assignment:</label>
                            <input type="text" class="homework-assignment" />
                        </div>
                        <button type="submit" class="homework-submit center">Submit</button>
                    </fieldset>
                </section>
                
                <Navbar currentPage={this.state.currentPage} />
            </>
        );
    }

}