import rfs from "rotating-file-stream";
import path from "path";

const logsDir = path.resolve(process.cwd(), "logs")
const logs = rfs.createStream("access.log", {
    interval: "1day",
    path: logsDir,
});

export { logs };