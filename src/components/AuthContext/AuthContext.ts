import { createContext } from 'react';
import { IUser } from '../../typings/User';

export type AuthState = { isLoggedIn: boolean | null; user: IUser | null };

const UserContext = createContext<AuthState>({ isLoggedIn: false, user: null });

export default UserContext;
