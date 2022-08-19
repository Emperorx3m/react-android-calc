import React, { Component } from "react";
import Butt from "./components/Button";
//import './calcu.jpeg'

const csuc = "button is-fullheight is-outlined is-light has-text-black";

 

class Nav extends Component{
    
        // hClick = (bt) => {     
        //     let vl = bt.target.value
        //     console.log(vl)
        //     //let stk = this.state.keyy
        // }
        
    render(){
    
        // const fout = () => {
        //     alert('lost focus')
        // }

        const oc = () => {
            document.querySelector('.navbar-menu').classList.toggle('is-active');
        }

        const one = ['DEG', 'RAD', '%', '√', '!'];
        const two = ['(', ')', 'sin', 'cos', 'tan'];
        const tre = ['In', 'log', 'sin⁻¹', 'cos⁻¹', 'tan⁻¹'];
        const foo = ['eˣ', '10ˣ', 'π', '^', 'x²'];
        
        return(
           
            <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="#">
                        <img src="calcu.jpeg" width="50" height="50" alt="" />
                        </a>

                    <a  role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={oc}>
    
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                <div id="navbarBasicExample" className="navbar-menu is-active" >
                        <div className="navbar-start">
                               <div className="navbar-item">
                                <div className="columns">
                                    <div className="column">
                                        {one.map(
                                            (on, i) => {
                                                if (on === "DEG" && this.props.deg) {
                                                    return (
                                                        <Butt vall={on} cn={csuc.replace('is-light', 'is-success')} oc={this.props.hk} st={{ width: "20%", paddingLeft: 0, paddingRight: 0 }} key={on}/>
                                                    )
                                                } else if (on === "RAD" && this.props.rad) {
                                                    return (
                                                        <Butt vall={on} cn={csuc.replace('is-light', 'is-success')} oc={this.props.hk} st={{ width: "20%", paddingLeft: 0, paddingRight: 0 }} key={on}/>
                                                    )
                                                } else {
                                                    return (
                                                        <Butt vall={on} cn={csuc} oc={this.props.hk} st={{ width: "20%", paddingLeft: 0, paddingRight: 0 }} key={on}/>
                                                    )
                                                }
                                                
                                            }
                                        )}
                                    </div>
                                </div>

                                <div className="columns">
                                    <div className="column">
                                        {two.map(
                                            (on, i) => {
                                                return (
                                                    <Butt vall={on} cn={csuc} oc={this.props.hk} st={{ width: "20%", paddingLeft: 0, paddingRight: 0 }} key={on}/>
                                                )
                                            }
                                        )}
                                    </div>
                                </div>

                                <div className="columns">
                                    <div className="column">
                                        {tre.map(
                                            (on, i) => {
                                                return (
                                                    <Butt vall={on} cn={csuc} oc={this.props.hk} st={{ width: "20%", paddingLeft: 0, paddingRight: 0 }} key={on}/>
                                                )
                                            }
                                        )}
                                    </div>
                                </div>

                                 <div className="columns">
                                    <div className="column">
                                        {foo.map(
                                            (on, i) => {
                                                return (
                                                    <Butt vall={on} cn={csuc} oc={this.props.hk} st={{ width: "20%", paddingLeft: 0, paddingRight: 0 }} key={on}/>
                                                )
                                            }
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>

                        
                    </div>
            </nav>

 
            
        )
    }
}

export default Nav
