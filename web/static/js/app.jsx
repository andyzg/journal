'use strict';

import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const API_ENTRY = '/api/entry'
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
            entries: [],
            submittedEntries: []
        };
    },

    componentDidMount() {
        if (this.state.entries.length <= 0) {
            $.get(API_ENTRY, data => {
                var entries = _.sortBy(data.entries, (d) => {
                    return d.timestamp;
                });
                // TODO: Create object models for entries
                this.setState({entries: entries}, () => {
                    this.props.onRender();
                });
            });
        } 
    },

    componentDidUpdate() {
        this.props.onRender();
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

        for (var i = 0; i < this.state.submittedEntries.length; i++) {
            entries.push(
                <Editor text={this.state.submittedEntries[i]} 
                    isLocked={true}
                    key={i + this.state.entries.length} />
            );
        }

        return (
            <div className='jl-content'>
                <ReactCSSTransitionGroup transitionName='jl-entry-post'
                                         transitionAppear={false}
                                         transitionEnterTimeout={200} 
                                         transitionLeaveTimeout={1000}
                                         transitionAppearTimeout={0}>
                    {entries}
                </ReactCSSTransitionGroup>
                <Editor isLocked={false} onSubmit={this._onSubmit} />
            </div>
        );
    },

    _onSubmit(content) {
        setTimeout(() => {
            this.setState({
                submittedEntries: this.state.submittedEntries.concat([content])
            });
        });
    }
});

let Editor = React.createClass({

    _PLACEHOLDER: 'How was your day?',

    _EDITABLE_SELECTOR: '.jl-editor[contenteditable=true]',

    getInitialState() {
        return {
            // TODO: I shouldn't have to be making such a complicated check.
            contentEditable: !(this.props.isLocked.toString().toLowerCase() === 'true'),
            content: '',
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
                {contentEditable ? '' : this.props.text}
            </div>
        );
    },

    _postEntry(e, content) {
        e.preventDefault();
        if (!content) {
            return;
        }
        $.post(API_ENTRY, {
            content: content
        }, () => {
            $(this._EDITABLE_SELECTOR).empty();
            this.props.onSubmit(content);
        });
    }

});

module.exports = JournalContainer;
