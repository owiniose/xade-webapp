import  React  from 'react'

import { SupportedChainId, Registrar } from '@deusfinance/synchronizer-sdk'
import { hooks, Muon } from '../../DEUS/Synchronizer'
// import Chart from './LineChart'
import {    SymbolOverview } from "react-ts-tradingview-widgets";
import './TradeMarkets.css'
import { useParams } from 'react-router-dom'
import { Button, Input, TextField } from '@material-ui/core'

const SUPPORTED_CHAIN_ID = SupportedChainId.FANTOM

const Trade = () => {
    const [market, setMarket] = React.useState(0);
    const [currency, setCurrency] = React.useState(0);
    const [ buy, setBuy] = React.useState(true);
    const [ sell, setSell] = React.useState(true);
    


    let { id } = useParams() || '0x399aeb2FF88cD66564ee1BCc03185Ca5d712572B';
    const list = hooks.useRegistrarByContract(id, SUPPORTED_CHAIN_ID) || {
        'ticker': 'AAPL', 
        'name': 'Apple',
        'direction': 'LONG',
        'sibling': '0x399aeb2FF88cD66564ee1BCc03185Ca5d712572B',
        'open': false,
        'price': '0',
    }

    
    

    const handleChangeCurrency = (event:any): void => {
        event.preventDefault();
        let input = event.target.value;
        
        if( !input || (input[input.length-1].match('[0-9]') && input[0].match('[1-9]')))
           setCurrency(input)

        let input2 = input / parseInt(list.price);
           
            setMarket(input2)

           if (input !== ""){
            setBuy(false)
        }else{
            setBuy(true)
        }     
    }


    const handleChangeMarket = (event:any): void => {
      console.log(market)
      event.preventDefault();
      let input = event.target.value ;
     
      if( !input || ( input[input.length-1].match('[0-9]') && input[0].match('[1-9]')) )
        setMarket(input)
        
        let input2 = input * parseInt(list.price);
           
            setCurrency(input2)

           if (input !== ""){
            setSell(false)
        }else{
            setSell(true)
        } 

    }

    console.log(list)

    
    
    return (
        
    <div className="trade-markets-center">
        
       <div className = 'trade-markets'> 
       <br /> 
       <SymbolOverview colorTheme="light"
            width = '50vw'
            symbols = {[[list.name, list.ticker]]}
            downColor="#800080"
            borderDownColor="#800080"
            wickDownColor="#800080"
            // lineColor = "#1E5128"
            topColor = '#BFFFF0'
            bottomColor = "#EFFFFD"
            autosize
            chartType="area"
            scaleMode ="normal"

        /> 
        <br /> <br />
        <div className = 'chart-market'>
        </div>
        <div className = 'trade-market-data'>
        <div className = 'investment-direction'>
      <div className = {`long-direction ${list.direction === 'LONG'? 'direction-selected': ""}`}><a href = {list.direction == 'SHORT'?`/trade/${list.sibling}`:''}>LONG</a></div>
      <div className = {`short-direction ${list.direction === 'SHORT'? 'direction-selected': ""}`}><a href = {list.direction == 'LONG'?`/trade/${list.sibling}`:''}>SHORT</a></div>
        </div>
        <div className = 'conversion-dollar'>
        <td className = "investments-body-image investments-ticker botm"><img alt = '' src = {`${process.env.PUBLIC_URL}/images/tickers/usd.svg`}/></td>
        <TextField 
            onChange = {handleChangeCurrency}
            type = 'text'
            id="input-with-sx" 
            label={`Enter amount in $`} 
            variant="standard" 
            value = {currency}
        />

        </div>
        <div className = 'conversion-dollar'>
        <td className = "investments-body-image investments-ticker botm"><img alt = '' src = {`${process.env.PUBLIC_URL}/images/tickers/${list.ticker}.png`}/></td>
        <TextField 
            onChange={handleChangeMarket}
            type="text"
            label={`Enter amount in ${list.ticker}`} 
            variant="standard" 
            value = {market}

            
        />
        </div>
        
        </div>
        <div className='button-direction' >
    <div ><button 
        className='button' 
        disabled ={buy}
        onClick={()=>console.log("hello")}
        >Buy
    
    
    
    </button></div>
    <div ><button className='button1' 
    disabled ={sell}
    onClick={()=>console.log("hello")}
    >Sell 
    
    
    
    </button>  </div>
    
     </div>
     <div className= 'confirm-button-div'>
        <button className='confirm-button' >Confirm order</button>
    </div>
        </div>
    </div>
    
    )
}

export default Trade;
