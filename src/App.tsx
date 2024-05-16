import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  justify-content: center;
  align-items: center;
`;
const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  background: #ff7979;
  border-radius: 50%;
`;
const Overlay = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
`;
const SwitchBtn = styled.button``;

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);
  const [tap, setTap] = useState(false);
  const [id, setId] = useState<null | string>(null);
  const toggleTapped = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setTap((prev) => !prev);
    const { currentTarget } = event;
    setId(currentTarget.dataset.id as string);
  };
  const variant = {
    hover: (custom: number) => ({
      scale: custom,
      transition: { delay: custom * 0.2 },
    }),
  };
  return (
    <Wrapper>
      <GridContainer>
        <Box
          style={{ originX: 1.2, originY: 1.2 }}
          custom={1.2}
          whileHover='hover'
          variants={variant}
          onClick={toggleTapped}
          layoutId='1'
          data-id='1'
        />
        <Box>{clicked ? <Circle layoutId='circle' /> : null}</Box>
        <Box>{!clicked ? <Circle layoutId='circle' /> : null}</Box>
        <Box
          style={{ originX: -0.1, originY: -0.1 }}
          custom={1.2}
          whileHover='hover'
          variants={variant}
          onClick={toggleTapped}
          layoutId='2'
          data-id='2'
        />
      </GridContainer>
      <SwitchBtn onClick={toggleClicked}>switch</SwitchBtn>
      <AnimatePresence>
        {tap ? (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Box
              onClick={toggleTapped}
              layoutId={id ? id : ""}
              style={{ background: "white" }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
