import { createContext } from 'react';
import { IUser } from '../../typings/User';

export type AuthState = { isLoggedIn: boolean | null; user?: IUser };

const UserContext = createContext<AuthState>({ isLoggedIn: false });

export default UserContext;
