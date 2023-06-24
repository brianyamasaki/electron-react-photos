import React, { ChangeEventHandler, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PhotoFrame from 'renderer/components/PhotoFrame';
import { PhotoMetadata, Channels } from '../../includes';
import { PMContext } from '../App';
import './Choose.css';

export enum PhotoSortOrder {
  byFilename = 'Sort by Filename',
  byDate = 'Sort by Date'
};

const sortOrders = [PhotoSortOrder.byDate, PhotoSortOrder.byFilename];

const sortByFilename = (pmA:PhotoMetadata, pmB: PhotoMetadata ) => {
  const filenameA = `${pmA.filename}${pmA.fileExt}`.toLowerCase();
  const filenameB = `${pmB.filename}${pmB.fileExt}`.toLowerCase();
  if (filenameA < filenameB) {
    return -1;
  } else if (filenameA > filenameB) {
    return 1;
  }
  return 0;
}

const sortByDate = (pmA:PhotoMetadata, pmB: PhotoMetadata ) => (pmA.unixTime - pmB.unixTime)

function Choose() {
  const { invoke } = window.electron.ipcRenderer;
  const [ pmlist, setPmlist] = useState([] as PhotoMetadata[]);
  const [ sortOrder, setSortOrder ] = useState(PhotoSortOrder.byDate);
  let pmListT:PhotoMetadata[] = [];

  const sortList = (pmList: PhotoMetadata[], sortOrder: PhotoSortOrder) => {
    switch(sortOrder) {
      case PhotoSortOrder.byDate:
        pmList = pmList.sort(sortByDate);
        break;
      case PhotoSortOrder.byFilename:
        pmList = pmList.sort(sortByFilename)
        break;
    }
    setPmlist(pmList);
  }

  const onChange = (event: { target: { files: any; }; }) => {
    const files = event.target.files;
    const promises:Promise<void>[] = [];

    for (let i = 0; i < files.length; i += 1) {
      promises[i] =
        invoke(Channels.getMetadata, files[i].path)
        .then((metadata) => {
          pmListT[i] = metadata;
        })
        .catch((error) => {
          console.error(error.message)
        });
    }
    // after all promises have been resolved, reset the state
    Promise.all(promises)
      .then (() => {
        sortList(pmListT, sortOrder);
      })
  }

  const renderPhotos = () => {

    return (
      <div className='flexy'>
        {pmlist.map((pm: PhotoMetadata) => {
          return (
            <PhotoFrame key={pm.filepath} pm={pm} />
          )
        })}
      </div>
    )
  }

  const renderSortOrder = ()  => {

    return (
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={(e) => {
          setSortOrder(e.target.value as PhotoSortOrder);
          sortList(pmlist, e.target.value as PhotoSortOrder);
        }}
      >
        {sortOrders.map(sortOrder => {
          return (
            <option key={sortOrder} value={sortOrder}>{sortOrder}</option>
          )
        })}
      </select>
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

        {renderSortOrder()}
      </form>
      {renderPhotos()}
    </div>
  );
}


export default Choose;
