"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeManifest = exports.addChunk = exports.mapDependencies = exports.addEntry = exports.mapToObject = exports.chunksMap = exports.entriesMap = void 0;
exports.entriesMap = new Map();
exports.chunksMap = new Map();
const mapToObject = (map) => Array.from(map.entries())
    .reduce((obj, [k, v]) => {
    obj[String(k)] = v;
    return obj;
}, {});
exports.mapToObject = mapToObject;
function addEntry({ name, chunks }) {
    if (exports.entriesMap.has(name)) {
        return;
    }
    exports.entriesMap.set(name, {
        deps: mapDependencies(name, chunks),
    });
}
exports.addEntry = addEntry;
function mapDependencies(name, chunks) {
    return chunks
        .filter(chunk => {
        addChunk(chunk);
        return chunk.name !== name;
    })
        .filter(chunk => chunk)
        .map(c => c.name || c.id + '');
}
exports.mapDependencies = mapDependencies;
function addChunk({ id, name, hash, files }) {
    // Although the type definitions say that name is a string, we have experienced that some dynamically generated
    // chunks will have a name of undefined, but have a valid id, so we will try to use the name, but fallback to id
    // here to make sure, we always have a valid name.
    const chunkName = name || id;
    if (exports.chunksMap.has(chunkName)) {
        return;
    }
    const fileIterator = files.values();
    const firstFile = fileIterator.next();
    exports.chunksMap.set(chunkName, {
        file: firstFile.value,
        hash,
    });
}
exports.addChunk = addChunk;
function makeManifest(comp) {
    comp.chunkGroups.forEach(group => addEntry(group));
    return {
        chunks: exports.mapToObject(exports.chunksMap),
        entries: exports.mapToObject(exports.entriesMap),
    };
}
exports.makeManifest = makeManifest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstbWFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NodW5rLW1hcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFTYSxRQUFBLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLFFBQUEsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFFNUIsTUFBTSxXQUFXLEdBQUcsQ0FBSSxHQUFrQixFQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNsRixNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLEVBQUUsRUFBRTtJQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBSkUsUUFBQSxXQUFXLGVBSWI7QUFFWCxTQUFnQixRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFjO0lBQ2pELElBQUksa0JBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdEIsT0FBTztLQUNWO0lBQ0Qsa0JBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO1FBQ2pCLElBQUksRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztLQUN0QyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBUEQsNEJBT0M7QUFFRCxTQUFnQixlQUFlLENBQUMsSUFBWSxFQUFFLE1BQWU7SUFDekQsT0FBTyxNQUFNO1NBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ1osUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hCLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUM7SUFDL0IsQ0FBQyxDQUFDO1NBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1NBQ3RCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBUkQsMENBUUM7QUFFRCxTQUFnQixRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQVM7SUFDckQsK0dBQStHO0lBQy9HLGdIQUFnSDtJQUNoSCxrREFBa0Q7SUFDbEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUU3QixJQUFJLGlCQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzFCLE9BQU87S0FDVjtJQUVELE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNwQyxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFdEMsaUJBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO1FBQ3JCLElBQUksRUFBRSxTQUFTLENBQUMsS0FBSztRQUNyQixJQUFJO0tBQ1AsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWpCRCw0QkFpQkM7QUFFRCxTQUFnQixZQUFZLENBQUMsSUFBaUI7SUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNuRCxPQUFPO1FBQ0gsTUFBTSxFQUFFLG1CQUFXLENBQVMsaUJBQVMsQ0FBQztRQUN0QyxPQUFPLEVBQUUsbUJBQVcsQ0FBVSxrQkFBVSxDQUFDO0tBQzVDLENBQUM7QUFDTixDQUFDO0FBTkQsb0NBTUMifQ==