
class Manager{

    init(){

        this.left = new Wheel(document.querySelector('#left-wheel'), true);
        this.right = new Wheel(document.querySelector('#right-wheel'), false);

        this.selectedWheel = null;
        this.sketch = document.querySelector('#sketch');


        this.columns = 100;
        this.rows = 80;


        this.currentX = Math.floor(this.columns * 0.5);
        this.currentY = Math.floor(this.rows * 0.5);

        this.keyboardSpeed = 4;


        this.initialiseEvents();
        this.populateScreen();
    }

    initialiseEvents(){

        
        addEventListener('mouseup', (data)=>{

            if(this.selectedWheel !== null){

                this.selectedWheel.element.classList.remove('selected');

                this.selectedWheel = null;
            }

        });

        addEventListener('mousemove', (data)=>{

            if(this.selectedWheel !== null){

                this.selectedWheel.onDrag(data.movementX);
            }

        });


        addEventListener('keydown', (data) =>{



            this.manageKeyPress(data, 'ArrowLeft', this.left, -1);
            this.manageKeyPress(data, 'ArrowRight', this.left, 1);
            this.manageKeyPress(data, 'ArrowUp', this.right, 1);
            this.manageKeyPress(data, 'ArrowDown', this.right, -1);

        });

        addEventListener('keyup', (data) =>{


            this.keyReleased(data, 'ArrowLeft');
            this.keyReleased(data, 'ArrowRight');
            this.keyReleased(data, 'ArrowUp');
            this.keyReleased(data, 'ArrowDown');

        });

    }
    
    manageKeyPress(data, key, wheel, value){

        if(data.key === key && (!this[key] || this[key] === false)){


            this[key] = true;
            
            this.keyPressLoop(key, wheel, value);
        }
    }


    keyPressLoop(key, wheel, value){

        if(this[key] === false) return;

        wheel.onDrag(value * this.keyboardSpeed);

        setTimeout(
            ()=>{
                this.keyPressLoop(key, wheel, value);
            }
            , 10);
    }

    keyReleased(data, key){

        if(data.key === key)
        {
            this[key] = false;
        }
    }

    selectWheel(wheel){

        this.selectedWheel = wheel;

        wheel.element.classList.add('selected');
    }


    clearElements(){

        this.sketch.innerHTML = "";
    }

    createColumn(){

        let node = document.createElement('div');

        node.classList.add('column');

        this.sketch.append(node);

        return node;
    }

    createCell(parent){

        let node = document.createElement('div');

        node.classList.add('cell');

        parent.append(node);
    }

    populateScreen(){

        this.clearElements();

        for(let i = 0; i < this.columns; i++){

            let column = this.createColumn();

            for(let c = 0; c < this.rows; c++){

                this.createCell(column);
            }
        }



        this.paintNode();
    }

    paintNode(){

        this.sketch.children[this.currentX].children[this.currentY].classList.add('selected');
    }

    hoverNode(){

        this.sketch.children[this.currentX].children[this.currentY].classList.add('hovered');
    }

    unhoverNode(){

        this.sketch.children[this.currentX].children[this.currentY].classList.remove('hovered');
    }

    isPainted(){

        return this.sketch.children[this.currentX].children[this.currentY].classList.contains('selected');
    }

    updateSelected(diffX, diffY){

        if(diffX === 0 && diffY === 0) return;

        let newX = this.currentX + diffX;
        let newY = this.currentY + diffY;

        if(newX < 0 || newY < 0 || newX >= this.columns || newY >= this.rows)
            return false;


        this.unhoverNode();
        
        this.currentX += diffX;
        this.currentY += diffY;
        
        if(this.isPainted()){
            
            this.hoverNode();
        }
        else{

            this.paintNode();
        }
    }
}



let manager = new Manager();


class Wheel{

    constructor(element, isHorizontal){

        // this.currentRotation = Math.random() * 360;
        this.currentRotation = 0;
        this.changeValue = 0;
        this.element = element;
        this.isHorizontal = isHorizontal;

        element.addEventListener('mousedown', ()=>{

            manager.selectWheel(this);
        });

        this.updateVisuals();
    }    


    updateVisuals(){

        
        this.element.children[0].style.transform = `rotate(${this.currentRotation}deg)`;
    }

    onDrag(movementX){

        this.changeValue +=movementX;

        

        const changeSelectedResistance = 10;
        
        let change = 0;

        if(this.changeValue < -changeSelectedResistance){

            change = -1;
        }

        else if(this.changeValue > changeSelectedResistance){
            change = 1;
        }



        if(change !== 0){

            this.changeValue = 0;
            
            if(this.isHorizontal)
                manager.updateSelected(change, 0);
            else 
            manager.updateSelected(0, -change);
        }


        this.currentRotation += movementX;
        this.updateVisuals();

        //Knob animation



    }
}


addEventListener("DOMContentLoaded", (event) => {

    manager.init();
});



/*
    modify pad thickness
*/

let cssVariables = document.querySelector(':root');
let thicknessSlider = document.querySelector('#thickness');

thicknessSlider.value = getComputedStyle(cssVariables).getPropertyValue('--margin');

thicknessSlider.addEventListener('input', (event)=>{

    cssVariables.style.setProperty('--margin', event.target.value.toString() + "px");
});


let kbSpeedSlider = 

document.querySelector('#keyboard-speed').addEventListener('input', (event) =>{

    manager.keyboardSpeed = event.target.value;
}

);



let shake = document.querySelector('.shake-container');
document.querySelector('#clearBtn').addEventListener('click', (event) => {


    shake.classList.add('shake');    
    manager.populateScreen()
});


shake.addEventListener('animationend', (event) =>{

    shake.classList.remove('shake');
});


