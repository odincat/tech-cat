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
      <h1 className="text-center mt-4">Überschrift 1. Ordnung</h1>
      <h2 className="text-center mt-4">Überschrift 2. Ordnung</h2>
      <h3 className="text-center mt-4">Überschrift 3. Ordnung</h3>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae inventore ipsum neque nemo a deserunt sed, voluptas laudantium nulla quos fugit quibusdam dolorem in est aperiam officiis quo nihil placeat.
      </p>
      <a href='/tests'>dasdasd</a>
      <SignIn />
      {user?.displayName}
      <Button />
    </div>
  )
};

export default Home;