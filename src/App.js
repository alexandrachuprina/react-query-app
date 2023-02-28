import React from "react";
import NewsAPI from "./components/NewsAPI";
// import anime from "animejs";

function App() {
  // const animationRef = useRef(null);
  // const [time, setTime] = useState(0)

  // useEffect(() => {
  //   animationRef.current = anime({
  //     targets: ".grid",

  //   })
  // }, [time])

  return (
    <>
      <NewsAPI />
    </>
  );
}

export default App;
