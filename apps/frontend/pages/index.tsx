import SignIn from '@components/backend/SignIn';
import MetatagConfig from '@components/MetatagManager';
import { UserContext } from '@lib/context';
import { auth } from '@lib/firebase';
import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from "ui";

const Home: NextPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <MetatagConfig defaultTitleFormat={true} title="Home" />
      <h1>Hi there!</h1>
      <h2>I&apos;m Florian</h2>
    </div>
  )
};

export default Home;