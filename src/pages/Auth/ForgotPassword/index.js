import { useState } from 'react';
import SendVerification from './SendVerification';
import useStyles from './style';
import SubmitPassword from './SubmitPassword';
import VerificationCode from './VerificationCode';

const ForgotPassword = () => {
  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [key, setKey] = useState('');

  const handleSendVerification = (e) => {
    setEmail(e);
    setStep(2);
  };

  const handleVerificationCode = (generatedKey) => {
    setKey(generatedKey);
    setStep(3);
  };

  return (
    <div className={classes.background}>
      {step === 1 ? (
        <SendVerification handle={(email) => handleSendVerification(email)} />
      ) : step === 2 ? (
        <VerificationCode
          handle={(key) => handleVerificationCode(key)}
          email={email}
        />
      ) : (
        <SubmitPassword email={email} key={key} />
      )}
    </div>
  );
};

export default ForgotPassword;
