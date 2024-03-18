import { useCallback, useEffect, useRef, useState } from "react"

function App() {
 
  const [length , setLength] = useState(6);
  const [numPresent , setNumPresent] = useState(false);
  const [charPresent , setCharPresent] = useState(false);
  const [password , setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numPresent) str += "012334456789";
    if(charPresent) str += "!@#$%^&*()_+~"
    
    for(let i = 1; i <= length ; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char); // give random char from str.
    }
    setPassword(pass);

  } , [length , numPresent , charPresent , setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    //passwordRef.current?.setSelectionRange(0,20); (select only first 20 chars of password)
    window.navigator.clipboard.writeText(password);
  } , [ password])
  
  useEffect(() => {
    passwordGenerator();
  } , [length , numPresent , charPresent , passwordGenerator])
 
  return (
    <div className="bg-gray-700 w-full max-w-max px-6 mt-40 py-4 mx-auto 
    rounded-lg   overflow-hidden">
     <div className='font-semibold text-3xl mt-10 text-white text-center  '>Password Generator</div>

     <div className="mt-10 mb-4">

        <div className="flex my-4">

          <input 
            type="text"
            value={password}
            className="outline-none w-full py-1 px-4 rounded-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
            
          />

          <button className="bg-blue-600 shadow-2xl shadow-black text-white text-lg font-semibold px-2 rounded-lg
           ml-2 active:bg-blue-700 active:mr-1
          "
          onClick = {copyPassword}>Copy</button>

        </div>
    
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 ">
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label 
             className=" text-blue-500 font-semibold text-lg"> length: {length}
            </label>

          </div>

          <div>
            <input
              type="checkbox" 
              defaultChecked = {numPresent}
              id="numberInput"
              onChange={() => {
                setNumPresent((prev) => !prev);
              }}
            />
            <label 
            htmlFor="NumbersInput"
             className=" text-blue-500 font-semibold text-lg"> Numbers
            </label>
          </div>

          <div>
            <input
              type="checkbox" 
              defaultChecked = {charPresent}
              id="charInput"
              onChange={() => {
                setCharPresent((prev) => !prev);
              }}
            />
            <label 
            htmlFor="CharacterInput"
             className=" text-blue-500 font-semibold text-lg"> characters
            </label>
          </div>
        
        </div>
      </div>
    </ div>
  )
}

export default App
