import getAllBars from "../API/getAllBars.js";
import makeProcessedDataStructure from "./makeProcessedDataStructure.js";
import makeRawDataStructure from "./makeRawDataStructure.js";

await makeRawDataStructure()
makeProcessedDataStructure()
await getAllBars()