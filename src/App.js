
import './App.css';
import './bulma.min.css'
import React, {Component} from 'react';
import {create, all} from 'mathjs';
import Nav from './Nav';
import Butt from './components/Button';
import Inpp from './components/Inputt';

const math = create(all);
const parser = new math.parser();

const classbtn = "button is-fullwidth is-large redd ";
const csuc = "is-size-1-tablet button is-fullheight is-large is-white has-text-black";
const inp = " is-large is-fullwidth input is-shadowless";
const ignor = ['+', '-', '/', '*']

class App extends Component {
    constructor(props) {
      super();

      this.state = {
        keyy: '',
        keyycopy: '',
        deg: true,
        rad: false,
        tot: 0
      }

    }

  componentDidMount() {
    window.addEventListener('resize', (event) => {
      let tott = document.getElementById('tot')
      this.c1 = tott.scrollWidth    
    })

    window.addEventListener('keydown', (event) => {
      let num = ['1', '2', '3', '/', '4', '5', '6', '-', '7', '8', '9', '+', '.', '0', '=', '*', '(', ')', 'Backspace', '%', '!', '^'];
      let keyyy = event.key

      if (num.includes(keyyy)) {
        this.hClick(keyyy)
      }
    })

  }

  c1 = 0
  c2 = 0
  onch = () => {
    let tott = document.getElementById('tot')
    let tottov = document.querySelector('#totov')
    let tsc = tott.scrollWidth
    //this.c1 = tsc
    if (this.c1 === 0) {
      this.c1 = tsc
    } else {
      this.c2 = tsc
    }
    
   if(this.c2 > this.c1){
     tottov.classList.remove('is-hidden')
    }
    else{
     tottov.classList.add('is-hidden')
    }
  }

    clearr = () => {
      this.setState({
        keyy:"",
        keyycopy: "",
        tot: 0
      })
    }
    

  todeg = () => ')(57.2957795130)'
  torad = () => '(0.01745329300))'
  // todeg = () => ')(180 / ' + math.pi + ')'
  // torad = () => '(' + math.pi + '/ 180))'

    equal = () => {
      document.getElementById('tot').style.removeProperty('border')
      
       try {
      let cl = this.calculatix()
      if (cl === 'error') {
          let el = document.getElementById('tot');
          el.style.border = '2px solid red';
          el.style.color = 'red'

          this.setState({
            tot: 'Error!',
          });
      } else {
        this.setState({
          keyy: cl,
          tot: 0,
        })
      }
      } catch (error) {
      let el = document.getElementById('tot');
      el.style.border = '2px solid red';
      el.style.color = 'red'

      this.setState({
        tot: 'Bad!',
      });
    }
      
    }

  calc_on_keyup = () => {
    let tott = document.getElementById('tot')
     tott.style.removeProperty('border')
      tott.style.removeProperty('color')

    let cl = this.calculatix()
      if (cl === 'error') {
        this.setState({
          tot: '',
        })
      } else {
         this.setState({
          tot: cl,
        })
      }
 
  }

    calculatix = () => {
     
  
      let stkcopy = this.state.keyycopy
      let degg = this.state.deg
      let radd = this.state.rad
      let cl;

      try {
          
            if (isFinite(stkcopy)) {
              this.setState({
                tot: 0,
              })
            } else {
             
              let repl = {
                '²': '^2',
                'π': '('+math.pi+')',
                '%' : '/100',
                'In': 'inv',
                'log': 'log10',
                'sin⁻¹': 'asin',
                'cos⁻¹': 'acos',
                'tan⁻¹': 'atan',
                '√': 'sqrt',
              }
             let kx = Object.keys(repl)
             kx.forEach((keyy, ind) => {
              stkcopy = stkcopy.replace(keyy, repl[keyy])
             })

              // this.setState({
              //   keyycopy: stkc,
              // })

              let reg = /(asin|acos|atan)\((.*?)\)|(sin|cos|tan)\((.*?)\)/g
              let ob = /[(]/g
              let cb = /[)]/g
              let findd = (str) => Array.from(str.matchAll(reg))//str.match(reg);
              let findob = (str) => str.match(ob);
              let findcb = (str) => str.match(cb);
            
              let sct = ['sin', 'cos', 'tan']
              let invsct = ['asin', 'acos', 'atan']
              
              let c = []
              let d = []
              let td = ['(57.2957795130)']
              let tr = ['(0.01745329300)']

              let findaction = (i_pos2, i) => {
                let s = i_pos2 + i.length
                if (invsct.includes(i.substr(0, 4))) {

                  if (!td.includes(stkcopy.slice(s - 16, s - 1))) {
                    let endd = stkcopy.slice(s);
                    stkcopy = stkcopy.replace(stkcopy.substr(s - 1), this.todeg()) + endd
                  }// includes
                } else if (sct.includes(i.substr(0, 3))) {
               
                  if (!tr.includes(stkcopy.slice(s - 1, s + 15))) {
                    let endd = stkcopy.slice(s);
                    stkcopy = stkcopy.replace(stkcopy.substr(s - 1), this.torad()) + endd

                  }//if includes
                }//else non inv
              }
              let s = 0;
              let p = 0;
              let iindex = (str, start, sash) =>  {
                if (start === s) {
                  start = p
                }else if(start < p && p !== 0){
                    start = p
                } else {
                  s = start
                  p = start
                }
                   p = str.slice(start, str.length).indexOf(sash) + start                
                   return p;

              }
//forish loop
              let forish = (i_pos2,nester) => {
                let s_str;

                for (let s = i_pos2; s <= stkcopy.length; s++) {
                  s_str = stkcopy.slice(i_pos2, s)
                  c = s_str.match(ob)
                  d = s_str.match(cb)
                  if (c && d) {
                    if (c.length === d.length) {
                      if (invsct.includes(nester.substr(0, 4)) && !td.includes(stkcopy.slice(s - 16, s - 1))) {
                        let endd = stkcopy.slice(s);
                        stkcopy = stkcopy.replace(stkcopy.substr(s - 1), this.todeg()) + endd

                      }
                      else if (sct.includes(nester.substr(0, 3)) && !tr.includes(stkcopy.slice(s-1, s + 15))) {
                        let endd = stkcopy.slice(s);
                        stkcopy = stkcopy.replace(stkcopy.substr(s - 1), this.torad()) + endd

                      }


                      break;
                    }
                  }
                }//for loop in forish
              }//forish func
            
              let nest;
              
            if(degg) {
                findd(stkcopy).forEach((x) => {
                let i = x[0];
                 let i_pos = x.index
                  let i_pos2 = iindex(stkcopy, i_pos, i)
                    if(findob(i).length !== findcb(i).length) {
                        nest = i.slice(4)
                        let nester = i.substr(0,4)
                          forish(i_pos2, nester);

                      while (findob(nest)) {
                          findd(nest).forEach(j => {
                            let inner = j[0]
                            let i_pos2 = iindex(stkcopy, i_pos, inner)
                           
                            if (findob(inner).length !== findcb(inner).length) {
                              nest = inner.slice(4)
                              let nester2 = inner.substr(0, 4)
                              forish(i_pos2, nester2);
                            }
                            else{
                              nest = '';
                              findaction(i_pos2, inner)
                            }
                          })//find nest   
                       } //while
                    }else{
                      
                      
                      findaction(i_pos2,i);
                    }//if !==
                })
                
               cl = parser.evaluate(stkcopy)
             
              return new Intl.NumberFormat().format(cl)

            } // if deg
            else if(radd){

               cl = parser.evaluate(stkcopy)
              return new Intl.NumberFormat().format(cl)
            }

              
            }//else not finite
            
        //   }
        
      } catch (error) {
        return cl = 'error'
      }
      
      }

    setst = vl => {
      let nk;
      if (this.state.keyy) {
        nk = this.state.keyy.toString().concat(vl);
      } else {
        nk = vl
      }
     
      this.setState({
        keyy: nk,
        keyycopy: nk//Object.assign()
      },this.calc_on_keyup)
    }

    hClick = (bt) => {
     let c = document.getElementById('main')
     c.focus()
      let m = c.selectionStart
      c.selectionStart = m

      let vl;
      if (bt.target !== undefined) {
         vl = bt.target.value
         this.onch()
      } else {
        
        vl = bt
      }
     

      let stk = this.state.keyy//;
      let last_str;
      if (stk) last_str = stk.toString().substr(-1);
      
      if (!isFinite(vl)) {
        if (vl === 'Del' || vl === 'Backspace') {
          let foox = [' deg', ' rad', 'sin(', 'cos(', 'tan(', 'log(', 'exp(']
          let sisx = ['sin⁻¹(', 'cos⁻¹(', 'tan⁻¹(']
          let trex = ['In(', '10^']
          let nk;
          if (sisx.includes(stk.substr(-6))) {
            nk = stk.slice(0, -6);
          }
          else if (foox.includes(stk.substr(-4))) {
            nk = stk.slice(0, -4);
          }
          else if (trex.includes(stk.substr(-3))) {
            nk = stk.slice(0, -3);
          }
          else if (stk.substr(-2) === '√('){
            nk = stk.slice(0, -2);
          } else {
            nk = stk.slice(0, -1);
          }

          this.setState({
            keyy: nk,
            keyycopy: nk//Object.assign()
          }, this.calc_on_keyup)
        }
        else if (vl === 'Clear') {
          this.c1 = 0; this.c2 = 0
          this.onch();
          this.clearr();
          
        }
        else if(vl === '='){
          this.equal();
        }
        
        else if (vl === '.' || vl === '%') {
          let dot = stk.lastIndexOf(vl);
          if (stk !== "" && isFinite(last_str, 1)) {
              if ((dot === -1) || (dot !== -1 && !isFinite(stk.substr(dot)))) { //here
                this.setst(vl)
              }
            }
          else if (vl === '.' && (stk === "" || (!isFinite(last_str, 1) && last_str !== vl))) {
              this.setst('0.')
            }
        }
        else if (vl === '-' && (stk === "" || stk === "(")) {
          this.setst(vl);
        }
        else if (vl === ')' && stk !== '') {
          this.setst(vl);
        }
        
        else if (vl === 'DEG') {
          this.setState({
            deg: true,
            rad: false
          }, this.calc_on_keyup)
        }
        else if (vl === 'RAD') {
          this.setState({
            deg: false,
            rad: true
          }, this.calc_on_keyup)
        }

        else if (vl === 'sin') this.setst('sin(');
        else if (vl === 'cos') this.setst('cos(');
        else if (vl === 'tan') this.setst('tan(');
        else if (vl === 'In') this.setst('In(');
        else if (vl === 'log') this.setst('log(');
        else if (vl === 'sin⁻¹') this.setst('sin⁻¹(');
        else if (vl === 'cos⁻¹') this.setst('cos⁻¹(');
        else if (vl === 'tan⁻¹') this.setst('tan⁻¹(');
        else if (vl === 'eˣ') this.setst('exp(');
        else if (vl === '10ˣ') this.setst('10^');
        else if (vl === 'x²') this.setst('²');
        else if (vl === '√') this.setst('√(');

        else if (!ignor.includes(vl)) {
          this.setst(vl);
        }

        else{
          let nkk = stk.toString().slice(0, -1);

          if (stk !== "" && isFinite(last_str)) {
              this.setst(vl)
          } 
          
          else if (stk !== "" && ignor.includes(last_str) && ignor.includes(vl) && nkk !== "" && !isFinite(last_str)) {
            let nk = nkk.toString().concat(vl);
            this.setState({
              keyy: nk,
              keyycopy: nk//Object.assign()
            })
          }
          else if (stk !== "" && !isFinite(last_str) && !ignor.includes(vl) && !ignor.includes(last_str) ) {
            this.setst(vl)
          }
          else if (stk !== "" && !isFinite(last_str) && ignor.includes(vl) && !ignor.includes(last_str)) {
            this.setst(vl)
          }
          
        }
       // alert(vl)
      } else {
         this.setst(vl)
      }

      
    }

  render(){
      const one = [1,2,3,'/']; 
      const two = [4,5,6,'-'];
      const tre = [7,8,9,'+'];
      const foo = ['.',0,'=','*'];

      return (
        <div className="App">
        
          <Nav hk={this.hClick} deg={this.state.deg} rad={this.state.rad} />
              <div className="container is-fluid is-mobile">
                <div className="columns is-mobile">
                  
                  <div className="column is-three-quarter" style = {{ float: "lefti" }}>
                    <Inpp id="main" onch={this.onch} inp={inp} vallu={this.state.keyy} />
                    <Inpp id="tot" onch={this.onch} inp={inp + ' has-text-right'} vallu={this.state.tot} />
                  </div>
              
                  <div className="column is-one-quarter" >
                <Butt vall={'Del'} cn={classbtn.replace("redd", "is-black has text-white")} oc={this.hClick}  />
                      <Butt vall={'Clear'} cn={classbtn} oc={this.hClick} />
                  </div>
                  
                 
                </div>
            <Inpp id="totov" onch={this.onch} inp={'is-hidden input is-fullwidth has-text-right'} vallu={this.state.tot} />

                    <div className="columns">
                      <div className="column">
                        {one.map(
                          (on, i) => {
                            return (
                              <Butt vall={on} cn={csuc} oc={this.hClick} st={{ width: "25%", paddingLeft: 0, paddingRight: 0 }} key={on}  />
                            )
                          }
                        )}
                        </div>
                    </div>

                    <div className="columns">
                      <div className="column is-full-width">
                      {two.map(
                        (on, i) => {
                          return (
                            <Butt vall={on} cn={csuc} oc={this.hClick} st={{ width: "25%", paddingLeft: 0, paddingRight: 0 }} key={on}/>
                          )
                        }
                      )}
                      </div>
                    </div>
                
                    <div className="columns">
                        <div className="column is-full-width">
                      {tre.map(
                        (on, i) => {
                          return (
                            <Butt vall={on} cn={csuc} oc={this.hClick} st={{ width: "25%", paddingLeft: 0, paddingRight: 0 }} key={on}/>
                          )
                        }
                      )}
                       </div>
                    </div>
                    
                  <div className="columns">
                    <div className="column is-full-width">
                    {foo.map(
                      (on, i) => {
                        if (on === '=') {
                          return (
                            <Butt vall={on} cn={csuc.replace("is-white has-text-black", "is-black has text-white")} oc={this.hClick} st={{ width: "25%", paddingLeft: 0, paddingRight: 0 }} key={on} />
                          )
                        }
                        else{
                        return (
                            <Butt vall={on} cn={csuc} oc={this.hClick} st={{ width: "25%", paddingLeft: 0, paddingRight: 0 }} key={on}/>
                        )
                        }
                      }
                    )} 
                    </div>
                  </div>

              </div>
          
        </div>
      );
}}

export default App;
