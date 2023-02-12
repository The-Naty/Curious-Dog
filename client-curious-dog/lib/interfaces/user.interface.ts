export interface User {
  id?: number;
  username: string;
  email: string;
  profilePicture?: string;
  token?: string;
  _count?: { receivedQuestions: number; followers: number };
  followers?: [];
  following?: [];
  follower: User;
  folllowing: User;
}

export interface UserFollowerInfo {
  followerId: number;
  followingId: number;
  createdAt: string;
  follower: {
    id: number;
    profilePicture?: string;
    username: number;
    email: number;
    _count: {
      receivedQuestions: number;
      followers: number;
    };
  };
}

export interface UserFollowingInfo {
  followerId: number;
  followingId: number;
  createdAt: string;
  folllowing: {
    id: number;
    profilePicture?: string;
    username: number;
    email: number;
    _count: {
      receivedQuestions: number;
      followers: number;
    };
  };
}
