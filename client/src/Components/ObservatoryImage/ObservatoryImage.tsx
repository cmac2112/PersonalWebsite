import {use, useEffect, useState} from 'react'

// will contain the clickable image component along side its subtitle and an option to route the user to a 4k view
interface ObservatoryImageProps{
    title: string;
    subtitle: string;
    
}


const ObservatoryImage = () => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
        const HandleTileClick = () =>{
          isOpened == false ? setIsOpened(true) : setIsOpened(false);
        }

        //lets load the images from the server asychronously

        useEffect(() => {
            setLoading(true);
            //make call to image endpoint
            
        }, [])
  return (
    <div onClick={HandleTileClick}
    className='observatory-image-container'>
      <div className='image'>

      </div>
      <h2 className='observatory-title'>title</h2>
      <p className='observatory-subtitle'>subtitle</p>
    </div>
  )
}

export default ObservatoryImage
