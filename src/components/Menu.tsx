function Menu(props: any) {
  const buttonStyles =
    "m-[.45rem] w-[14rem] h-[3rem] rounded-md font-nunito text-lg transition ease-in-out duration-300 hover:drop-shadow-md hover:border-2 ";

  return (
    <>
      <div className="h-screen grid place-content-center">
        <button
          className={`${buttonStyles} text-purple-400 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 hover:border-purple-600`}
          onClick={props.onClick}
          value="World"
        >
          World
        </button>
        <button
          className={`${buttonStyles} text-green-500 bg-gradient-to-r from-green-800 via-green-700 to-green-500 hover:border-green-800`}
          onClick={props.onClick}
          value="Europe"
        >
          Europe
        </button>
        <button
          className={`${buttonStyles} text-yellow-300 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 hover:border-yellow-200`}
          onClick={props.onClick}
          value="Africa"
        >
          Africa
        </button>
        <button
          className={`${buttonStyles} text-blue-400 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 hover:border-blue-700`}
          onClick={props.onClick}
          value="America"
        >
          America
        </button>
      </div>
    </>
  );
}

export default Menu;
