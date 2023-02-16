import MetatagConfig from '@components/MetatagManager';
import { Shell } from '@components/Shell';
import { createDictionary, useTranslation } from '@locales/utils';
import type { NextPage } from 'next';

const newPostDictionary = createDictionary({
    pageTitle: {
        de: 'Erstelle einen neuen Beitrag',
        en: 'Create a new post'
    },

});

const New: NextPage = () => {
  const { ts } = useTranslation();
  return (
      <Shell title={ts(newPostDictionary.pageTitle)}>
        <div className="bg-slate-500 w-[50px] h-10">
            
        </div> 
      </Shell>
  );
};

export default New;