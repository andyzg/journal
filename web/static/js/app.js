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
  render: function() {
    return (
      <div className='jl-content'>
        <Editor />
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
        var editor = new MediumEditor('.jl-editor', {
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
            <div className='jl-editor' data-disable-toolbar="true">
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
