import React from 'react'
export function setProps(component, props) {
    return component && React.cloneElement(component,  props)
}

