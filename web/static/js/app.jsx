'use strict';

import _ from 'underscore';

const ENTER_KEY = 13;

let JournalContainer = React.createClass({
    render() {
        return (
            <div className='jl-container'>
                <Header />
                <Content onRender={this.props.onRender} />
                <Footer />
            </div>
        );
    }
});

let Header = React.createClass({
    render() {
        return (
            <div className='jl-header'>
                <img className='jl-logo' src='static/img/logo.png' />
            </div>
        );
    }
});

let Footer = React.createClass({
    render() {
        return (
            <div className='jl-footer'>
            </div>
        );
    }
});

let Content = React.createClass({
    getInitialState() {
        return {
            entries: []
        };
    },

    componentDidMount() {
        $.get('/api/entry', data => {
            // TODO: Create object models for entries
            this.setState({entries: data.entries}, () => {
                this.props.onRender();
            });
        });
    },

    render() {
        let entries = [];
        for (var i = 0; i < this.state.entries.length; i++) {
            entries.push(
                <Editor text={this.state.entries[i].content} 
                        isLocked={this.state.entries[i].isLocked}
                        key={i} />
            );
        }

        entries.push(
            <Editor isLocked={false} key={-1} />
        );
        return (
            <div className='jl-content'>
                {entries}
            </div>
        );
    }
});

let Editor = React.createClass({

    _PLACEHOLDER: 'How was your day?',

    _EDITABLE_SELECTOR: '.jl-editor[contenteditable=true]',

    getInitialState() {
        return {
            // TODO: I shouldn't have to be making such a complicated check.
            contentEditable: !(this.props.isLocked.toString().toLowerCase() === 'true'),
            editor: null,
        };
    },

    componentDidMount() {
        if (!this.state.contentEditable) {
            return;
        }
        $(this._EDITABLE_SELECTOR).on('keydown', e => {
            if (e.which === ENTER_KEY) {
                let content = $(this._EDITABLE_SELECTOR).text();
                this._postEntry(e, content);
            }
        });
    },

    render() {
        const contentEditable = this.state.contentEditable;
        let classesList = [];

        if (!contentEditable) {
            classesList.push('jl-locked');
        }
        let classes = Array.prototype.join.call(classesList, ' ');
        return (
            <div className={'jl-editor ' + classes}
                 contentEditable={contentEditable}
                 data-ph={this._PLACEHOLDER}>
                {this.props.text}
            </div>
        );
    },

    _postEntry(e, content) {
        e.preventDefault();
        if (!content) {
            return;
        }
        alert(content);
        this.setState({ contentEditable: false });
    }

});

module.exports = JournalContainer;
