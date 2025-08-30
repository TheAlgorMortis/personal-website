import React, { useRef } from 'react';

/**
 * A button used to select a file.
 *
 * @component
 *
 * @param {Object} props
 * @param {String} props.className - className for css
 * @param {String} props.caption - the caption of the button
 * @param {Function} props.setFunc - the function to call when an image is
 * successfully selected.
 */
export default function ImageButton( { className, caption, setFunc, icon} ) {
  const inputRef = useRef();

  const onPick = e => {
    const file = e.target.files[0];
    if (!file) {
      setFunc('');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      localStorage.setItem('newPic', dataUrl);
      setFunc(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <button className={className} onClick={() => inputRef.current.click()}>{icon}{caption}</button>
      <input ref={inputRef} type="file" accept="image/*" style={{display:'none'}} onChange={onPick}/>
    </>
  );
}
