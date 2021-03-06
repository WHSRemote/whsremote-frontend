import React from "react";
import { Card, Col } from "react-bootstrap";

export default function AllClasses(props) {

    let colors = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'dark',
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'dark',
    ];
    //This is a comment that is awesome because it is made by your girlfriend who is awesome and this code makes peole ANGERY >:(
    let classCards = [];
    Object.entries(props.classes).forEach(([key, value], index) => {
        
        classCards.push(
            <Col xs={12} sm={6} md={3} className="mt-2 mb-2">
                <Card border={colors[index]} classID={key}>
                    <Card.Body>
                        <Card.Title>{value.class}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Teacher: {value.teacher}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Period: {value.period}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Room: {value.room ? value.room : "N/A"}</Card.Subtitle>
                        {/* <Card.Text>
                            <small className="muted">Period: {value.period}</small>
                        </Card.Text> */}
                        <a className="card-link" href={value.link} target="_blank">Meeting Link</a>
                        {/* <Card.Link href={value.link} >Meeting Link</Card.Link> */}
                    </Card.Body>
                </Card>
            </Col>
        );
    });

    return (
        classCards
    );
}