import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../redux/slices/signupSlice';
import { AppDispatch, RootState } from '../../redux/store';

const SignupComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.signup.loading);
  const signupResult = useSelector((state: RootState) => state.signup.signupResult);
  const error = useSelector((state: RootState) => state.signup.error);

  const [signupParams, setSignupParams] = useState({
    token: '',
    languageCode: '',
    profileInfo: {
      title: '',
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      nationality: '',
      mobileNumber: '',
      emailAddress: '',
      password: '',
      mobileCode: '',
      isSubscribeNewsLetter: true,
    }
  });

  const handleSignup = () => {
    dispatch(signupUser(signupParams));
  };

  return (
    <div>
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Token"
        value={signupParams.token}
        onChange={(e) => setSignupParams({ ...signupParams, token: e.target.value })}
      />
      <input
        type="text"
        placeholder="Language Code"
        value={signupParams.languageCode}
        onChange={(e) => setSignupParams({ ...signupParams, languageCode: e.target.value })}
      />
      {/* Add input fields for each profileInfo parameter */}
      <input
        type="text"
        placeholder="Title"
        value={signupParams.profileInfo.title}
        onChange={(e) => setSignupParams({ 
          ...signupParams, 
          profileInfo: { ...signupParams.profileInfo, title: e.target.value } 
        })}
      /><input
      type="firstName"
      placeholder="firstName"
      value={signupParams.profileInfo.firstName}
      onChange={(e) => setSignupParams({ 
        ...signupParams, 
        profileInfo: { ...signupParams.profileInfo, firstName: e.target.value } 
      })}
    /><input
    type="lastName"
    placeholder="lastName"
    value={signupParams.profileInfo.lastName}
    onChange={(e) => setSignupParams({ 
      ...signupParams, 
      profileInfo: { ...signupParams.profileInfo, lastName: e.target.value } 
    })}
  />
  <input
    type="gender"
    placeholder="gender"
    value={signupParams.profileInfo.gender}
    onChange={(e) => setSignupParams({ 
      ...signupParams, 
      profileInfo: { ...signupParams.profileInfo, gender: e.target.value } 
    })}
  /><input
  type="dateOfBirth"
  placeholder="dateOfBirth"
  value={signupParams.profileInfo.dateOfBirth}
  onChange={(e) => setSignupParams({ 
    ...signupParams, 
    profileInfo: { ...signupParams.profileInfo, dateOfBirth: e.target.value } 
  })}
/><input
    type="nationality"
    placeholder="nationality"
    value={signupParams.profileInfo.nationality}
    onChange={(e) => setSignupParams({ 
      ...signupParams, 
      profileInfo: { ...signupParams.profileInfo, nationality: e.target.value } 
    })}
  /><input
  type="mobileNumber"
  placeholder="mobileNumber"
  value={signupParams.profileInfo.mobileNumber}
  onChange={(e) => setSignupParams({ 
    ...signupParams, 
    profileInfo: { ...signupParams.profileInfo, mobileNumber: e.target.value }
  })}
/><input
    type="emailAddress"
    placeholder="emailAddress"
    value={signupParams.profileInfo.emailAddress}
    onChange={(e) => setSignupParams({ 
      ...signupParams, 
      profileInfo: { ...signupParams.profileInfo, emailAddress: e.target.value } 
    })}
  /><input
  type="password"
  placeholder="password"
  value={signupParams.profileInfo.password}
  onChange={(e) => setSignupParams({ 
    ...signupParams, 
    profileInfo: { ...signupParams.profileInfo, password: e.target.value } 
  })}
/><input
    type="mobileCode"
    placeholder="mobileCode"
    value={signupParams.profileInfo.mobileCode}
    onChange={(e) => setSignupParams({ 
      ...signupParams, 
      profileInfo: { ...signupParams.profileInfo, mobileCode: e.target.value } 
    })}
  />
      {/* Add similar input fields for firstName, lastName, etc. */}
      <button onClick={handleSignup} disabled={loading}>
        {loading ? 'Signing up...' : 'Signup'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {signupResult && <div>{JSON.stringify(signupResult)}</div>}
    </div>
  );
};

export default SignupComponent;
