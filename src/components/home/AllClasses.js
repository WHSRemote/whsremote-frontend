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
    
    let classCards = [];
    Object.entries(props.classes).forEach(([key, value], index) => {
        
        classCards.push(
            <Col xs={12} sm={6} md={3} className="mt-2 mb-2">
                <Card border={colors[index]} classID={key}>
                    <Card.Body>
                        <Card.Title>{value.class}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Teacher: {value.teacher}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Period: {value.period}</Card.Subtitle>
                        {/* <Card.Text>
                            <small className="muted">Period: {value.period}</small>
                        </Card.Text> */}
                        <a class="card-link" href={value.link} target="_blank">Meeting Link</a>
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