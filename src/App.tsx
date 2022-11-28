import React, {useState} from 'react';
import Select from './Select';
import Background from './Background';
import './Background.css'
import './App.css';

type Data = {
  name: string
  email: string
  format: string[]
}

const options = [
    {label: `video`, value: `video`}, 
    {label: `audio`, value: `audio`}
  ]

function App() {
  const [data, setData] = useState<Data>({name: "", email: "", format: []})
  const [open, setOpen] = useState<boolean>(false);

  const onSelected = ( formatValue: string[]) => {
    setData({...data, format: formatValue})
  }

  const print = () => {
    return console.log(data)
  }

  console.log(data)

  return (
    <>
    <Background />
    <div className="App">
      <form>
          <div className = "form-box">
            <div className = 'input-box'>
              <input className = 'input' placeholder = 'type your name...' name = "name" type = "text" onClick = {() => setOpen(false)} onChange = {(e) => {setData( {...data, name: e.target.value})}}/> 
            </div>           
            <div className = 'input-box'>
              <input className = 'input' placeholder = 'type your email...' name = "email" type = "email" onClick = {() => setOpen(false)} onChange = {(e) => {setData( {...data, email: e.target.value})}}/>
            </div>
            <div className = 'input-box'>
              <Select options = {options} open = {open} setOpen = {setOpen} onSelected = {onSelected} />
            </div>
            <div className = 'input-box'>
              <input className = 'submitButton' type = "button" value = "submit" onClick = {() => print()}/>
            </div>
          </div>
      </form>
    </div>
    </>
    
  );
}

export default App;
