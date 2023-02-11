import { IoIosAddCircleOutline } from 'react-icons/io';
import LoadingSpinner from './LoadingSpinner';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  displayUplaoder: boolean;
  setDisplayUploader: Dispatch<SetStateAction<boolean>>;
  profilePicture: any;
  isUploading: boolean;
  uploadFiletoStorage: () => void;
  handleFileChange: (e:any) => void;
}
const PPUploader = ({ displayUplaoder, setDisplayUploader, profilePicture, isUploading, uploadFiletoStorage, handleFileChange }: Props) => {
  return (
    <>
      <button
        className={`bg-transparent enabled:hover:bg-indigo-500 text-indigo-700 font-semibold enabled:hover:text-white py-2 px-4 border border-indigo-500 enabled:hover:border-transparent rounded text-xs`}
        onClick={() => setDisplayUploader(prevValue => !prevValue)}
        disabled={isUploading}
      >
        update profile picture
      </button>
      {displayUplaoder ? (
        <>
          <div className="flex justify-between items-center w-full my-2">
            <label className="form-label" htmlFor="formFile" style={{ fontSize: '25px' }}>
              <IoIosAddCircleOutline style={{ color: isUploading ? 'gray' : 'indigo', fontSize: '30px', cursor: 'pointer' }} />
            </label>
            <input type="file" id="formFile" className="hidden" onChange={e => handleFileChange(e)} accept="image/*" disabled={isUploading} />
            <button
              className={`bg-transparent enabled:hover:bg-indigo-500 text-indigo-700 font-semibold enabled:hover:text-white py-2 px-4 border border-indigo-500 enabled:hover:border-transparent rounded text-xs ${
                isUploading ? '' : 'disabled:opacity-25'
              }`}
              onClick={() => uploadFiletoStorage()}
              disabled={!profilePicture || isUploading}
            >
              {isUploading ? <LoadingSpinner /> : 'upload'}
            </button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default PPUploader;
