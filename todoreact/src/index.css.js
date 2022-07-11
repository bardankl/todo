import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root {
  --primary-color: #623cea;
  --white-color: #fff;
  --finished-color: #44bba4;
  --border-radius: 0.3rem;
}

* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

#root {
  width: 100%;
  display:flex;
  justify-content:center;
}

  button {
  cursor: pointer;
}

`;
