import { SpinnerContainer } from "./SpinnerContainer";

function LoadingScreen() {
  return (
    <SpinnerContainer
      containerProps={{
        className: "fixed inset-0 z-[999]  bg-slate-950/50",
      }}
      spinnerProps={{ className: "size-32" }}
    />
  );
}

export default LoadingScreen;
