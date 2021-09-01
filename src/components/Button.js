import {Component} from 'react'

export default class Butt extends Component {


    render() {

        const { vall } = this.props;

        return (
            <input type="button" value={vall} className={this.props.cn} onClick={this.props.oc} style={this.props.st} />
        )
    }
}