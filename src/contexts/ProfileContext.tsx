import { createContext } from 'react';
import { UserProps } from './AuthContext';

export const ProfileContext = createContext({} as UserProps);
