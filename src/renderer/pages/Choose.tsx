import React, { ChangeEventHandler } from 'react';
import { Link } from 'react-router-dom';
import './Choose.css';

function Choose() {
  const [files, setFiles] = React.useState([] as File[]);

  const onChange = (event: ChangeEventHandler<HTMLInputElement>) => {
    const files = event.target.files;
    setFiles(files);
  }

  const renderPhotos = () => {
    const paths:string[] = [];
    for (let i = 0; i < files.length; i += 1) {
      paths.push(files[i].path);
    }

    return (
      <div>
      {paths.map((path:string) => {
        return (
          <img
            key={path}
            src={`file://${path}`}
            alt={path}
          />
        )
      })}
      </div>
    )
  }

  return (
    <div>
      <Link to="/">Back to Home</Link>
      <div>
        <h1>Select all Your Photos</h1>
        <p>Find all your photos and select them at this stage.
          We will resize them and let you view them and decide which
          are worth showcasing and which just don't tell the story
          you want to tell.
        </p>
      </div>
      <form>
        <fieldset>
          <legend>Choose a Complete Folder</legend>
          <input
            id="chooseFolder"
            type="file"
            accept="image/png, image/jpeg"
            multiple
            webkitdirectory="true"
            onChange={onChange}
          />
        </fieldset>
        <h2>OR</h2>
        <fieldset>
          <legend>Choose Multiple Photos</legend>
          <input
            id="chooseFolder"
            type="file"
            accept="image/png, image/jpeg"
            multiple
            onChange={onChange}
          />
        </fieldset>

        {/* <button className='button' type="submit">Next</button> */}
      </form>
      {renderPhotos()}
    </div>
  );
}


export default Choose;
