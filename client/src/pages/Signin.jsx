import { Link ,useNavigate} from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { signInFailure,signInStart,signInSuccess } from "../redux/user/userSlice.js";

export default function Signup() {
  const [formData,setFormData] = useState({});
  const {loading,error:errorMessage} = useSelector((state)=> state.user);
  // const [errorMessage,setErrorMessage] = useState(null);
  // const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleonchange=(e)=>{
    setFormData({...formData ,[e.target.id]:e.target.value.trim()});
  }

  const handleonsumbit = async (e) => {
    e.preventDefault();
    if ( !formData.email || !formData.password) {
      dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if(res.ok) {
        dispatch(signInSuccess(data))
        navigate('/');
      }
     
    } catch (error) {
     dispatch(signInFailure(error.message));
    }
  };
  console.log(formData)
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Blog
            </span>
            Hash
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign in with your email and password
            or with Google.
          </p>
        </div>

        <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={handleonsumbit}>
              
              <div>
                <Label value='Your email'/>
                <TextInput
                  type='email'
                  placeholder='name@company.com'
                  id='email'
                  onChange={handleonchange}
                />
              </div>
              <div>
                <Label value='Your Password'/>
                <TextInput
                  type='password'
                  placeholder='********'
                  id='password'
                  onChange={handleonchange}
                />
              </div>
              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Signing in...</span>
                </>
              ) : (
                'Sign Up'
              )}
              </Button>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Don't have an account?</span>
              <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
            </div>
            {
              errorMessage &&(
                <Alert className="mt-5" color='failure'>
                  {errorMessage}
                </Alert>
              )
            }
        </div>
      </div>
    </div>
  );
}
