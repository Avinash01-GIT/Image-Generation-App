import "./App.css";
import axios from "axios";
import { useRef, useState } from "react";

function App() {
  const inputRef = useRef();
  const [imageLink, setImageLink] = useState();
  const url =
    "https://api-inference.huggingface.co/models/prompthero/openjourney-v4";

  function clickHandler() {
    const data = {
      input: `${inputRef.current.value}`,
    };

    axios
      .post(
        url,
        {
          inputs: JSON.stringify(data),
        },
        {
          headers: {
            Autherization: data.access_token,
          },
          responseType: "blob",
        }
      )
      .then((res) => {
        const image = URL.createObjectURL(res.data);
        setImageLink(image);
      });
  }

  return (
    <div className="app">
      <header>
        <h1>Image generator</h1>
        <div id="inputContainer">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for the image..."
            className="searchBar"
          />
          <button onClick={clickHandler} className="btn">
            Generate
          </button>
        </div>
        <div className="imageContainer">
          {imageLink && (
            <img src={imageLink} alt={`image of ${inputRef.current?.value}`} />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
