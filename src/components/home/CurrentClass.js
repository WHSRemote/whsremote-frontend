import React from "react";
import { Card, Button } from "react-bootstrap";
import C from "../../constants/Constants";

export default function CurrentClass(props) {
    let content = null;
    switch (props.class) {
        case C.PERIOD_ADVISORY:
            content = (
                <>
                <Card.Header as="h3">Advisory</Card.Header>
                <Card.Body>
                    <Card.Text>
                    Teacher: {props.class.teacher}
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

        case C.PERIOD_EXTADVISORY:
            content = (
                <>
                <Card.Header as="h3">Extended Advisory</Card.Header>
                <Card.Body>
                    <Card.Text>
                    Teacher: {props.class.teacher}
                    </Card.Text>
                </Card.Body>
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
            content = (
                <>
                <Card.Header as="h3" className="flex align-items-center">
                    <div className="flex-1">
                        Current Class: <b>{props.class.class}</b>
                    </div>
                    <div>
                        <Button variant="success" className="h5 m-0" size="lg" href={props.class.link}>Join Meeting</Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                    Teacher: {props.class.teacher}
                    </Card.Text>
                </Card.Body>
                </>
            );
            break;
    }
    return (
        <Card className="w-100" bg="light">
            { content }
        </Card>
    );
}