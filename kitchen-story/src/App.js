import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Item from './components/Item.js';
import ItemList from './components/ItemList.js';

function App() {
  const [items, setItems] = useState([])
  useEffect(()=> {
    fetch(' http://localhost:3000/items')
    .then(resp=>resp.json())
    .then(data=>setItems(data)) //
  }, [])

  const handleClick = (id=>{
    console.log('id in App.js' +id );
    setItems(items.find(item=>item.id===id));
    // setShow(true)
    // console.log(item);
  })

  return (
    <div className="App">
      <ItemList items={items} handleClick={handleClick}/>
    </div>
  );
}

export default App;
