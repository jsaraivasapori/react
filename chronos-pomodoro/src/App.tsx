import "./styles/theme.css";
import { Heading } from "./components/Heading";
import "./styles/global.css";
import { TimerIcon } from "lucide-react";
export function App() {
  return (
    <>
      <Heading>
        Olá mundo!
        <button>
          <TimerIcon />
        </button>
      </Heading>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis quos
        dolor qui quis ipsum veniam nesciunt, officiis asperiores dolores nisi!
        Necessitatibus, est asperiores impedit quia doloribus sapiente minus
        aut. Voluptatum!
      </p>
    </>
  );
}
