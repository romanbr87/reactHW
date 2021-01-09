import React, { Component } from 'react'
import Item from './Components/Item.js';
import cartImg from './images/cart.svg';
import homeImg from './images/home.svg';
import './App.css';
import './style.css';

export default class App extends Component {
  state = {
    items: [{ iname: 'Cheese', iprice: '31', count: 0 }, 
            { iname: 'Woods', iprice: '100', count: 0 },
            { iname: 'Vaccine', iprice: '200', count: 0}],
    boughtItems: [],
    isHome: true, 
  }

  buy = () => { 
    let count = this.state.items.reduce((a, b) => a + (b['count']), 0)
    let price = this.state.items.reduce((a, b) => a + (b['count']) * (b['iprice']), 0)

    if (count != 0 && price != 0) {
      this.setState({ boughtItems: [...this.state.boughtItems, { total: count, price: price}] })

      let items = this.state.items.slice();
      items[0].count = 0;
      items[1].count = 0;
      items[2].count = 0;
      this.setState ({ items: items })
    }

    else alert ("The cart is empty")
  }

  addItem = (i) => {
    let items = this.state.items.slice();
    items[i].count++;
    this.setState ({ items: items })
    console.log (this.state.items[i].count)
  }

  isHome = function () {
    if (this.state.isHome) {
      return (
        <div id="homeDiv">
          <div id="cartBody" style={{ borderRight: '2px solid blue'}}>
          <h2 style={{textAlign: 'left', padding: '0', margin: '0', marginLeft: '10px', letterSpacing: '2px', fontSize: '2.5em' }}>List of products: </h2>
          
          { this.state.items.map((e, i) => {
            return <Item key={i} iname={e.iname} iprice={e.iprice} add={this.addItem} index={i} />
          })}
          
          </div>
          <div id="listBody">
          <h3 style={{textAlign: 'left', padding: '0', margin: '0', marginLeft: '10px', letterSpacing: '2px', fontSize: '1.5em' }}>Items quantity: </h3>
          { this.state.items.map((e, i) => {
            return (
              <span key={i}>{this.state.items[i].iname}: {this.state.items[i].count}</span>
            )
          })}

          </div>
        </div>
      )
    }
    else {
      return (
        <div id="homeDiv">
          <div id="listBody" style={{display: 'inline-block', borderRight: '2px solid blue' }}>
          <h1 style={{textAlign: 'left', padding: '0', margin: '0', marginLeft: '10px', letterSpacing: '2px', fontSize: '2.5em' }}>
            Cart  <img src={cartImg} style={{ height: '20%', width: '20%'}} /> 
          </h1>

          { this.state.boughtItems.map((e, i) => {
            return (
              <span key={i} className="cartItem" style={{ minWidth: '70%'}}>Items: {this.state.boughtItems[i].total}  price = {this.state.boughtItems[i].price}</span>
            )
          })}
          </div>
          <div id="cartBody">
          { this.state.items.map((e, i) => {
            return (
              <span key={i} className="cartItem">{this.state.items[i].iname}: {this.state.items[i].count * this.state.items[i].iprice}</span>
            )
          })}

          <div id="cartItemPanel">
            <span className="cartItem">items: {
                this.state.items.reduce((a, b) => a + (b['count']), 0)
            }
            </span>
            <span className="cartItem">
            Total price = {
                this.state.items.reduce((a, b) => a + (b['count'] * b['iprice']), 0)
            }
            </span>
            <span id="Btn" style={{ float: 'none' }} onClick={ ()=> {this.buy()} }> Buy </span>
          </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <div id="navBar">
        <img src={homeImg} id="homeImg" onClick={ ()=> this.setState ({isHome: true}) } />
            <span>SV Shopping</span>
            <img src={cartImg} id="cartImg" onClick={ ()=> this.setState ({isHome: false}) }/>
        </div>
        { this.isHome() }
      </div>
    )
  }
}
