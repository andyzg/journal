'use strict';

import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { formatTimestamp } from './util';

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
                <Entry text={this.state.entries[i].content} 
                        timestamp={this.state.entries[i].timestamp}
                        isLocked={this.state.entries[i].isLocked}
                        key={i} />
            );
        }

        for (var i = 0; i < this.state.submittedEntries.length; i++) {
            entries.push(
                <Entry text={this.state.submittedEntries[i].text}
                        timestamp={this.state.submittedEntries[i].timestamp}
                        isLocked={true}
                        key={i + this.state.entries.length} />
            );
        }

        return (
            <div className='jl-content'>
                <ReactCSSTransitionGroup transitionName='jl-entry-post'
                                         transitionAppear={false}
                                         transitionEnterTimeout={1} 
                                         transitionLeaveTimeout={1000}
                                         transitionAppearTimeout={0}>
                    {entries}
                </ReactCSSTransitionGroup>
                <Editor isLocked={false} onSubmit={this._onSubmit} />
            </div>
        );
    },

    _onSubmit(content) {
        this.setState({
            submittedEntries: this.state.submittedEntries.concat([content])
        });
    }
});

let Editor = React.createClass({

    _PLACEHOLDER: 'How was your day?',

    _EDITABLE_SELECTOR: '.jl-editor[contenteditable=true]',

    getInitialState() {
        return {};
    },

    componentDidMount() {
        $(this._EDITABLE_SELECTOR).on('keydown', e => {
            if (e.which === ENTER_KEY) {
                let content = $(this._EDITABLE_SELECTOR).text();
                this._postEntry(e, content);
            }
        });
    },

    render() {
        return (
            <div className={'jl-editor'}
                 contentEditable='true'
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
            this.props.onSubmit({
                text: content,
                timestamp: Date.now() / 1000 // Need seconds, not milliseconds.
            });
        });
    }

});


let Entry = React.createClass({

    getInitialState() {
        return {};
    },

    render() {
        let classesList = ['jl-locked'];
        let formattedTimestamp = formatTimestamp(this.props.timestamp);
        let active = this.state.hover ? 'jl-entry-footer-active' : '';
        let entryFooter = (
            <div className={'jl-entry-footer ' + active}>
                {formattedTimestamp}
            </div>;
        );

        let classes = Array.prototype.join.call(classesList, ' ');
        return (
            <div className={'jl-editor ' + classes}
                 onMouseOver={this._onMouseOver}
                 onMouseLeave={this._onMouseLeave}
                 data-ph={this._PLACEHOLDER}>
                {contentEditable ? '' : this.props.text}
                {entryFooter}
            </div>
        );
    },

    _onMouseOver() {
        this.setState({hover: true});
    },

    _onMouseLeave() {
        this.setState({hover: false});
    },

});

module.exports = JournalContainer;
