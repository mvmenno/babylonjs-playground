export class Base{
    protected _canvas: HTMLCanvasElement;
    protected _engine: BABYLON.Engine;
    public _scene: BABYLON.Scene;
    protected _camera: BABYLON.FollowCamera;
    protected _light: BABYLON.Light;
    protected _sphere: BABYLON.Mesh;
    protected _sphereParticle: BABYLON.GPUParticleSystem;
    protected _sphereParticleMesh : BABYLON.Mesh
    protected _ground: BABYLON.Mesh;
    protected anim_reversed : boolean;
    protected inputMap;
    protected direction : BABYLON.Vector3;
    protected worldsize : Array<number> = [40,40];
    protected isJumping : boolean = false;
    protected maxBoostFrames : number = 50;
    protected currentBoostFrame : number = 1;
    
    constructor() {
        let canvasElement = 'renderCanvas';
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene = new BABYLON.Scene(this._engine);
        this.direction = new BABYLON.Vector3(0,0,0);
     //   let inp = new InputController();
        
       // inp.registerInput();
    }
    callFunc(){
        
    }
}