"use client";
import { generalAnimationIntersectionObserverCB } from "./index";
import { useInitGeneralAnimationIntersectionObserver } from "./hooks";

export const UseInitGeneralAnimationIntersectionObserver = (props: {
  callback?: IntersectionObserverCallback;
  options?: IntersectionObserverInit | undefined;
}) => {
  useInitGeneralAnimationIntersectionObserver(
    props.callback ?? generalAnimationIntersectionObserverCB,
    props.options,
  );

  return null;
};