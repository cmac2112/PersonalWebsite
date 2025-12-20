
// will contain the clickable image component along side its subtitle and an option to route the user to a 4k view
interface ObservatoryImageProps{
    title: string;
    subtitle: string;
    
}


const ObservatoryImage = ({ title, subtitle }: ObservatoryImageProps) => {

    return (
        <div
            className='observatory-image-container'>
            <div className='image'>

            </div>
            <h2 className='observatory-title'>{title}</h2>
            <p className='observatory-subtitle'>{subtitle}</p>
        </div>
    )
}

export default ObservatoryImage
