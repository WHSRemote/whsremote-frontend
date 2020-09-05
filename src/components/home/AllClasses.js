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
    console.log("Haha : " + JSON.stringify(props.classes));
    Object.entries(props.classes).forEach(([key, value], index) => {
        
        classCards.push(
            <Col xs={12} sm={6} md={3} className="mt-2 mb-2">
                <Card border={colors[index]} classId={key}>
                    <Card.Body>
                        <Card.Title>{value.class}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Teacher: {value.teacher}</Card.Subtitle>
                        <Card.Text>
                            Some quick description
                        </Card.Text>
                        <Card.Link href={value.link}>Zoom Link</Card.Link>
                        <Card.Link href="#">Google Classroom</Card.Link>
                    </Card.Body>
                </Card>
            </Col>
        );
    });

    return (
        classCards
    );
}