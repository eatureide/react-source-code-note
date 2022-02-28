import React from "./react"
import ReactDOM from './react-dom'

const ele = <h1 title="react" className="title" style={ { color: 'blue' } } onClick={ () => alert() }>hi</h1>

ReactDOM.render(ele, document.querySelector('#root'))
