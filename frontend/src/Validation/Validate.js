



const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;


const fieldValidate =(email,password,setEmailError,setPasswordError)=>{
    // Front-end validation
    let isValid = true;

    if (!email || !email.match(emailRegex)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!password || !password.match(passwordRegex)) {
      setPasswordError('Invalid password');
      isValid = false;
    }

    if (!isValid) {
      return;
    }
}


export default fieldValidate