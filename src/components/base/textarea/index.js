import React from 'react'

class TextSpace extends React.Component {
    
    render() {
        const text = this.props.text
        return (<div>{JSON.stringify(text)}</div>)
    }

}
export default TextSpace