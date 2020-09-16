import React from "react";
import { Accordion, Card } from "react-bootstrap";

export class PoliciesPage extends React.Component {
    render() {
        return (
            <section>
                <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                        Privacy Policy
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <span>
                                The data that WHSRemote.com collects is primarily through Auth0, an external identity provider.
                                When you sign in/sign up, Auth0 collects your email and creates a user with a user ID, which is what WHSRemote.com uses to associate data with an identity (you, the user).
                                <br/><br/>
                                Your username (email) and password are not stored by us (WHSRemote); they are stored in Auth0's servers, which are trusted and secured to the maximum degree.
                                Other data that WHSRemote.com uses includes data that is automatically captured when you visit a website, such as your external IP, browser, and more.
                                Auth0, through WHSRemote, stores cookies determining if a user is logged in or not, for authentication and security purposes.
                                There are no Google Analytics trackers/cookies utilized on WHSRemote.com, nor any advertisements.
                                <br/><br/>
                                In the application, all custom data (classes, schedules, etc.) is stored on a MySQL database hosted on Microsoft Azure. Security on Microsoft Azure's platform is top-notch – the chance that a Microsoft-hosted database is hacked is miniscule.
                                All custom data is also bound to a user ID, provided by Auth0, not an email or name that reveals the personal identity of a user.
                                Meeting links that students provide will be encrypted, so in the unlikely scenario where the database is compromised, attackers will not gain any usable information that could cause harm to others.
                                This custom data is accessed by WHSRemote.com through HTTPS endpoints on a backend server, also hosted on Microsoft Azure.
                                There is JSON Web Token (JWT) verification present on the endpoints, so only requests where the user is properly authenticated and authorized can obtain access to information.
                                <br/><br/>
                                By using WHSRemote.com, you agree to allow WHSRemote.com to store cookies and access your email and associated user ID created by Auth0.
                                By using WHSRemote.com, you also consent to being contacted through the email that you provide to Auth0 (through WHSRemote.com).
                                
                            </span>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </section>
        );
    }
}