import Head from "next/head";
import { AuthLayout } from "@/layouts";
// import { Button, Typography } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/styles";
import { PasswordInput, TextInput } from "@/components/inputs";
import { useRef, useState  ,useMemo} from "react";
import { register } from "@/hooks/useAuth";
import { Box } from "@mui/material";
import { Alert } from "@material-ui/lab";
import ReCAPTCHA from "react-google-recaptcha";
import { message } from "antd";
import { GoogleAuthButton } from "@/components/button";
import useAuth from '@/hooks/useAuth'
import { useTranslation } from "@/context/useTranslation";
import React from 'react'
// ------------------



import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
const useStyles = makeStyles((theme: any) => ({
  form: {
    marginTop: theme.spacing(3),
    minWidth: "70%",
  },
  button: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const INITIAL_USER = {
  name: '',
  email: '',
  password: ''
};

export default function Register() {
 
  const router = useRouter();
 

  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { translation } = useTranslation();

  const t = useMemo(() => translation.register_page ?? {}, [translation]);
  const troot = useMemo(() => translation ?? {}, [translation]);
console.log("T" ,t)

  const {mutate} = useAuth()

// ----------------
const [user, setUser] = React.useState(INITIAL_USER);
const [disabled, setDisabled] = React.useState(true);
// const [loading, setLoading] = React.useState(false);
const [error, setError] = React.useState('');

React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true)
}, [user]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
}

// --------




  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
  
      
        await register(user);
        mutate()
        router.push("/");
      
    } catch (e) {
      setHasError(true);
      setError(e?.message)
      setLoading(false);
    }
  };
  





  return (
//     <>
//  <Head>
//         <title>Outlet Turkey</title>
    
//         <meta name="description" content="شركة العطور بلاك بيرفوم " />
//         <meta
//             name="keywords"
//             content="Outlet Turkey"
        
   
//           />



//         <link rel="icon" 
        
//              href="/logoOutlet.png"
//         />
//       </Head>
//       <AuthLayout>
//         <Typography component={"span"} variant="h5">
//           <FormattedMessage id={"title.register"} />
//         </Typography>
//         {hasError && (
//           <Box marginTop={2}>
//             <Alert severity="error">
//               <FormattedMessage id={"error.register"} />
//             </Alert>
//           </Box>
//         )}
//         <form className={classes.form} onSubmit={onSubmit}>
//           <TextInput
//             required
//             label={t.name}
//             autoComplete="name"
//             onChange={setName}
//           />
//           <TextInput
//             required
//             label={t.email}
//             type="email"
//             autoComplete="email"
//             onChange={setEmail}
//           />

//           <PasswordInput
//             name="password"
//             label={t.pass}
//             required={true}
//             autoComplete="password"
//             onChange={setPassword}
//           />



//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={loading}
//           >
//             {t.send}
//           </Button>
//           <GoogleAuthButton text={t.google}  />
//           <Box marginTop={2}>
            
//             <HaveAccount text={t.no_account} />
//           </Box>
//         </form>
//       </AuthLayout>
//     </>


<div dir={troot.dir === 'rtl' ? 'rtl' : 'ltr'} className="signup-area">
<Message
    attached
    icon="settings"
    header={troot.dir === 'rtl' ? 'ابدأ الان' : 'Get starter now'}
    content={troot.dir === 'rtl' ?  'حساب جديد' : 'Create a new account'}  
    color="green"
/>
<Form error={Boolean(error)} loading={loading} onSubmit={onSubmit} >
    <Message 
        error
        header="Oops!"
        content={error}
    />
    <Segment>
        <Form.Input 
            fluid
            icon="user"
            iconPosition="left"
            label={t.name}
            // placeholder={t.name}
            name="name"
            value={user.name}
            onChange={handleChange}
        />
        <Form.Input 
            fluid
            icon="envelope"
            iconPosition="left"
           
            label={t.email}
            // placeholder={t.email}
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
        />
        <Form.Input 
        className="   !font-estedad"
            fluid
            icon="lock"
            iconPosition="left"
            label={t.pass}
            // placeholder={t.password}
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
        />
        <Button 
        className=" !font-estedad"
            // icon="signup"
            type="submit"
            content=  {t.send}
            color="green"
            disabled={disabled || loading}
        />
    </Segment>
</Form>
<Message attached="bottom" warning>
    <Icon name="help" />
    {t.no_account}
    {/* Existing user? */}
    <Link legacyBehavior href="/auth/login">
        <a>Login here</a>
    </Link>
</Message>
</div>

  );
}

function HaveAccount(text:any) {
  console.log("TEXT" ,text)
  return (
    <Link href="/auth/login" >
      <Typography
        component={"span"}
        align="center"
        color={"primary"}
        variant="body2"
      >
       {text.text}
      </Typography>
    </Link>
  );
}
