import React from "react";
import { css } from "glamor";

const rotate = {
  right: -45,
  left: 135,
  up: -135,
  down: 45
};
const baseArrow = position =>
  css({
    position: "absolute",
    border: "solid black",
    borderWidth: "0 1px 1px 0",
    display: "inline-block",
    padding: 5,
    bottom: position === "down" ? 7 : 0,
    transform: `rotate(${rotate[position]}deg)`
  });

const Arrow = ({ position }) => <i {...css(baseArrow(position))} />;

export default Arrow;
