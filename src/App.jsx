import React from "react"
function App() {

  const [meme, setMeme] = React.useState({
    topText: "hahah",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg"
  })

  const [allMemes, setAllMemes] = React.useState([])

  const fileInputRef = React.useRef(null)

  function handleChange(event){
    const {value, name} = event.currentTarget
    setMeme(prevMeme =>( {
      ...prevMeme,
      [name]: value
    }))
  }

  React.useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
     .then(res=>res.json())
     .then(data => setAllMemes(data.data.memes))
  }, [])

  

//  data => setAllMemes(data.data.memes)
 
  function chooseMeme(){
    const random = Math.floor(Math.random() * allMemes.length)

    setMeme( prevMeme => ({
      ...prevMeme,
      imageUrl:allMemes[random].url
    }))
  }

  function uploadFile(){
   if(fileInputRef.current){
    fileInputRef.current.click();
   }
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setMeme((prevMeme) => ({
        ...prevMeme,
        imageUrl: imageUrl,
      }));
    }
  }


  return (
    <>
    <main>
      <div className="form">
        <label>Top Text
          <input
           type="text"
           placeholder="One does not simply"
           name="topText"
           onChange={handleChange}
           value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
           <input
           type="text"
           placeholder="Walk into Mordor"
           name="bottomText"
           onChange={handleChange}
           value={meme.bottomText}
           />
        </label>
        <button
        onClick={chooseMeme}
        >Get a new meme image 🎲</button>
        
        <button onClick={uploadFile}>Upload your own image ⬆️</button>

        <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{display:"none"}}
        />
      </div>
      <div className="meme">
        <img src={meme.imageUrl}/>
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
    
    </>
  )
}

export default App
