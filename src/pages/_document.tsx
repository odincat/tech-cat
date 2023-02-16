import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from '@stitches';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel='shortcut icon' href='/favicon.png' />
                    <style
                        id='stitches'
                        dangerouslySetInnerHTML={{ __html: getCssText() }}
                    />
                    <meta name='darkreader' content='NO-DARKREADER-PLUGIN' />
                </Head>
                <body>
                    <script
                        key='tech-cat-theme-setter'
                        dangerouslySetInnerHTML={{
                            __html: `
                        function setTheme() {
                            const getStoredTheme = localStorage.getItem('theme');

                            if (!getStoredTheme) {
                                if (window.matchMedia('(prefers-color-scheme: dark)').matches || window.matchMedia('(prefers-color-scheme: no-preference)').matches) {
                                    document.body.dataset.theme = 'dark';
                                    localStorage.setItem('theme', 'dark');
                                    return;
                                } else {
                                    document.body.dataset.theme = 'light';
                                    localStorage.setItem('theme', 'light');
                                    return;
                                }
                            }

                            document.body.dataset.theme = getStoredTheme;
                        }
                        setTheme();
                    `,
                        }}></script>
                    <Main />
                    <NextScript />
                    <div id='hamburgerPortal'></div>
                    <div id='modalPortal'></div>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
