import React, { useCallback, useEffect, useState, useRef } from "react"
import { toPng } from 'html-to-image';

const Head = () =>
{
  return (
    <div style={ {
      background: "linear-gradient(90deg, #672280 1.18%, #A626D3 100%)",
      height: "65px",
      display: "flex",
      alignItems: "center",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between"
    } }>
      <div style={ { color: "#FFFFFF" } }>
        <img
          src="https://i.imgur.com/f3zaVcR.png"
          alt=""
          style={ { margin: "10px" } }
        />
        <strong>Meme Generator</strong>
      </div>
      <div style={ { color: "#FFFFFF" } }>
        React Course - Project 3
      </div>
    </div>
  )
}

const App = () =>
{
  const [ images, setImages ] = useState( [] )
  const [ image, setImage ] = useState()
  const [ txt1, setTxt1 ] = useState()
  const [ txt2, setTxt2 ] = useState()
  useEffect( () =>
  {
    fetch( "https://api.imgflip.com/get_memes" )
      .then( resp => resp.json() )
      .then( data => setImages( data.data.memes ) )
  }, [] )
  useEffect( () =>
  {
    console.log( images )
  }, [ images ] )

  const getRandomImage = useCallback( () =>
  {
    const filteredImages = images.filter(
      ( image ) => image.width <= 1000 && image.height <= 1000
    );
    const randomIndex = Math.floor( Math.random() * filteredImages.length );
    console.log( randomIndex )
    setImage( filteredImages[ randomIndex ] );
  }, [ images ] );


  useEffect( () =>
  {
    console.log( image )
  }, [ image ] )

  const ref = useRef( null );

  const onButtonClick = useCallback( () =>
  {
    if ( ref.current === null )
    {
      return;
    }

    toPng( ref.current, { cacheBust: true } )
      .then( ( dataUrl ) =>
      {
        const link = document.createElement( 'a' );
        link.download = 'meme.png';
        link.href = dataUrl;
        link.click();
      } )
      .catch( ( err ) =>
      {
        console.log( err );
      } );
  }, [ ref ] );

  return (
    <div className="container">
      <br />
      <center>
        <div style={ image ? { background: "#FFFFFF", width: `${ image.width + 300 }px`, height: `${ image.height + 400 }px` } : { background: "#FFFFFF", width: "550px", height: "700px" } }>
          <Head />
          <br />
          <br />
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <input type="text" name="" value={ txt1 } className="form-control" onChange={ ( e ) => setTxt1( e.target.value ) } />
              </div>
              <div className="col-md-6">
                <input type="text" name="" value={ txt2 } className="form-control" onChange={ ( e ) => setTxt2( e.target.value ) } />
              </div>
            </div>
            <br />
            <button type="" className="form-control" style={ { background: "linear-gradient(90deg, #672280 1.18%, #A626D3 100%)", height: "50px" } } onClick={ getRandomImage }>
              <div style={ { color: "#FFFFFF" } }>
                <strong>
                  Get a new meme image  🖼
                </strong>
              </div>
            </button>
            <br />
            <br />
            {
              image && (
                <>
                  <div ref={ ref }
                    style={ {
                      backgroundImage: `url(${ image.url })`,
                      width: `${ image.width }px`,
                      height: `${ image.height }px`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    } }
                  >
                    <h1 style={ { color: 'white', fontWeight: 1000, fontSize: "32 pxm", WebkitTextStroke: "1.5px black" } }>{ txt1 }</h1>
                    <h1 style={ { color: 'white', fontWeight: 1000, fontSize: "32 pxm", WebkitTextStroke: "1.5px black" } }>{ txt2 }</h1>
                  </div>
                  <br />
                  <br />
                  <button type="" className="btn" style={ { background: "linear-gradient(90deg, #672280 1.18%, #A626D3 100%)", height: "50px" } } onClick={ onButtonClick }>
                    <div style={ { color: "#FFFFFF" } }>
                      <strong>
                        Download meme image  🖼
                      </strong>
                    </div>
                  </button>
                </>
              )
            }



          </div>
        </div>
      </center >
    </div >
  );
}

export default App;
