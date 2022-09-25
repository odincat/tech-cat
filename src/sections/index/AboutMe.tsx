import { NextComponent } from "@lib/types";
import { FaBirthdayCake, FaCat, FaDocker, FaPizzaSlice } from "react-icons/fa";

const FactCard: NextComponent<{ description: string | JSX.Element; fact: string | JSX.Element; }> = ({ description, fact }) => <div className="flex flex-col py-2">
    <b className="text-2xl">{fact}</b>
    <span>{description}</span>
</div>;

const FactContainer = 'w-max min-w-[50px] px-5 py-3 rounded-md shadow-lg m-auto';

export const AboutMe = () => {
    return (
        <div className="m-auto mt-10 w-[75%]">
            <h2 className="font-[Neucha]">Hi there! 👋</h2>
            <img src='/img-22.jpeg' alt="Photo of me" className="rounded-[50%] w-[300px] h-[300px] object-cover object-top m-auto my-10 shadow-md"></img>
            <p className="md:max-w-[40%] max-w-[90%] m-auto dark:border-white border-2 p-5 rounded-md">
                My name is <b>Florian</b> and I&apos;m some dude from Germany (Hamburg) that is really interested in computers and tech in general. Here are some <i>Facts</i> about me so that you can get to know me a little better:
            </p>
            <div className="grid grid-cols-auto">
                <div className="mt-10">
                    <h3>Personal</h3>
                    <div className={`bg-blue-500 ${FactContainer}`}>
                        <FactCard description='Age' fact={<div className="flex flex-col items-center"><FaBirthdayCake className="block" /> 16</div>} />
                        <hr></hr>
                        <FactCard description='hobby / sport' fact='Badminton' />
                        <hr></hr>
                        <FactCard description='favorite food' fact={<div className="flex flex-col items-center"><FaPizzaSlice className="block" /> (Pepperoni-) Pizza</div>} />
                        <hr></hr> 
                        <FactCard description='favorite colors' fact={<><span className="text-green-300">Green</span> / <span className="text-blue-200">Blue</span></>} />
                        <hr></hr>
                        <FactCard description='favorite animal' fact={<div className="flex flex-col items-center"><FaCat className="block" /> Cat</div>} />
                        <a className="text-white underline">Cute cat pictures</a> 
                    </div>
                </div>

                <div className="mt-10">
                    <h3>Tech related</h3>
                    <div className={`bg-green-500 ${FactContainer}`}>
                        <FactCard description='favorite language' fact={<div className="flex flex-col items-center"><img src="/typescript.png" alt="Typescript logo" className="block max-w-[1em]"/> Typescript</div>} />
                        <hr></hr>
                        <FactCard description='language I want to get good at' fact={<div className="flex flex-col items-center"><img src="/rust.png" alt="Rust logo" className="block max-w-[1em]"/> Rust</div>} />
                        <hr></hr>
                        <FactCard description='operating system' fact={<div className="flex flex-col items-center"><img src="/arch.png" alt="Arch Linux logArch Linux logo" className="block max-w-[1em]"/> Arch Linux (btw!)</div>} /> 
                        <hr></hr>
                        <FactCard description='favorite tool' fact={<div className="flex flex-col items-center"><FaDocker className="block" /> Docker</div>} />
                        <a className="text-white underline">Check out my setup</a> 
                    </div>
                </div>
            </div>
        </div>
    );
}