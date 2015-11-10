var JournalContainer = React.createClass({
    render: function() {
        return (
            <div className='jl-container'>
                <Header />
                <Content />
            </div>
        );
    }
});

var Header = React.createClass({
render: function() {
    return (
        <div className='jl-header'>
            <img className='jl-logo' src='static/img/logo.png' />
        </div>
        );
    }
});

var Content = React.createClass({
    getInitialState: function() {
        return {
            entries: []
        };
    },

    componentDidMount: function() {
        $.get('/api/entry', function(data) {
            this.setState({entries: data.entries});
        }.bind(this));
    },

    render: function() {
        var entries = [];
        for (var i = 0; i < this.state.entries.length; i++) {
            entries.push(
                <Editor editorId={'editor-' + i} 
                        text={this.state.entries[i].text} 
                        key={i} />
            );
        }
        return (
            <div className='jl-content'>
                {entries}
            </div>
        );
    }
});

var Editor = React.createClass({

    _PLACEHOLDER: {
        text: 'How was your day?'
    },

    getInitialState: function() {
        return {
            editor: null,
        };
    },

    componentDidMount: function() {
        // var editor = new Quill('.jl-editor');
        // this._setupModule(editor);
        var editor = new MediumEditor('#' + this.props.editorId, {
            toolbar: false,
            // Disables having 2 empty lines
            disableDoubleReturn: false,
            // Enable image dragging
            imageDragging: true,
            // Disables any keyboard shortcuts
            keyboardCommands: false,
            placeholder: this._PLACEHOLDER,
            // Disables the toolbar
        });
        this.setState({
            editor: editor
        }, this._setupModule);
    },

    render: function() {
        return (
            <div id={this.props.editorId} className='jl-editor' data-disable-toolbar="true">
                {this.props.text}
            </div>
        );
    },

    _onEditorTextChange: function(delta, source) {
        this.state.editor.getBounds
    },

});

ReactDOM.render(
  <JournalContainer />,
  document.getElementById('content')
);
