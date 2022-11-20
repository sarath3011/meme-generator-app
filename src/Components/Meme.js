import React,{useState,useEffect} from 'react'

function Meme() {
  //UseState()
  const [meme, setMeme]=useState({
    topText:"",
    bottomText:"",
    randomImage:"https://i.imgflip.com/2d3al6.jpg"
  })
  const[allMeme,setAllMeme]=useState([]);

  //UseEffect()
// useEffect(()=>{
//   fetch("https://api.imgflip.com/get_memes")
//   .then(response=>response.json)
//   .then(data => setAllMeme(data.data.memes))
// },[])

useEffect(()=>{
async function getMemes() {
    const res = await fetch("https://api.imgflip.com/get_memes")
    const data = await res.json()
    setAllMeme(data.data.memes)
  }
  getMemes()
},[])
  function getMemeImage(){
  
    const randomNumber= Math.floor(Math.random()*allMeme.length);
    const url = allMeme[randomNumber].url
    setMeme(prevMemeArray=>{
      return{ ...prevMemeArray, randomImage:url }
    })
  }
  function handleChange(event) {
    const{name,value}=event.target
    setMeme(prevMeme =>({
      ...prevMeme,[name]:value
    }))
  }
  return (
    <main>
    <div className='form'>
      <input type="text"
       className='form--input' 
       placeholder='top-text'
       name='topText'
       value={meme.topText}
       onChange={handleChange}
      />
      <input type="text"
       className='form--input'
        placeholder='bottom-text'
        name='bottomText'
       value={meme.bottomText}
       onChange={handleChange}
        />
      <button className='form--button'onClick={getMemeImage} >Get New Image</button>
    </div>
    <div className="meme">
    <img src={meme.randomImage} className='meme--image'/>
    <h2 className='meme--text top'>{meme.topText}</h2>
    <h2 className='meme--text bottom'>{meme.bottomText}</h2>
     </div>

    </main>
  )
}

export default Meme