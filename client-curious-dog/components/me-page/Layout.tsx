import UserHeader from '../shared-components/UserHeader';
import PPUploader from '../shared-components/PPUploader';
import { useUserStats } from '../../lib/hooks/user.hooks';
import { useAtom } from 'jotai';
import { userAtom } from '../../lib/atoms/user.atom';
import TabsLayoutContainer from '../shared-components/TabsLayoutContainer';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { fetchUser, uploadProfilePicture } from '../../lib/api/user.api';

const Layout = () => {
  const [user, setUser] = useAtom(userAtom);
  const [limit, setLimti] = useState(4);
  const [displayUploader, setDisplayUploader] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: satsData, isLoading: statsLoading } = useUserStats({
    userId: user?.id,
  });

  const uploadFiletoStorage = async () => {
    try {
      setIsUploading(true);
      await uploadProfilePicture(profilePicture);
      setProfilePicture(null);
      const data = await fetchUser();
      setUser(data);
      toast('profile picture update successful', { type: 'success' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: any) => {
    setProfilePicture(...e.target.files);
  };

  return (
    <>
      <div className="xl:flex flex-row-reverse  items-start my-4">
        <div className="flex flex-col justify-center">
          <PPUploader
            displayUplaoder={displayUploader}
            setDisplayUploader={setDisplayUploader}
            profilePicture={profilePicture}
            isUploading={isUploading}
            uploadFiletoStorage={uploadFiletoStorage}
            handleFileChange={handleFileChange}
          />
        </div>
        <div className="flex flex-col justify-center flex-grow px-4">
          <UserHeader stats={satsData} statsLoading={statsLoading} />
          <TabsLayoutContainer tabs={['followers', 'following']} limit={limit} userId={user?.id} />
        </div>
      </div>
    </>
  );
};

export default Layout;
