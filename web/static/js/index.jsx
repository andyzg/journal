'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import JournalContainer from './app';

let onRender = function() {
    window.scrollTo(0, document.body.clientHeight);
};

ReactDOM.render(
    <JournalContainer onRender={onRender}/>,
    document.getElementById('content')
);
