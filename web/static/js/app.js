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
    componentDidMount: function() {
        var editor = new Quill('.jl-editor');
        editor.addModule('placeholder', {
            text: 'How was your day?',
            style: { color: '#999999' }
        });
    },

    render: function() {
        return (
            <div className='jl-editor'>
            </div>
        );
    }
});

ReactDOM.render(
  <JournalContainer />,
  document.getElementById('content')
);
