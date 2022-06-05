import React, { useState, useEffect } from 'react';
import * as albumActions from '../../store/album';
import { useDispatch, useSelector } from 'react-redux';
import './EditAlbumForm.css';

export default function EditAlbumForm({ artistId, albumId, closeModal }) {
  const dispatch = useDispatch('');
  const session = useSelector((state) => state);
  // console.log(session.album[albumId]);
  let currentAlbum = session.album[albumId];
  const [title, setTitle] = useState(`${currentAlbum.title}`);
  const [releaseYear, setReleaseYear] = useState(`${currentAlbum.releaseYear}`);
  const [about, setAbout] = useState(`${currentAlbum.about}`);
  const [price, setPrice] = useState(`${currentAlbum.price}`);
  const [editErrors, setEditErrors] = useState([]);
  const [newEditErros, setNewEditErros] = useState([]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditErrors([]);

    let formdata = {
      artistId: artistId,
      title: title,
      releaseYear: releaseYear,
      about: about,
      price: price,
    };

    try {
      const errors = await dispatch(
        albumActions.updateOneAlbumThunk(albumId, formdata)
      );
      if (!errors) {
        closeModal();
        return;
      } else {
        setEditErrors(errors);
        return;
      }
    } catch (errorResponse) {
      // const data = await errorResponse.json();
      console.log('Failed Request: ', errorResponse);
    }
  };

  console.log(editErrors);
  useEffect(() => {
    let changedError = [];
    for (let i = 0; i < editErrors.length; i++) {
      console.log(editErrors[i]);
      if (editErrors[i] == 'title : This field is required.') {
        changedError.push('PLEASE PROVIDE VALID TITLE');
      }
      if (editErrors[i] == 'releaseYear : This field is required.') {
        changedError.push('PLEASE PROVIDE VALID RELEASE YEAR');
      }
      if (editErrors[i] == 'price : Not a valid float value') {
        changedError.push('PLEASE PROVIDE VALID PRICE');
      }
    }
    console.log(changedError);
    setNewEditErros(changedError);
  }, [editErrors]);
  console.log(newEditErros);

  return (
    <form className='resource-update-form' onSubmit={handleEditSubmit}>
      <div className='Edit-Album_title'>
        <span className='Edit-Album_title-span'>{`Edit Album Details`}</span>
      </div>
      <div className={`resource-update-form-update-container`}>
        {newEditErros.length > 0 && (
          <div className='resource-error-update-container'>
            {newEditErros.map((error, idx) => (
              <p className='resource-error-message' key={idx}>
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className='inputfieldDiv'>
        <label className='titleForanInput'>Title</label>
        <input
          className='allInputforCreateB'
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          // placeholder='Title'
          name='name'
        ></input>
      </div>
      <div className='inputfieldDiv'>
        <label className='titleForanInput'>ReleaseYear</label>
        <input
          className='allInputforCreateB'
          type='text'
          onChange={(e) => setReleaseYear(e.target.value)}
          value={releaseYear}
          // placeholder='Title'
          name='name'
        ></input>
      </div>
      <div className='inputfieldDiv'>
        <label className='titleForanInput'>About</label>
        <input
          className='allInputforCreateB'
          type='text'
          onChange={(e) => setAbout(e.target.value)}
          value={about}
          // placeholder='Title'
          name='name'
        ></input>
      </div>
      <div className='inputfieldDiv'>
        <label className='titleForanInput'>Price</label>
        <input
          className='allInputforCreateB'
          type='text'
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          // placeholder='Title'
          name='name'
        ></input>
      </div>

      <div className='resource-delete-form-btn-div'>
        <div className='resource-btn-container'>
          <button
            className='resource-cancel-btn'
            type='button'
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>

        <div className='resource-btn-container'>
          <button className='resource-delete-btn' type='submit'>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
