
import { useModal } from '../context/ModalContext';
import { LoginForm } from './LoginForm';

export const Navbar = () => {
  const { showModal } = useModal();

  return (
    <nav style={{ justifyContent: 'flex-end' }}>
      <button onClick={() => showModal(<LoginForm />)}>Log In</button>
      <button onClick={() => showModal(<LoginForm />)}>Sign Up</button> {/* Implement sign-up similarly */}
    </nav>
  );
};
