import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

export class Game {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.FollowCamera;
    private _light: BABYLON.Light;
    private _sphere: BABYLON.Mesh;
    private _sphereParticle: BABYLON.GPUParticleSystem;
    private _sphereParticleMesh : BABYLON.Mesh
    private _ground: BABYLON.Mesh;
    private anim_reversed : boolean;
    private inputMap : ['w','a','s','d'];
    private direction : BABYLON.Vector3;
    private worldsize : Array<number> = [50,50];
    private isJumping : boolean = false;
    private maxBoostFrames : number = 50;
    private currentBoostFrame : number = 1;
      
    constructor(canvasElement: string) {
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
        this.direction = new BABYLON.Vector3(0,0,0);
    }
    /**
     * Creates the BABYLONJS Scene
     */
    createScene(): void {
        
        this._scene = new BABYLON.Scene(this._engine);
        
        this._scene.clearColor = new BABYLON.Color4(0.9,0.95,1);
        
        var skybox = BABYLON.Mesh.CreateBox("skybox", 100.0 * this.worldsize[0], this._scene);

        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this._scene);
        skyboxMaterial.backFaceCulling = false;

        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/texture/skybox/mars/mars", this._scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        
        skybox.material = skyboxMaterial;
        
        var camera = new BABYLON.FollowCamera('followCam', new BABYLON.Vector3(0,5,-20),this._scene);
        camera.heightOffset = 8; //how high up from the object to place the camera
        camera.radius = 30; // how far from the object to follow
        camera.rotationOffset = 180;
        
        this._camera = camera;
        
        this._scene.activeCamera = this._camera;
        
        this._camera.attachControl(this._canvas);
        
        this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);
        
        // Default intensity is 1. Let's dim the light a small amount
        this._light.intensity = 0.7;
        
        this._light.diffuse = new BABYLON.Color3(0.9,0.8,0.8);

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        this._sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, this._scene);
        
        
        this.createParticleSystem();
        this._camera.lockedTarget = this._sphere;
        
        var mat = new BABYLON.StandardMaterial("material", this._scene);
        mat.diffuseTexture = new BABYLON.Texture("assets/texture/marble.jpg",this._scene);
        
        mat.diffuseColor = new BABYLON.Color3(1,1,1);
      //  mat.alpha = 0.5;
        
        this._sphere.material = mat;
        

        // Move the sphere upward 1/2 its height
        this._sphere.position.y = 1;
       
        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        const ground = BABYLON.Mesh.CreateGround("ground1", this.worldsize[0], this.worldsize[1], 2, this._scene);
        
        var mat_ground = new BABYLON.StandardMaterial("material", this._scene);
        
        mat_ground.diffuseTexture = new BABYLON.Texture("assets/texture/mars.jpg",this._scene);
        
        
        ground.material = mat_ground;
        
        
        this._ground = ground;
        
        this._scene.actionManager = new BABYLON.ActionManager(this._scene);
        
        var inputMap = {};
        this._scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
             inputMap["spacebar"] = evt.sourceEvent.which == 32;								
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        
        this._scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {	
           inputMap["spacebar"] = evt.sourceEvent.which == 32;
            				
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        this._scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function (evt) {								
        }));
        
        this._scene.onBeforeRenderObservable.add(() => {
            if(inputMap["w"] || inputMap["ArrowUp"]){
                console.log('W!');
                this.playerController(new BABYLON.Vector3(0,0,1));
            } 
            if(inputMap["a"] || inputMap["ArrowLeft"]){
                console.log('A!');
                this.playerController(new BABYLON.Vector3(-1,0,0));
            } 
            if(inputMap["s"] || inputMap["ArrowDown"]){
                console.log('S!');
                this.playerController(new BABYLON.Vector3(0,0,-1));
            } 
            if(inputMap["d"] || inputMap["ArrowRight"]){
                console.log('D!');
                this.playerController(new BABYLON.Vector3(1,0,0));
            }   
            if(inputMap["z"]){
                this.direction = new BABYLON.Vector3(0,0,0);
                this.playerController(new BABYLON.Vector3(0,0,0));
            }   
            if(inputMap["spacebar"]){
                console.log( 'space!' );
                this.isJumping = true;
                inputMap["spacebar"] = false;
                this.playerController(new BABYLON.Vector3(0,1,0));
                
            }
        });
    }
    createParticleSystem() :void{
        var fountain = BABYLON.Mesh.CreateBox("foutain", 0.1, this._scene);
        fountain.visibility = 0.1;
        this._sphereParticleMesh = fountain;       
        var particleSystem = new BABYLON.GPUParticleSystem("particles",{capacity : 10000},this._scene);
        particleSystem.emitRate = 1000;
        particleSystem.particleEmitterType = new BABYLON.SphereParticleEmitter(1);
        particleSystem.particleTexture = new BABYLON.Texture("/textures/flare.png", this._scene);
        particleSystem.maxLifeTime = 2;
        particleSystem.minSize = 0.01;
        particleSystem.maxSize = 0.4;
        particleSystem.emitter = fountain;
        particleSystem.start();
        
        this._sphereParticle = particleSystem;
    }
    
    
    playerController(position) : void{
        let speed = 0.005;
        
        
        position.x = position.x * speed;
      //  position.y = position.y * speed_jump;
        position.z = position.z * speed;
        
        
        this.direction.x += position.x;
    //    this.direction.y += position.y;
        this.direction.z += position.z;
        
        /*
        this._sphere.position.x += position.x * speed;
        this._sphere.position.z += position.z * speed;
        */
        
    }

    init(): void{
        this._scene.registerBeforeRender(() => {
          //  console.log(this._engine.getFps());
           // let deltaTime: number = (1 / this._engine.getFps() / 10);
            this.update();
        });
    }
    isOutOfBounds() : boolean{
        
        if (this._sphere.position.x >= (this.worldsize[0] / 2)){
            this.direction.x = this.direction.x - 0.1;
            return true;
        } else if (this._sphere.position.x <= -(this.worldsize[0] / 2)){
            this.direction.x = this.direction.x + 0.1;
            return true;
        }
        if (this._sphere.position.z >= (this.worldsize[1] / 2)){
            this.direction.z = this.direction.z - 0.1;
            return true;
        } else if (this._sphere.position.z <= -(this.worldsize[1] / 2)){
            this.direction.z = this.direction.z + 0.1;
            return true;
        }     
        
        return false;
    }
    
    easeInOut(t): number{
        return t<.5 ? 2*t*t : -1+(4-2*t)*t
    }
    
    
    
    
    update(): void{
        
        let deltaTime = this._engine.getDeltaTime();
        let speed = 0.001;
        let drag = 0.01;
        let gravity = 0.1;
        
        
        let max_speed = 1;
        
        this._sphere.position.x += this.direction.x;
        
        this._sphere.position.z += this.direction.z;
        
        this.direction.x = this.direction.x / (1 + drag);
        this.direction.z = this.direction.z / (1 + drag);
        this._sphereParticleMesh.position = this._sphere.position;
        
        
        let speed_jump = 0.2;
        
        if (this.isJumping){
            console.log('isJumping!');
            if (this.currentBoostFrame < this.maxBoostFrames){
                
                let ease_jump = this.easeInOut((this.currentBoostFrame / this.maxBoostFrames));
                console.log(ease_jump);
                
                this._sphere.position.y += speed_jump + (speed_jump * ease_jump);
            }
            this.currentBoostFrame ++;
        }else{
            this.currentBoostFrame = 1;
        }
        
        if (this._sphere.position.y <= 1){
            this.isJumping = false;
            this._sphere.position.y = 1;
        }else{
            this._sphere.position.y -= gravity;
        }
        
        
        
            /*
            
            if(this._sphere.position.y <= 1){
                this.isJumping = false;
            }else{
                
            
            }
        */
        
        
        if(this.direction.y > 0){
            this.isJumping = true;
        }
        if (this.isJumping){
            
        }else{
            
        }
        
        this._sphere.rotation.x += -(this.direction.z);
        this._sphere.rotation.z += (this.direction.x);

        this.isOutOfBounds();
        
        
        if(this._sphere.position.y > 1.4){
            this.anim_reversed = true;
        }else{
            if (this._sphere.position.y <=1){
                this.anim_reversed = false;
            }
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