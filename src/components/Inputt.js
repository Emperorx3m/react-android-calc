import {Component} from 'react'

export default class Inpp extends Component {
    constructor(props) {
        super();
        this.state = {
            show: ""
        }
    }
    render() {
        const { vallu } = this.props
        return (
            <input className={this.props.inp} type="text" id={this.props.id} onChange={this.props.onch} value={vallu} />
        )
    }
}