import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/session';
import { Navigate } from 'react-router-dom';

function SignupFormPage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(signup({ username, firstName, lastName, email, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  // Redirect if user is logged in logic here...

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for username, firstName, lastName, email, password */}
      {/* Display errors if there are any */}
    </form>
  );
}

export default SignupFormPage;
