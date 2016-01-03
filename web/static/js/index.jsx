'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import JournalContainer from './app';

let EDITOR_HEIGHT = 100 + 40 + 5; // 100 height, 20+20 padding

let _setHeight = function() {
    let height = window.innerHeight;
    let scrollable = document.getElementsByClassName('jl-entry-scrollable').item(0);
    scrollable.style['height'] = (height - EDITOR_HEIGHT).toString() + 'px';
}

let onRender = function() {
    window.addEventListener('resize', _setHeight, true);
    _setHeight();
};

ReactDOM.render(
    <JournalContainer onRender={onRender}/>,
    document.getElementById('content')
);
