import styled, { keyframes } from "styled-components";

const bounce = keyframes`
   0% {
    -webkit-transform: translateY(-500px);
            transform: translateY(-500px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    -webkit-transform: translateY(-65px);
            transform: translateY(-65px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: translateY(-28px);
            transform: translateY(-28px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  90% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #0c0b0be0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  
`;
const Wrapper = styled.div`
  width: 450px;
  height: 250px;
  background: #afacac;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 19px;
  border-radius: 5px;
  animation-name: ${bounce};
  animation-duration: 1.1s;
  animation-fill-mode: both;
  transition: all 1s ease-in-out;
  @media only screen and (max-width: 600px) {
    width: 250px;
  }
`;

const Message = styled.p`
  color: black;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  transition: all 1s ease-in-out;
  @media only screen and (max-width: 600px) {
    font-size: 40px;
  }
`;
const Button = styled.button`
  font-size: 22px;
  font-family: sans-serif;
  font-weight: 700;
  outline: none;
  transition: all 1s ease-in-out;
  @media only screen and (max-width: 600px) {
    font-size: 20px;
  }
`;

type GameModalPropTypes = {
  message: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const GameModal = (props: GameModalPropTypes) => {
  return (
    <Container>
      <Wrapper>
        <Message>{props.message}</Message>
        <Button onClick={() => props.setShowModal(false)}>Restart</Button>
      </Wrapper>
    </Container>
  );
};

export default GameModal;
