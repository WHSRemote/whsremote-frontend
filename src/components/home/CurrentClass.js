import React from "react";
import { Card, Button, ProgressBar } from "react-bootstrap";
import C from "../../constants/Constants";
import moment from "moment";

export default function CurrentClass(props) {
    let periodPercent = null;
    let periodStart = props.periodDuration.start, periodEnd = props.periodDuration.end;
    if (periodStart != null && periodEnd != null) {
        periodPercent = (moment() - periodStart) / (periodEnd - periodStart) * 100;
        periodPercent = Number(Math.round(periodPercent * 100) / 100);
    }

    let content = null;
    switch (props.class) {
        case C.PERIOD_ADVISORY:
        case C.PERIOD_EXTADVISORY:
            content = (
                <>
                <Card.Header as="h3" className="flex align-items-center">
                    <div className="flex-1">
                        Advisory
                    </div>
                    <div>
                        <a class="btn btn-success h5 m-0 btn-lg" href={props.class.link} target="_blank">Join Meeting</a>
                        {/* <Button variant="success" className="h5 m-0" size="lg" href={props.class.link} target="_blank">Join Meeting</Button> */}
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                    {
                        props.class.teacher != null ? (
                            <>
                                Teacher: {props.class.teacher}
                            </>
                        ) : (
                            <><p>Add your Advisory class in Settings -> Classes and choose Advisory as the period!</p></>
                        )
                    }   
                    </Card.Text>
                </Card.Body>
                </>
            );
            break;

        case C.PERIOD_SCREENBREAK:
            content = (
                <>
                <Card.Header as="h1" className="text-center"><b>TAKE A SCREEN BREAK!</b></Card.Header>
                </>
            );
            break;

        case C.PERIOD_LUNCH:
            content = (
                <>
                <Card.Header as="h1" className="text-center">🧁 Lunch Time! 🧁</Card.Header>
                </>
            );
            break;

        case C.OUT_OF_SCHOOL:
            content = (
                <>
                <Card.Header as="h1" className="text-center">🎉 NO SCHOOL! 🎉</Card.Header>
                </>
            );
            break;
    
        default:
            if (props.class == null || props.class == "" || Object.keys(props.class).length == 0) {
                content = (
                    <Card.Header as="h1" className="text-center">Free! 😁</Card.Header>
                );
            } else {
                content = (
                    <>
                    <Card.Header as="h3" className="flex align-items-center">
                        <div className="flex-1">
                            Current Class: <b>{props.class.class}</b>
                        </div>
                        <div>
                            <a class="btn btn-success h5 m-0 btn-lg" href={props.class.link} target="_blank">Join Meeting</a>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                        <p>Teacher: {props.class.teacher}</p>
                        <span>Room: {props.class.room}</span>
                        </Card.Text>
                    </Card.Body>
                    </>
                );
            }
            break;
    }
    return (
        <>
        <Card className="w-100" bg="light">
            { content }
            
        </Card>
        { periodPercent != null ?
            (
            <>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={periodPercent} aria-valuemin="0" aria-valuemax="100" style={{width: periodPercent + "%"}}>
                        <span className="start-time" style={{color: periodPercent > 5 ? "white" : "black"}}>{periodStart.format(C.WEIRD_PERSON_TIME_FORMAT)}</span>
                        <span className="end-time" style={{color: periodPercent > 95 ? "white" : "black"}}>{periodEnd.format(C.WEIRD_PERSON_TIME_FORMAT)}</span>
                    </div>
                </div>
            </>
            ) : 
            <></>
        }
        </>
    );
}