import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import * as sessionActions from '../../store/session';
// import { useModal } from '../../context/Modal';
import './SignupForm.css';

const SignUpModal = ({ onClose, onSignUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const isSignUpDisabled =
    !firstName || !lastName || !email || username.length < 4 || password.length < 6 || password !== confirmPassword;

  const handleSignUp = async () => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        onSignUp({ firstName, email });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button
          onClick={handleSignUp}
          disabled={isSignUpDisabled}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignUpModal;




// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import * as sessionActions from '../../store/session';
// import { useModal } from '../../context/Modal';
// import './SignupForm.css';

// function SignupFormModal({ onClose }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const sessionUser = useSelector((state) => state.session.user);
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();

//   if (sessionUser) {
//     navigate('/');
//     return null;
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setErrors({ confirmPassword: "Confirm Password field must be the same as the Password field" });
//       return;
//     }

//     setErrors({});
//     try {
//       const response = await dispatch(sessionActions.signup({ email, username, firstName, lastName, password }));
//       if (response.ok) {
//         closeModal();
//         onClose(); // Close the modal on successful signup
//       }
//     } catch (err) {
//       const data = await err.json();
//       if (data && data.errors) {
//         setErrors(data.errors);
//       }
//     }
//   };

//   return (
//     <>
//       <h1>Sign Up</h1>
//       <form className='signup-form' onSubmit={handleSubmit}>
//         <input
//           placeholder='Email'
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         {errors.email && <p>{errors.email}</p>}
//         <input
//           placeholder='Username'
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         {errors.username && <p>{errors.username}</p>}
//         <input
//           placeholder='First Name'
//           type="text"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           required
//         />
//         {errors.firstName && <p>{errors.firstName}</p>}
//         <input
//           placeholder='Last Name'
//           type="text"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           required
//         />
//         {errors.lastName && <p>{errors.lastName}</p>}
//         <input
//           placeholder='Password'
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         {errors.password && <p>{errors.password}</p>}
//         <input
//           placeholder='Confirm Password'
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         {errors.confirmPassword && (
//           <p>{errors.confirmPassword}</p>
//         )}
//         <button disabled={!(email && username && username.length > 3 && lastName && password && password.length > 5 && confirmPassword)} type="submit">Sign Up</button>
//       </form>
//     </>
//   );
// }

// export default SignupFormModal;








// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import * as sessionActions from '../../store/session';
// import { useModal } from '../../context/Modal';
// import './SignupForm.css';

// function SignupFormModal() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const sessionUser = useSelector((state) => state.session.user);
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();

//   // Redirect if user is already logged in
//   if (sessionUser) {
//     navigate('/'); // Use navigate('/') to redirect
//     return null; // Return null to avoid rendering the form when the user is logged in
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setErrors({ confirmPassword: "Confirm Password field must be the same as the Password field" });
//       return;
//     }

//     setErrors({});
//     try {
//       await dispatch(sessionActions.signup({ email, username, firstName, lastName, password }));
//       closeModal(); // Close the modal on successful signup
//     } catch (res) {
//       const data = await res.json();
//       if (data && data.errors) {
//         setErrors(data.errors);
//       }
//     }
//   };

//   return (
//     <>
//       <h1>Sign Up</h1>
//       <form className='signup-form' onSubmit={handleSubmit}>
//           <input
//             placeholder='Email'
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         {errors.email && <p>{errors.email}</p>}
//           <input
//             placeholder='Username'
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         {errors.username && <p>{errors.username}</p>}
//           <input
//             placeholder='First Name'
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         {errors.firstName && <p>{errors.firstName}</p>}
//           <input
//             placeholder='Last Name'
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         {errors.lastName && <p>{errors.lastName}</p>}
//           <input
//             placeholder='Password'
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         {errors.password && <p>{errors.password}</p>}
//           <input
//             placeholder='Confirm Password'
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         {errors.confirmPassword && (
//           <p>{errors.confirmPassword}</p>
//         )}
//         <button disabled={!(email && username && username.length > 3 && lastName && password && password.length > 5 && confirmPassword)} type="submit">Sign Up</button>
//       </form>
//     </>
//   );
// }

// export default SignupFormModal;
