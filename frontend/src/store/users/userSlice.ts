import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem, removeItem, setItem } from '@/utils/storage';
import { UserInfo } from '#/entity';
import { StorageEnum } from '#/enum';
import { jwtDecode } from 'jwt-decode';
import { useAppDispatch } from '../hooks';
import DemoService from '@/api/services/demoService';
import { useRouter } from '@/router/hooks';
import { UserAccount } from '#/api';
import { resetCartItemsBeforeLogin } from '../shopping';
const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
type UserState = {
  userInfo: Partial<UserInfo>;
  userToken: string;
};

const initialState: UserState = {
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<string>(StorageEnum.Token) || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<string>) => {
      const decodedPayload: UserInfo = jwtDecode(action.payload);
      state.userToken = action.payload;
      state.userInfo = decodedPayload;
      setItem(StorageEnum.Token, action.payload);
      setItem(StorageEnum.User, decodedPayload);
    },
    clearUserInfoAndToken: (state) => {
      state.userInfo = {};
      state.userToken = '';
      removeItem(StorageEnum.User);
      removeItem(StorageEnum.Token);
    },
  },
});

export const { setUserInfo, clearUserInfoAndToken } = userSlice.actions;

export const useSignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const signIn = async (data: UserAccount) => {
    const response = await DemoService.loginAction(data);
    dispatch(setUserInfo(response.data.token));
    dispatch(resetCartItemsBeforeLogin());
    router.replace(HOMEPAGE);
  };
  return signIn;
};

export default userSlice.reducer;
