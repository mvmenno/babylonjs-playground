import { Base } from './base';
export class Game extends Base{
    /* MOVE TO BASE */
    /* END MOVE */
    /**
     * Creates the BABYLONJS Scene
     */     
    protected _box;
    
    protected _player;
    
    protected _walls;
     
    constructor() {
        super();
    }
    
    
    createSceneObjects() : void{
        const ground = BABYLON.Mesh.CreateGround("ground1", this.worldsize[0], this.worldsize[1], 2, this._scene);
        
        var mat_ground = new BABYLON.StandardMaterial("material", this._scene);
        
        mat_ground.diffuseTexture = new BABYLON.Texture("assets/texture/ground.jpg",this._scene);
        ground.material = mat_ground;
        ground.checkCollisions = true;
        
        ground.rotation= new BABYLON.Vector3(0,0,0);
        
        this._ground = ground;
        
        var box = BABYLON.Mesh.CreateBox("crate", 2, this._scene);
        var mat_box = new BABYLON.StandardMaterial("Mat", this._scene);
        mat_box.diffuseTexture = new BABYLON.Texture("assets/texture/nflag.jpg", this._scene);
        mat_box.diffuseTexture.hasAlpha = true;
        box.position = new BABYLON.Vector3(10, 4, 1);
        box.scaling = new BABYLON.Vector3(5,5,5);
        box.checkCollisions = true;
        
        var wallheight = 5;
        
        
        var wall1 = BABYLON.Mesh.CreateBox("wall", 2, this._scene);
        wall1.scaling.y = wallheight;
        wall1.scaling.x = this.worldsize[1] / 2;
        wall1.checkCollisions = true;
        wall1.position = new BABYLON.Vector3(0,wallheight,this.worldsize[1] / 2);
        var wall2 = BABYLON.Mesh.CreateBox("wall", 2, this._scene);
        wall2.scaling.y = wallheight;
        wall2.scaling.z = this.worldsize[1] / 2;
        wall2.checkCollisions = true;
        wall2.position = new BABYLON.Vector3(this.worldsize[0]/2,wallheight,0);
        
        var wall3 = BABYLON.Mesh.CreateBox("wall", 2, this._scene);
        wall3.scaling.y = wallheight;
        wall3.scaling.z = this.worldsize[1] / 2;
        wall3.checkCollisions = true;
        wall3.position = new BABYLON.Vector3(-this.worldsize[0]/2,wallheight,0);
        
        var wall4 = BABYLON.Mesh.CreateBox("wall", 2, this._scene);
        wall4.scaling.y = wallheight;
        wall4.scaling.x = this.worldsize[1] / 2;
        wall4.checkCollisions = true;
        wall4.position = new BABYLON.Vector3(0,wallheight,-this.worldsize[1] / 2);
        
        var wallmat = new BABYLON.StandardMaterial("material", this._scene);
        wallmat.diffuseColor = new BABYLON.Color3(0,0.5,0.7);
        wallmat.alpha = 0.5;
        wall1.material = wallmat;
        wall2.material = wallmat;
        wall3.material = wallmat;
        wall4.material = wallmat;
        
        wall1.checkCollisions = true;
        wall2.checkCollisions = true;
        wall3.checkCollisions = true;
        wall4.checkCollisions = true;
        
        this._walls = [
            wall1,
            wall2,
            wall3,
            wall4
        ];
        
        box.material = mat_box;
        this._box = box;
    }
    initPhysics() : void{
        this._scene.enablePhysics(null, new BABYLON.CannonJSPlugin());
    
        var physicsEngine = this._scene.getPhysicsEngine();
        
        const gravity = -1.5;
        
        this._sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
        this._sphere, BABYLON.PhysicsImpostor.SphereImpostor, 
        { 
            mass: 20, friction: 100,restitution : 0.7
        }, this._scene);
        
        this._sphere.physicsImpostor.setDeltaRotation(new BABYLON.Quaternion(0,1,0,0));
        this._sphere.physicsImpostor.soft =true;
// , restitution: 0.3 
      //  this._sphere.physicsImpostor.
       // this._sphere.physicsImpostor.applyForce(new BABYLON.Vector3(0,10,0),new BABYLON.Vector3(0,0,0));
        
        this._ground.physicsImpostor = new BABYLON.PhysicsImpostor(this._ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this._scene);
        
        this._box.physicsImpostor = new BABYLON.PhysicsImpostor(this._box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this._scene);
        
        this._walls[0].physicsImpostor = new BABYLON.PhysicsImpostor(this._walls[0], BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this._scene);
        this._walls[1].physicsImpostor = new BABYLON.PhysicsImpostor(this._walls[1], BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this._scene);
        this._walls[2].physicsImpostor = new BABYLON.PhysicsImpostor(this._walls[2], BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this._scene);
        this._walls[3].physicsImpostor = new BABYLON.PhysicsImpostor(this._walls[3], BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this._scene);
        
        
        /*this._box.physicsImpostor = new BABYLON.PhysicsImpostor(this._ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this._scene);
        this._box.physicsImpostor = new BABYLON.PhysicsImpostor(this._ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this._scene);
        this._box.physicsImpostor = new BABYLON.PhysicsImpostor(this._ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this._scene);
        */
        
        var gx = physicsEngine.gravity.x;
        var gz = physicsEngine.gravity.z;
        physicsEngine.setGravity(new BABYLON.Vector3(gx, gravity, gz));       
        
        
    //    this._sphere.rotationQuaternion = null;
    
    }
    
    createScene(): void {
       // this._scene.clearColor = new BABYLON.Color4(0.9,0.95,1);
        
        this._scene.clearColor = new BABYLON.Color4(0.3,0.3,0.3);
       /* 
        var skybox = BABYLON.Mesh.CreateBox("skybox", 50000, this._scene);
        skybox.position = new BABYLON.Vector3(0,0,0);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this._scene);
        skyboxMaterial.backFaceCulling = false;

        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/texture/skybox/TropicalSunnyDay", this._scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        
        skybox.material = skyboxMaterial;
        */
        var camera = new BABYLON.FollowCamera('followCam', new BABYLON.Vector3(0,5,-20),this._scene);
         
      //  var camera = new BABYLON.FreeCamera('followCam', new BABYLON.Vector3(0,5,-20),this._scene);
        
        camera.heightOffset = 40; //how high up from the object to place the camera
        camera.radius = 25; // how far from the object to follow
        camera.rotationOffset = 100;
        
        this._camera = camera;
        
        this._scene.activeCamera = this._camera;
        this._camera.attachControl(this._canvas);
        
        
        this._player = BABYLON.Mesh.CreateBox("player",2,this._scene);
        
        this._player.visibility = 0;
 
     //   this._camera.attachControl(this._sphere);
        
        this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);
        
        // Default intensity is 1. Let's dim the light a small amount
        this._light.intensity = 0.1;
        
       // this._light.diffuse = new BABYLON.Color3(0.9,0.8,0.8);

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        this._sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, this._scene);
        
        
        
        this.createParticleSystem();
        
        this._camera.parent = this._player;
        this._camera.lockedTarget = this._player;
       // this._camera.parent = this._sphere;
        
     //   this._camera.lockedTarget.rotation = new BABYLON.Vector3(0,0,0);
        
     //   this._camera.rotation  = new BABYLON.Vector3(0,0,0);
        
        var mat = new BABYLON.StandardMaterial("material", this._scene);
        mat.diffuseTexture = new BABYLON.Texture("assets/texture/ball.jpg",this._scene);
        
        mat.diffuseColor = new BABYLON.Color3(1,1,1);
      //  mat.alpha = 0.5;
        
        this._sphere.material = mat;

        // Move the sphere upward 1/2 its height
        this._sphere.position.y = 20;
        
        this._sphere.checkCollisions = true;
        
       // this._sphere.parent = this._player;
       // 
       // 
       // 
        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
       
        
        this.createSceneObjects();
        this.initPhysics();
        
        
        
        
        
      //  InputController.registerInput();
        
        
        this.registerInput();
        
        this.callFunc();
        
        /*
        let input = new InputController();
        input.register(); */
    }
    registerInput(): void {
        var inputMap = {};
      //  throw new Error("DEBUG: " + JSON.stringify(this.worldsize));
        
        this._scene.actionManager = new BABYLON.ActionManager(this._scene);
        
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
                this.playerController(new BABYLON.Vector3(0,0,1));
            } 
            if(inputMap["a"] || inputMap["ArrowLeft"]){
                this.playerController(new BABYLON.Vector3(-1,0,0));
            } 
            if(inputMap["s"] || inputMap["ArrowDown"]){
                this.playerController(new BABYLON.Vector3(0,0,-1));
            } 
            if(inputMap["d"] || inputMap["ArrowRight"]){
                this.playerController(new BABYLON.Vector3(1,0,0));
            }   
            if(inputMap["z"]){
                this.direction = new BABYLON.Vector3(0,0,0);
                this.playerController(new BABYLON.Vector3(0,0,0));
            }   
            if(inputMap["spacebar"]){
                console.log('IsJumping!');
                this.isJumping = true;
                this.currentBoostFrame = 1;
                inputMap["spacebar"] = false;
                this.playerController(new BABYLON.Vector3(0,1,0));
            }
        });
    }
    playerController(position) : void{
        let speed = 0.005;
        position.x = position.x * speed;
        position.z = position.z * speed;
        this.direction.x += position.x;
        this.direction.z += position.z;
    }
    
    createParticleSystem() :void{
        var fountain = BABYLON.Mesh.CreateBox("foutain", 0.1, this._scene);
        fountain.visibility = 1;
        
        fountain.edgesColor = new BABYLON.Color4(255,0,0,0);
        this._sphereParticleMesh = fountain;       
        var particleSystem = new BABYLON.GPUParticleSystem("particles",{capacity : 10000},this._scene);
       // particleSystem.color1 = new BABYLON.Color4(0,0,0,0);
        // particleSystem.color2 = new BABYLON.Color4(1,1,1,1);
        particleSystem.emitRate = 100;
        particleSystem.particleEmitterType = new BABYLON.SphereParticleEmitter(1);
        
        var mat = new BABYLON.Texture("assets/texture/dirt.jpg", this._scene);
        
        particleSystem.particleTexture = mat;
        particleSystem.maxLifeTime = 5;
        particleSystem.minSize = 0.02;
        particleSystem.maxSize = 0.2;
        particleSystem.emitter = fountain;
        particleSystem.start();
        console.log('CreateParticleSys!');
        
        this._sphereParticle = particleSystem;
    }
    init(): void{
        this._scene.registerBeforeRender(() => {
           // let deltaTime: number = (1 / this._engine.getFps() / 10);
            this.update();
        });
    }
    isOutOfBounds() : boolean{
        
        var reverseBounceRate = 0.1;
        
        var offset = this._sphere.scaling.x * 2;
        
 
        if (this._sphere.position.x >= (this.worldsize[0] / 2 + offset)){
           // this.direction.x = this.direction.x - reverseBounceRate;
            
            return true;
        } else if (this._sphere.position.x <= -(this.worldsize[0] / 2 + offset)){
         //   this.direction.x = this.direction.x + reverseBounceRate;
            return true;
        }
        if (this._sphere.position.z >= (this.worldsize[1] / 2) + offset){
         //   this.direction.z = this.direction.z - reverseBounceRate;
            return true;
        } else if (this._sphere.position.z <= -(this.worldsize[1] / 2) + offset){
         //   this.direction.z = this.direction.z + reverseBounceRate;
            return true;
        }     
        
        
        return false;
    }
    
    easeInOut(t): number{
        return t<.5 ? 2*t*t : -1+(4-2*t)*t
    }
    
    
    collisionDetection() : void{
        
         //   this._sphere.moveWithCollisions(new BABYLON.Vector3(0,0,0.1));
        if (this._sphere.intersectsMesh(this._box,false)){
            this._light.diffuse = new BABYLON.Color3(255,0,0);
            
            
        //    this._walls[0].material.diffuseColor(new BABYLON.Color3(255,0,0));
            
            console.log('x'+this.direction.x);
            console.log('y'+this.direction.y);
            console.log('z'+this.direction.z);
            
       //     this._sphere.moveWithCollisions(new BABYLON.Vector3(0,0,0.1));
            
       //     this._sphere.mov
            
            
            
            
            
        }else{
            this._light.diffuse = new BABYLON.Color3(255,255,255);
        }
        
        
        
    }
    
    
    
    playerJumpCheck(): void{
     //   let gravity = 0.01;
        let speed_jump = 0.3;
      //  if(this._sphere.intersectsMesh(this._ground,false)){
            if (this.isJumping){
                if (this.currentBoostFrame < this.maxBoostFrames){
                    console.log('JUMPING!');
                    console.log(this.currentBoostFrame);
                    let ease_jump = this.easeInOut((this.currentBoostFrame / this.maxBoostFrames));
                    this.direction.y += (speed_jump * ease_jump);
                    console.log(this.direction.y);
                }else{
                    this.isJumping = false;
                }
                this.currentBoostFrame ++;
            }else{
                 this.direction.y = 0;
            }
    /*    }else{
            this.direction.y = 0;
        }*/
        
        /*
        if (this._sphere.position.y <= 1.01){
            this.isJumping = false;
        }else{
            this.isJumping = true;
        }
        */
    }
    
    update(): void{
        this.collisionDetection();
        
        let deltaTime = this._engine.getDeltaTime();
        let speed = 0.001;
        let drag = 0.01;
        
        let max_speed = 100;
        
        
        this.direction.x = this.direction.x / (1 + drag);
        this.direction.z = this.direction.z / (1 + drag);
        
        
        
        this._sphereParticleMesh.position = this._sphere.position;
        
        
        
        this.playerJumpCheck();
        if(this.isOutOfBounds()){
            this._sphere.position = new BABYLON.Vector3(0,20,0);
            this._sphere.physicsImpostor.resetUpdateFlags();
        }
        
       var newImpulse =new BABYLON.Vector3(this.direction.x, this.direction.y, this.direction.z);
      
       var contactLocalRefPoint = BABYLON.Vector3.Zero();
       var sf = 40;
        this._sphere.physicsImpostor.applyForce(newImpulse.scale(sf), this._sphere.getAbsolutePosition().add(contactLocalRefPoint));
        if(this.direction.x > max_speed){
          this.direction.x = max_speed;
        }
        if(this.direction.z > max_speed){
         this.direction.z = max_speed;
        }
        
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