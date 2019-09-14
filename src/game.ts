import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

export class Game {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.FreeCamera;
    private _light: BABYLON.Light;
    private _sphere: BABYLON.Mesh;
    private anim_reversed : boolean;
    
    constructor(canvasElement: string) {
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }
    /**
     * Creates the BABYLONJS Scene
     */
    createScene(): void {
        
        this._scene = new BABYLON.Scene(this._engine);
        
        this._scene.clearColor = new BABYLON.Color4(0.9,0.95,1);
        
        this._camera = new BABYLON.FreeCamera('mainCam', new BABYLON.Vector3(0,5,-10),this._scene);
        
        this._camera.setTarget(BABYLON.Vector3.Zero());
        this._camera.attachControl(this._canvas, true);
        this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);
        
        // Default intensity is 1. Let's dim the light a small amount
        this._light.intensity = 0.7;

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        this._sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, this._scene);
        
        var mat = new BABYLON.StandardMaterial("material", this._scene);
        mat.diffuseTexture = new BABYLON.Texture("assets/texture/nflag.jpg",this._scene);
        
        mat.diffuseColor = new BABYLON.Color3(1,1,1);
      //  mat.alpha = 0.5;
        
        this._sphere.material = mat;
        

        // Move the sphere upward 1/2 its height
        this._sphere.position.y = 1;
       
        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        const ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, this._scene);
        
    }

    init(): void{
        console.log('update!');
        this._scene.registerBeforeRender(() => {
          //  console.log(this._engine.getFps());
           // let deltaTime: number = (1 / this._engine.getFps() / 10);
            this.update();
        });
    }
    update(): void{
        let deltaTime = this._engine.getDeltaTime();
        let speed = 0.001;
        
        this._sphere.rotation.x += speed *deltaTime;         
        this._sphere.rotation.z += (speed * 2) *deltaTime; 
      //  this._sphere.position.x += 1 *deltaTime;
        
        if(this._sphere.position.y > 1.4){
            this.anim_reversed = true;
        }else{
            if (this._sphere.position.y <=1){
                this.anim_reversed = false;
            }
        }
        
        
        if(!this.anim_reversed){
            
            this._sphere.position.y += (speed * deltaTime);
            
            
        }else{
            this._sphere.position.y -= (speed * deltaTime);
        }
        
        
        
        
        
    }

    /**
     * Starts the animation loop.
     */
    render(): void {
        this._engine.runRenderLoop(() =>{
            this._scene.render();
        });
    }
}