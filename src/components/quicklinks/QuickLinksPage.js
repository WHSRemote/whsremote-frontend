import React from "react";

import Navbar  from "../navbar/Navbar";
import { Loading } from "../loading/Loading";
import { withAuth0 } from "@auth0/auth0-react";
import { APIService } from '../../services/APIService';
import StaticLinks from "./StaticLinks";
import { Row, Col, ListGroup, Form, Button} from "react-bootstrap"

class QuickLinksPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: "quicklinks",
            quickLinks: null,
            linkTitle: "",
            linkUrl: ""
        };     

        this.openLink = this.openLink.bind(this);
    }

    componentDidMount() {
        this.setState({loading: true});

        let user_id = this.props.auth0.user.sub;
        let _this = this;
        (async function () {
            let token = await _this.props.auth0.getAccessTokenSilently();
            APIService.getQuickLinks(token, user_id, (links => {
                _this.setState({
                    quickLinks: links,
                    loading: false,
                });
            }));
        })();
    }

    openLink(link) {
        window.open(
            link,
            '_blank' // <- This is what makes it open in a new window.
          );
    }

    handleLinkTitleChange(text) {
        this.setState({
            linkTitle: text
        });
    }

    handleLinkUrlChange(url) {
        this.setState({
            linkUrl: url
        });
    }

    render() {
        return (
            (this.state.loading || this.state.quickLinks == null) ? <Loading /> :
            <>
                <main>
                    <h1 className="text-center">Quick Links</h1>
                    <hr/>

                    <Row>
                        <Col xs={12} sm={4}>
                            <fieldset>
                                <legend>Custom Links</legend>
                                <Form.Row>
                                    <Col xs={12} md={5}>
                                        <Form.Control placeholder="Title" value={this.state.linkTitle} onChange={(e) => {this.handleLinkTitleChange(e.target.value)}}/>
                                    </Col>
                                    <Col xs={12} md={5}>
                                        <Form.Control placeholder="Link" value={this.state.linkUrl} onChange={(e) => {this.handleLinkUrlChange(e.target.value)}}/>
                                    </Col>
                                    <Col xs={12} md={2}>
                                        <Button variant="dark" className="w-100" onClick={() => {this.submitAssignment()}}>Add</Button>
                                    </Col>
                                </Form.Row>
                                
                                <hr/>
                                <ListGroup>
                                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                </ListGroup>
                            </fieldset>
                        </Col>

                        <Col xs={12} sm={8}>
                            <StaticLinks/>        
                        </Col>
                    </Row>
                    
                </main>
                <Navbar currentPage={this.state.currentPage} />
            </>
        );
    }

}
export default withAuth0(QuickLinksPage);