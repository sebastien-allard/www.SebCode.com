import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Trans, withTranslation } from "react-i18next";
import $ from "jquery";
import TinyEditorComponent from "./TinyEditorComponent";
import { EmailClient, EmailMessage } from "../services/resumeApi";

class EmailForm extends Component {
    static displayName = EmailForm.name;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            senderName: '',
            senderNameValid: false,
            senderEmail: '',
            senderEmailValid: false,
            senderMessage: '',
            senderMessageValid: false,
            recaptchaValid: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // --- Prevent the [ENTER] key to trigger the Submit button ---
        $(document).ready(function () {
            $(window).keydown(function (event) {
                if (event.keyCode === 13 && event.target.type !== "textarea") {
                    event.preventDefault();
                    return false;
                }
            });
        });
    }

    validateForm() {
        const isValid =
            this.state.senderNameValid &&
            this.state.senderEmailValid &&
            this.state.senderMessageValid &&
            this.state.recaptchaValid;

        const sendEmailButton = $("#sendEmailButton");

        isValid
            ? sendEmailButton.removeAttr("disabled")
            : sendEmailButton.attr("disabled", true);

        return isValid;
    }

    validateInput(target, updateFeedback) {
        const jqTarget = $(target);
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const wasInvalid = jqTarget.hasClass("is-invalid");
        const isValid = value.length !== 0
            && target.checkValidity()
            && value.match(jqTarget.attr("pattern")) !== null;

        this.setState({
            [name + "Valid"]: isValid
        });

        if (updateFeedback || (isValid && wasInvalid)) {
            isValid
                ? jqTarget.removeClass("is-invalid")
                : jqTarget.addClass("is-invalid");
        }

        return isValid;
    }

    setLoading(state) {
        const sendEmailButton = $("#sendEmailButton");

        this.setState({
            isLoading: state
        });

        state
            ? sendEmailButton.attr("disabled", true)
            : sendEmailButton.removeAttr("disabled");
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        this.validateInput(target, false);
        this.validateForm();
    }

    handleInputBlur = (event) => {
        const target = event.target;
        this.validateInput(target, true);
        this.validateForm();
    }

    handleEditorChange = (content, editor) => {
        const target = editor.targetElm;
        const value = content;
        const name = editor.name;

        this.setState({
            [name]: value
        });

        this.validateInput(target, false);
        this.validateForm();
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.validateForm() || this.state.isLoading)
            return;

        this.setLoading(true);

        var client = new EmailClient();
        var formData = new FormData(event.target);
        var obj = Object.fromEntries(formData);
        var msg = EmailMessage.fromJS(obj);

        client.post(msg)
            .then(response => response)
            .then(
                (result) => {
                    this.setLoading(false);
                    this.props.onEmailSent();
                },
                (error) => {
                    this.setLoading(false);
                    this.props.onEmailError();
                }
            )
            .catch((error) => {
                this.setLoading(false);
            });
    }

    handleRecaptchaChange = (value) => {
        this.setState({
            recaptchaValid: value !== null
        });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="senderName"><Trans>Nom</Trans></Form.Label>
                    <Form.Control type="text" id="senderName" name="senderName" placeholder={this.props.i18n.t("Nom")} pattern=".{3,}" onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
                    <Form.Control.Feedback type="invalid">
                        <Trans>
                            Merci d'inscrire votre nom !
                        </Trans>
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="senderEmail"><Trans>Courriel</Trans></Form.Label>
                    <Form.Control type="email" id="senderEmail" name="senderEmail" placeholder={this.props.i18n.t("Courriel")} pattern="^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$" onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
                    <Form.Control.Feedback type="invalid">
                        <Trans>
                            Merci d'inscrire votre adresse courriel !
                        </Trans>
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="senderMessage"><Trans>Message</Trans></Form.Label>
                    <TinyEditorComponent id="senderMessage" name="senderMessage"
                        pattern=".{3,}"
                        onEditorChange={this.handleEditorChange}
                        onEditorBlur={this.handleInputBlur} />
                    <Form.Control.Feedback type="invalid">
                        <Trans>
                            Merci d'inscrire votre message !
                        </Trans>
                    </Form.Control.Feedback>
                </Form.Group>
                <div className="row no-gutters">
                    <div className="col mb-3">
                        <ReCAPTCHA
                            sitekey="6Lcdy8wZAAAAALWl8xTORDgNALuqFAmyJsECrTOc"
                            onChange={this.handleRecaptchaChange}
                            hl={ this.props.i18n.language }
                        />
                    </div>
                    <div className="col text-right">
                        <Button type="submit" id="sendEmailButton" disabled={!this.validateForm()}><Trans>Envoyer</Trans></Button>
                    </div>
                </div>
            </Form>
        );
    }
}

export default withTranslation()(EmailForm);
/*
                    <TinyEditorComponent id="senderMessage"
                        pattern=".{3,}"
                        onEditorChange={this.handleEditorChange}
                        onEditorBlur={this.handleInputBlur} />
                    <Form.Control as="textarea" id="senderMessage"
                        rows="15" pattern=".{3,}"
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur} />
 */