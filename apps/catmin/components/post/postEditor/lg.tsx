import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import LinkTool from '@editorjs/link';
// import RawTool from '@editorjs/raw';
// import SimpleImage from '@editorjs/simple-image';
import ImageTool from '@editorjs/image';
import Checklist from '@editorjs/checklist';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import CodeTool from '@editorjs/code';
import { StyleInlineTool } from 'editorjs-style';
import Tooltip from 'editorjs-tooltip';
import CodeBox from '@bomdi/codebox';
import _ from 'lodash.debounce';

const defaultData = () => {
    return {
        "time": new Date().getTime(),
        "blocks": [
            {
                "type": "paragraph",
                "data": {
                    "text": "Start writing here !!!",
                    "level": 1
                }
            },
        ]
    }
}

const holderId = 'ejs';

const Editor = ({ setContent, content }: { setContent: React.Dispatch<React.SetStateAction<string>>, content: string }) => {
    
    const isInstance = useRef<EditorJS|null>(null);

    useEffect(() => {
        if (!isInstance.current) {
            initEditor();	
            console.log(isInstance.current)		
        }
        return () => {
            if(isInstance.current){
                isInstance.current.destroy()
                isInstance.current = null;
            }
        }
    }, []);

    const initEditor = () => {
        const editor = new EditorJS({
            holder: holderId,
            onReady: () => {
                isInstance.current = editor;
            },
            onChange: _(function() {
                try{
                    contents()
                }catch(err){
                    
                }
            },3000),
            autofocus: true,
            tools:{
                style: StyleInlineTool,
                tooltip: {
                    class: Tooltip,
                    config: {
                        location: 'left',
                        highlightColor: '#FFEFD5',
                        underline: true,
                        backgroundColor: '#154360',
                        textColor: '#FDFEFE',
                        holder: 'editorId',
                    }
                },
                header: {
                    class: Header,
                    inlineToolbar: true,
                    config: {
                        defaultLevel: 1
                    }
                },
                // raw: RawTool,
                linkTool: LinkTool,
                // image:{
                //   class:ImageTool,
                //   config: {
                //     uploader: {
                //      async uploadByFile(file:File){
                //         return onFileChange(file).then((imageUrl)=>{
                //           return {
                //           success:1,
                //           file:{
                //             url:imageUrl
                //           }
                //           }
                //         }
                //         )
                //       }
                //     }
                //   }
                // },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    }
                },
                quote: {
                    class: Quote,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+O',
                    config: {
                        quotePlaceholder: 'Enter a quote',
                        captionPlaceholder: 'Quote\'s author',
                    },
                },
                code: {
                    class: CodeTool,
                    inlineToolbar: true,
                },
                codebox: {
                    class: CodeBox,
                    config: {
                        themeURL: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/gruvbox-dark.min.css', // Optional
                        useDefaultTheme: 'dark' // Optional. This also determines the background color of the language select drop-down
                    }
                }
            }
        });     
        async function contents(){
            const output = await editor.save()
            const content = JSON.stringify(output)
            setContent(content);
        }
    };
    
    
    return (
        <>
            <div className='Editor_class' >
                <div id={holderId}></div>
            </div>
        </>
    )
};
    
export default Editor;