import React, { useEffect, useState } from 'react'
import axios from 'axios';
axios.defaults.withCredentials = true;

export default function Home() {

  const primary = '#000000';
  const secondary = '#1b1b1b';
  const ternary = '#ff153c';
  const tetra = '#808080';
  const fifth = '#dbeeff';


  let [arr, setArr] = useState([]);
  let [popUp, setPopUp] = useState(false);
  let [products, setProducts] = useState([]);

  useEffect(() => {
    async function run() {
      try {
        console.log('useEffect')
        let res = await axios.get('http://localhost:3004/products');
        setArr(res.data);
      } catch (err) {
        console.log(err.message)
      }
    }
    run();
  }, [])


  async function addToCart(e) {
    try {
      let exists = false;
      let div = e.target.parentNode.firstChild;
      let id = div.textContent;
      products.forEach((pID) => {
        if (id === pID) {
          return exists = true;
        }
      })
      exists ? alert('products already exists in cart') : setProducts([...products, id]);
       
      exists ? console.log('no') : setPopUp(!popUp);
    } catch (err) {
      console.log(err.message)
    }
  }

  async function buy(){
    try{
      if(products.length !== 0){
       let post = await axios.post('http://localhost:3004/bought', {products: products});
       console.log(post.data);
       alert('order has been placed');
       setPopUp(!popUp);
       setProducts(products = [])
      } else {
        throw Error('no item selected');
      }
    } catch(err){
      alert(err.message)
    }
  }

  function popup() {
    setPopUp(!popUp);
  }

  function rmvCart(e){
    let index = e.target.id;
    setProducts(products.filter((pID)=> pID !== products[index]));
  }

  return (
    <div className={`bg-[${secondary}] -min-h-screen text-white p-12 grid grid-cols-3 gap-6`}>
      {arr.map((product, i) => (
        <div key={i} className={`p-4 bg-[black] flex flex-col justify-center items-center w-[300px] card`}>
          <div className='img'>
            <img src={product.img} className='' />
            <label className='pName'>{product.name}</label>
          </div>
          <div className='flex justify-between items-center gap-4 px-3 pt-3 cardInfo w-full'>
            <label className='text-white hidden'>{product._id}</label>
            <label className='pPrice bg-[#18f0ff] px-4 py-2 text-black font-semibold'>$ {product.price}K</label>
            <button onClick={(e) => addToCart(e)} className='bg-[#ff153c] px-4 py-2'>Add to Cart</button>
          </div>
        </div>
      ))}


      {/* pop up strt*/}

      <div className={`min-h-full w-full backdrop-blur  fixed z-[8] -top-0 left-0 bottom-0 flex justify-center items-center ${popUp ? 'hidden' : 'block'}`}>
        <div className='h-[30%] w-[30%] border-[3px] border-[#ff153c] bg-[#000000] relative '>
        <div className='h-full w-full overflow-y-scroll pb-16'>
          {
            products.map((pID, i) => (
              <div key={i} className='border-y p-2 w-full flex justify-between items-center'>
                <label className='text-white text-[12px]'>{pID}, {i}</label>
                <button id={`${i}`} onClick={(e)=> rmvCart(e)} className='px-4 py-2 bg-[red] text-white text-[12px]'>remove</button>
              </div>
            ))
        }
        </div>
          <div className='w-full flex justify-end items-end gap-4 p-2 absolute bottom-0 bg-[black]'>
            <button onClick={()=> buy()} className='px-4 py-2 bg-[#ff153c] text-white'>order</button>
            <button onClick={() => popup()} className='px-4 py-2 bg-[#ff153c] text-white'>close</button>
          </div>
        </div>
      </div>

      {/* pop up end*/}


      <div className='bg-white p-4 fixed z-[7] bottom-[10%] right-[5%] flex justify-between items-center gap-2'>
           <label className='text-[#000]'>{products.length}</label>
           <label className='text-[#000] text-[14px]'>items in cart</label>
      </div>

    </div>
  )
}
