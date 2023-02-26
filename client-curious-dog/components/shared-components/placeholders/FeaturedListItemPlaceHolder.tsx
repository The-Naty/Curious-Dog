import React from 'react';
import ContentLoader from 'react-content-loader';

const FeaturedListItemPlaceHolder = () => {
  return (
    <>
      <h2 className="text-center">Checek out our users with the most question</h2>
      <div className="grid grid-rows-1 grid-cols-12 w-full ">
        <div className="col-start-3 col-end-11 mb-4 mt-8 w-full pb-2 overflow-x-auto overflow-y-none m-4 mb-0 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-rounded">
          <div className="flex ">
            <div
              style={{ minWidth: '200px' }}
              className="flex justify-center  w-full hover:shadow-indigo-500/40 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md m-2 "
            >
              <ContentLoader speed={2} width={400} height={200} viewBox="0 0 400 160" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
                <rect x="138" y="148" rx="3" ry="3" width="121" height="14" />
                <circle cx="198" cy="50" r="50" />
                <rect x="172" y="108" rx="3" ry="3" width="55" height="17" />
              </ContentLoader>
            </div>
            <div
              style={{ minWidth: '200px' }}
              className="flex justify-center  w-full hover:shadow-indigo-500/40 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md  m-2 "
            >
              <ContentLoader speed={2} width={400} height={200} viewBox="0 0 400 160" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
                <rect x="138" y="148" rx="3" ry="3" width="121" height="14" />
                <circle cx="198" cy="50" r="50" />
                <rect x="172" y="108" rx="3" ry="3" width="55" height="17" />
              </ContentLoader>
            </div>
            <div
              style={{ minWidth: '200px' }}
              className="flex justify-center w-full hover:shadow-indigo-500/40 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md  m-2 "
            >
              <ContentLoader speed={2} width={400} height={200} viewBox="0 0 400 160" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
                <rect x="138" y="148" rx="3" ry="3" width="121" height="14" />
                <circle cx="198" cy="50" r="50" />
                <rect x="172" y="108" rx="3" ry="3" width="55" height="17" />
              </ContentLoader>
            </div>
            <div
              style={{ minWidth: '200px' }}
              className="flex justify-center  w-full hover:shadow-indigo-500/40 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md  m-2 "
            >
              <ContentLoader speed={2} width={400} height={200} viewBox="0 0 400 160" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
                <rect x="138" y="148" rx="3" ry="3" width="121" height="14" />
                <circle cx="198" cy="50" r="50" />
                <rect x="172" y="108" rx="3" ry="3" width="55" height="17" />
              </ContentLoader>
            </div>
            <div
              style={{ minWidth: '200px' }}
              className=" flex justify-center w-full hover:shadow-indigo-500/40 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md  m-2 "
            >
              <ContentLoader speed={2} width={400} height={200} viewBox="0 0 400 160" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
                <rect x="138" y="148" rx="3" ry="3" width="121" height="14" />
                <circle cx="198" cy="50" r="50" />
                <rect x="172" y="108" rx="3" ry="3" width="55" height="17" />
              </ContentLoader>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedListItemPlaceHolder;
