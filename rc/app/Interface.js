
define(['./Wheel', './Hand', './config'], function (Wheel, Hand, config) {
	var Interface = class {
		constructor(sk) {
			this.sk = sk
			this.wheels = [];
			this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);			
			this.createWheels();
			this.createHand();

			this.rpmSlider = null
			this.lastPressedObj = null
		}

		createHand() {
			// should only happen after createWheels
			const xCenter = this.width / 2;
	    	const yCenter = this.height / 2;
			const length = this.wheels[this.wheels.length - 1].radius

			this.hand = new Hand(this.sk, 
				xCenter, 
				yCenter, 
				length,
				this.wheels)
		}
		
		createWheels() {
			this.wheels = []
			const xCenter = this.width / 2;
	    	const yCenter = this.height / 2;
			
			for (var i = 0; i < config.wheelsConfig.wheels.length ; i++) {
				const wheelConfig = config.wheelsConfig.wheels[i]
				let wheel = new Wheel(this.sk, 
										xCenter, 
										yCenter, 
										wheelConfig)
				this.wheels.push(wheel)
			}
		}

		preload() {
			this.wheels.forEach( (wheel) => {
				wheel.preload()
			})
		}

		draw() {
			//draw wheels outside-in
			for (var i = this.wheels.length - 1; i > -1 ; i--) {
				this.wheels[i].draw()
			}
			this.hand.draw(this.rpmSlider.value())
			this.sk.fill(0);
		    this.sk.textSize(18);
		    this.sk.color('#000000')
		    this.sk.textFont('Playfair Display')
		    this.sk.text('RPM', this.width / 2 + 100, this.height - 20);
		    this.sk.text('Style', this.width / 2 - 100, this.height - 20);
		}

		setup() {
			//slider
			this.sk.colorMode(this.sk.HSB);
		    this.rpmSlider = this.sk.createSlider(20, 100, config.handConfig.defaultRpm);
		    this.rpmSlider.position(this.width / 2 + 100, config.interfaceHeight - 50);	
		    
		    //wheel setup
		    this.wheels.forEach((wheel) => {
		    	wheel.setup()
		    })	 

		    //style drop menu 
		    this.sk.textAlign(this.sk.CENTER);
			this.sel = this.sk.createSelect();
			this.sel.position(this.width / 2 - 100, config.interfaceHeight - 50);
			this.sel.option('Empty');
			this.sel.option('Standard 4/4');
			this.sel.option('Wals');
			this.sel.changed(this.getStyleChangedListener());   
		}

		getStyleChangedListener() {
			let that = this
			return () => {
				console.log(that.sel.value());
			}
		}

		getIntersectObj(x, y) {
			for(var i = 0; i < this.wheels.length; i++) {
				let obj = this.wheels[i].getIntersectObj(x, y)
				if (obj != null) {
					return obj
				}
			}
			return null
		}


		mousePressed() {
			//console.log(`pressed ${this.sk.mouseX} ${this.sk.mouseY}`)
			this.lastPressedObj = this.getIntersectObj(this.sk.mouseX, this.sk.mouseY)

			if (this.lastPressedObj != null) {
				this.lastPressedObj.mousePressed(this.sk.mouseX, this.sk.mouseY)
			}
		}

		mouseReleased() {
			if(!this.lastPressedObj) return
			//console.log(`released ${this.sk.mouseX} ${this.sk.mouseY}`)
			this.lastPressedObj.mouseReleased(this.sk.mouseX, this.sk.mouseY)
			this.lastPressedObj = null
		}

		mouseDragged() {
			if(!this.lastPressedObj) return
			//console.log(`dragged ${this.sk.mouseX} ${this.sk.mouseY}`)
			this.lastPressedObj.mouseDragged(this.sk.mouseX, this.sk.mouseY)
		}
	}
	return Interface
})