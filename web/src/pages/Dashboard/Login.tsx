import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

import logoTipo from '../../images/Logotipo.svg';

import '../../styles/pages/dashboard/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRememberMe, setIsRememberMe] = useState(false);

  const { signIn } = useAuth();

  function handleRememberMeChange() {
    setIsRememberMe(!isRememberMe);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await signIn({ email, password, isRememberMe });
    } catch {
      alert('Não foi possível realizar o login.');
    }
  }

  return (
    <div id="page-login">
      <aside className="logo-side">
        <img src={logoTipo} alt="Happy" />

        <div className="location-container">
          <strong>Rio do Sul</strong>
          <span>Santa Catarina</span>
        </div>
      </aside>

      <aside className="fields-side">
        <form onSubmit={handleSubmit}>
          <h1>Fazer login</h1>

          <div className="input-block">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-footer">
            <label className="lembrar-me-container">
              Lembrar-me
              <input type="checkbox" onChange={handleRememberMeChange} />
              <span className="checkmark"></span>
            </label>

            <Link to="">Esqueci minha senha</Link>
          </div>

          <button className="submit-button">Entrar</button>
        </form>
      </aside>
    </div>
  );
};

export default Login;
