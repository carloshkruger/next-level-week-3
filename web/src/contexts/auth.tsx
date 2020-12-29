import { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInProps {
  email: string;
  password: string;
  isRememberMe: boolean;
}

interface AuthContextProps {
  signed: boolean;
  user: User | null;
  signIn(props: SignInProps): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Happy:token');
    const user = localStorage.getItem('@Happy:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password, isRememberMe }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (isRememberMe) {
      localStorage.setItem('@Happy:token', token);
      localStorage.setItem('@Happy:user', JSON.stringify(user));
    }

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Happy:token');
    localStorage.removeItem('@Happy:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ signed: !!data.user, user: data.user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
