import { useState, useEffect } from "react";
import axios from "axios";

function Gameplay(props: any) {
  //Interfaces
  interface Country {
    name: {
      common: string;
    };
  }
  interface Option {
    name: {
      common: string;
    };
  }
  // useState
  const [countries, setCountries] = useState<Country[]>([]);
  const [correctOption, setCorrectOption] = useState<Option>({} as Option);
  const [flagImage, setFlagImage] = useState("");
  const [points, setPoints] = useState(0);
  const [flagsShowed, setFlagsShowed] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Variables
  let region: string = props.region;
  const goodAnswer = points + 1;
  const badAnswer = points + 0.001;
  // Fetching Api
  const fetchData = async () => {
    try {
      let apiUrl = "https://restcountries.com/v3.1/all";
      if (region !== "World") {
        apiUrl = `https://restcountries.com/v3.1/region/${region.toLowerCase()}`;
      }

      const response = await axios.get(apiUrl);
      const data = response.data;

      // Checking if data is an array and has at least one country
      if (Array.isArray(data) && data.length > 0) {
        return data;
      } else {
        console.error("Invalid data format or no countries found.");
        return null;
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      return null;
    }
  };
  // Fetching Api End

  // Random Int
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  // Setting Data
  async function setResultsOfData() {
    let arrOfFlags = await fetchData();
    let randomIds = [];
    let countries: any = [];
    let randomNumber: number;

    // Function to get a unique random number
    const getUniqueRandomNumber = (max: number, exclude: number[]) => {
      let randomNum;
      do {
        randomNum = getRandomInt(max);
      } while (exclude.includes(randomNum));
      return randomNum;
    };

    // Pushing Ids of our countries
    for (let x = 0; x < 3; x++) {
      if (region === "World") {
        randomNumber = getUniqueRandomNumber(247, randomIds);
      } else if (region === "Europe") {
        randomNumber = getUniqueRandomNumber(50, randomIds);
      } else if (region === "Africa") {
        randomNumber = getUniqueRandomNumber(55, randomIds);
      } else {
        randomNumber = getUniqueRandomNumber(52, randomIds);
      }
      randomIds.push(randomNumber);
    }

    // Pushing objects with Ids from randomIds
    if (arrOfFlags) {
      for (let y = 0; y < randomIds.length; y++) {
        countries.push(arrOfFlags[randomIds[y]]);
      }
    } else {
      console.error("arrOfFlags is null or undefined.");
    }

    let correctOpt = countries[getRandomInt(3)];

    setCountries(countries); // Our 3 countries
    setCorrectOption(correctOpt); // Our Correct Option
    setFlagImage(correctOpt.flags.svg); // Our flag image
  }

  // Calling function
  useEffect(() => {
    setResultsOfData();
    setSelectedAnswer(null);
  }, [points]);

  if (flagsShowed < 11) {
    return (
      <>
        <div className="h-screen grid place-content-center">
          {/*Flag Image*/}
          <img
            src={flagImage}
            alt="Flag Image"
            className="w-[48rem] h-[27rem] drop-shadow-md rounded-md"
          />
          {/*Answers*/}
          <div className="flex justify-evenly mt-4 ">
            {countries.map((country: Option, index: any) => {
              const isCorrectAnswer =
                country.name.common === correctOption.name.common;
              const isSelected = selectedAnswer === index;
              return (
                <button
                  onClick={() => {
                    if (isCorrectAnswer) {
                      setTimeout(() => {
                        setPoints(goodAnswer);
                        setFlagsShowed(flagsShowed + 1);
                      }, 800);
                    } else {
                      setTimeout(() => {
                        setPoints(badAnswer);
                        setFlagsShowed(flagsShowed + 1);
                      }, 800);
                    }

                    // Set the selected answer index
                    setSelectedAnswer(index);
                  }}
                  className={`p-2 m-4 h-[3rem] w-[14rem] border-2 rounded-md font-nunito truncate bg-white ${
                    isSelected && isCorrectAnswer
                      ? "bg-gradient-to-r from-green-400 via-green-300 to-green-200 border-green-400"
                      : isSelected
                      ? "bg-gradient-to-r from-red-500 via-red-400 to-red-300 border-red-500"
                      : "border-gray-400 text-gray-400"
                  }`}
                  key={country.name.common}
                >
                  {country.name.common}
                </button>
              );
            })}
          </div>
          {/*Answers End*/}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="h-screen grid place-content-center">
          <div className="flex">
            <button
              onClick={() => window.location.reload()}
              className="text-white m-[.45rem] w-[14rem] h-[3rem] rounded-md font-nunito text-lg transition ease-in-out duration-300 hover:drop-shadow-md bg-gradient-to-r from-green-400 to-blue-500"
            >
              One more
            </button>
            <p className="cursor-default text-[2rem] m-2 font-nunito text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 hover:drop-shadow-md">
              You've guessed {(Math.floor(points) * 100) / 10}% of showed flags!
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Gameplay;
