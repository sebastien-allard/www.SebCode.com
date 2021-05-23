import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { getCurrentLanguage } from "../i18n";
import $ from "jquery";
import tinymce from "tinymce";
import "tinymce/themes/silver";
import "tinymce/icons/default";
//import "tinymce/plugins/anchor";
//import "tinymce/plugins/autolink";
//import "tinymce/plugins/emoticons";
//import "tinymce/plugins/fullpage";
//import "tinymce/plugins/image";
//import "tinymce/plugins/lists";
//import "tinymce/plugins/paste";
//import "tinymce/plugins/wordcount";
//import "tinymce/plugins/table";
//import "tinymce/skins/ui/oxide/skin.min.css";
//import "tinymce/skins/ui/oxide/content.min.css";
//import "tinymce/skins/content/default/content.min.css";
//import "../public/dist/tinymce/langs/fr_FR";

/**
 * import TinyEditorComponent from "./TinyEditorComponent";
 * 
 * handleEditorChange = (content, editor) => {
 *     this.setState({
 *         [editor.id]: content
 *     });
 * }
 *
 * <TinyEditorComponent id="senderMessage" onChange={this.handleEditorChange} />
 *
 * */
class TinyEditorComponent extends Component {
    constructor() {
        super();
        this.state = {
            editor: null,
            jqTextarea: null,
        };
    }

    initialHeight = "200";

    getTextareaSelector = () => {
        return `textarea#${this.props.id}`;
    }

    componentCleanup = () => { 
        tinymce.remove(this.getTextareaSelector());

        this.setState({
            editor: null,
            jqTextarea: null
        });
    }

    componentDidMount() {
        const textareaSelector = this.getTextareaSelector();

        var language = getCurrentLanguage().toLowerCase().split(/[_-]+/)[0]
        if (language !== "en") {
            language = "fr_FR";
        }

        const settings = {
            selector: textareaSelector,
            base_url: `${process.env.PUBLIC_URL}/dist/tinymce/`,
            branding: false,
            menubar: false,
            elementpath: false,
            plugins: "autolink emoticons link lists table",
            toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link numlist bullist table | emoticons",
            height: this.initialHeight,
            language: language,
            setup: editor => {
                this.setState({ editor });
                editor.on("keyup change", () => {
                    const content = editor.getContent();
                    this.state.jqTextarea.val(content);
                    this.props.onEditorChange(content, editor);
                });
                editor.on("blur", () => {
                    const event = {
                        target: this.state.jqTextarea.get(0)
                    }
                    this.props.onEditorBlur(event);
                });
                editor.on("init", () => {
                    this.setState({
                        jqTextarea: $(textareaSelector)
                    });
                });
            }
        }

        tinymce.init(settings);
        window.addEventListener('beforeunload', this.componentCleanup);
    }

    componentWillUnmount() {
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup);
    }

    render() {
        return (
            <textarea
                id={this.props.id}
                name={this.props.name}
                style={{ width: "100%", height: this.initialHeight + "px" }}
                value={this.props.content}
                pattern={this.props.pattern}
            />
        );
    }
}

export default withTranslation()(TinyEditorComponent);