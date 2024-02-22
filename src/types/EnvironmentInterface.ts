import M from "matter-js";

export default interface EnvironmentInterface {
    engine: M.Engine,
    setEngine: React.Dispatch<React.SetStateAction<M.Engine>>,
    render: M.Render,
    setRender: React.Dispatch<React.SetStateAction<M.Render>>,
    runner: M.Runner,
    setRunner: React.Dispatch<React.SetStateAction<M.Runner>>,
}