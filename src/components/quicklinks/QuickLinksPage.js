import React from "react";

import Navbar  from "../navbar/Navbar";
import { Loading } from "../loading/Loading";
import { withAuth0 } from "@auth0/auth0-react";
import { APIService } from '../../services/APIService';
import StaticLinks from "./StaticLinks";
import C from "../../constants/Constants";
import { Row, Col, ListGroup, Form, Button} from "react-bootstrap"

class QuickLinksPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: "quicklinks",
            quickLinks: null,
            title: "",
            url: ""
        };     
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

    handleTitleChange(text) {
        this.setState({
            title: text
        });
    }

    handleUrlChange(url) {
        this.setState({
            url: url
        });
    }

    createLink() {
        // quickLinks: null,
        // title: "",
        // url: ""
        
        let title = this.state.title, url = this.state.url;
        if(title.length == 0) return;
        
        let linksCopy = JSON.parse(JSON.stringify(this.state.quickLinks));

        linksCopy[C.getUnique()] = {
            title: title,
            url: url  
        }

        this.postLinks(linksCopy);
    }

    postLinks(linksCopy) {
        let user_id = this.props.auth0.user.sub;
        let _this = this;
        (async function () {
            let token = await _this.props.auth0.getAccessTokenSilently();
            let linkData = {
                userId: user_id,
                json: JSON.stringify(linksCopy)
            };

            APIService.postQuickLinks(token, linkData, () => {
                _this.setState({
                    quickLinks: linksCopy,
                    title: "",
                    url: ""
                });
            });
        })();
    }

    deleteLink(linkId) {
        let linksCopy = JSON.parse(JSON.stringify(this.state.quickLinks));

        delete linksCopy[linkId];

        this.postLinks(linksCopy);
    }

    renderLinks() {
        let arr = [];
        if(this.state.quickLinks != null && Object.keys(this.state.quickLinks).length > 0) {
            for (let [linkId, linkObj] of Object.entries(this.state.quickLinks)) {
                arr.push(
                    <ListGroup.Item className="d-flex align-items-center">
                        <a href={(linkObj.url.indexOf("http") == -1 ? "//" : "") + linkObj.url} target="_blank" className="d-flex flex-1">{linkObj.title}</a>
                        <button className="float-right btn-sm btn-secondary" onClick={() => {this.deleteLink(linkId)}}>X</button>
                    </ListGroup.Item>
                )
            }
        }
        return arr;
    }

    render() {
        return (
            (this.state.loading || this.state.quickLinks == null) ? <Loading /> :
            <>
                <main>
                    <h1 className="text-center">Quick Links</h1>
                    <hr/>

                    <Row>
                        <Col xs={12} sm={4} className="mb-3">
                            <fieldset>
                                <legend>Custom Links</legend>
                                <Form.Row>
                                    <Col xs={12} md={5}>
                                        <Form.Control placeholder="Title" value={this.state.title} onChange={(e) => {this.handleTitleChange(e.target.value)}}/>
                                    </Col>
                                    <Col xs={12} md={5}>
                                        <Form.Control placeholder="Link" value={this.state.url} onChange={(e) => {this.handleUrlChange(e.target.value)}}/>
                                    </Col>
                                    <Col xs={12} md={2}>
                                        <Button variant="dark" className="w-100" onClick={() => {this.createLink()}}>Add</Button>
                                    </Col>
                                </Form.Row>
                                
                                <hr/>
                                <ListGroup>
                                    {this.renderLinks()}
                                </ListGroup>
                            </fieldset>
                        </Col>

                        <Col xs={12} sm={8}>
                            <StaticLinks openLink={this.openLink}/>        
                        </Col>
                    </Row>
                    
                </main>
                <Navbar currentPage={this.state.currentPage} />
            </>
        );
    }

}
export default withAuth0(QuickLinksPage);