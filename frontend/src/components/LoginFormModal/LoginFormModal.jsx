import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './LoginForm.css';
import { useModal } from '../../context/Modal';

function LoginFormModal () {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(sessionActions.login({ credential, password })) 
      .then(() => closeModal())
      .catch(async (res) => {

        if (res.data && res.data.errors) {
          setErrors(res.data.errors);
        }
      });
  };

  const handleDisabled = () => {
    return credential.length < 4 || password.length < 6;
  };

  const handleDemo = (e) => {
    e.preventDefault(); // Prevent form submission when clicking on the demo button.
    dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
      .then(() => closeModal())
      .catch(async (res) => {
        if (res.data && res.data.errors) {
          setErrors(res.data.errors);
        }
      });
  };

  return (
    <>
      <h1>Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
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
        {errors.message && <p>{errors.message}</p>}
        <button
          className="login"
          type="submit"
          disabled={handleDisabled()}
        >
          Log In
        </button>
        <button
          onClick={handleDemo}
          className="demo-login"
          type="button"
        >
          Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
