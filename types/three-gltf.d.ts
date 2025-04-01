declare module 'three/examples/jsm/loaders/GLTFLoader' {
    export class GLTFLoader {
        load(url: string, onLoad: (gltf: any) => void, onProgress?: (event: ProgressEvent) => void, onError?: (error: ErrorEvent) => void): void;
        parse(data: ArrayBuffer | string, path: string, onLoad: (gltf: any) => void, onError?: (error: ErrorEvent) => void): void;
    }
}