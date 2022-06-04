import SignIn from '@components/backend/SignIn';
import MetatagConfig from '@components/MetatagManager';
import { UserContext } from '@lib/context';
import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';

const Home: NextPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <MetatagConfig defaultTitleFormat={true} title="Home" />
      <h1>Hi there!</h1>
      <h2>I&apos;m Florian</h2>
      <SignIn />
    </div>
  )
};

export default Home;