import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await dispatch(sessionActions.login({ credential, password }));
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setCredential('DemoUser'); // Use your demo user's username/email
    setPassword('password'); // Use your demo user's password
    await dispatch(sessionActions.login({ credential: 'DemoUser', password: 'password' }));
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {Object.values(errors).map((error, idx) => <p key={idx}>{error}</p>)}
        <button type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
        <button onClick={handleDemoLogin}>Log in as Demo User</button>
      </form>
    </>
  );
}

export default LoginFormPage;
