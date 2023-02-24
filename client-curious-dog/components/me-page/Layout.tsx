import UserHeader from '../shared-components/UserHeader';
import PPUploader from '../shared-components/PPUploader';
import { useUserStats } from '../../lib/hooks/user.hooks';
import { useAtom } from 'jotai';
import { userAtom } from '../../lib/atoms/user.atom';
import UserFollowDetailsTabs from '../shared-components/UserFollowDetailsTabs';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { fetchUser, uploadProfilePicture } from '../../lib/api/user.api';
import { clearAuthToken, getAuthToken } from '../../util/token-storage';
import { useRouter } from 'next/router';

const Layout = () => {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const [displayUploader, setDisplayUploader] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: statsData, isLoading: isStatsLoading } = useUserStats({
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
    const image = { ...e.target.files };
    setProfilePicture(image[0]);
  };

  const handleLogout = () => {
    clearAuthToken();
    if (!getAuthToken()) {
      router.reload();
    }
  };

  return (
    <>
      <div className="xl:flex flex-row-reverse  items-start my-4">
        <div className="flex flex-col justify-center">
          <PPUploader
            displayUploader={displayUploader}
            setDisplayUploader={setDisplayUploader}
            profilePicture={profilePicture}
            isUploading={isUploading}
            uploadFiletoStorage={uploadFiletoStorage}
            handleFileChange={handleFileChange}
          />
          <button
            className={`bg-transparent enabled:hover:bg-indigo-500 text-indigo-700 font-semibold enabled:hover:text-white py-2 px-4 border border-indigo-500 enabled:hover:border-transparent rounded text-xs mt-2`}
            onClick={handleLogout}
            disabled={isUploading}
          >
            Log out
          </button>
        </div>
        <div className="flex flex-col justify-center flex-grow px-4">
          <UserHeader stats={statsData} isStatsLoading={isStatsLoading} />
          <UserFollowDetailsTabs userId={user?.id} />
        </div>
      </div>
    </>
  );
};

export default Layout;
