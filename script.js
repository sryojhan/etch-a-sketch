
class Manager{

    init(){

        this.left = new Wheel(document.querySelector('#left-wheel'), true);
        this.right = new Wheel(document.querySelector('#right-wheel'), false);

        this.selectedWheel = null;
        this.sketch = document.querySelector('#sketch');


        this.columns = 100;
        this.rows = 80;

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



        this.currentX = Math.floor(this.columns * 0.5);
        this.currentY = Math.floor(this.rows * 0.5);


        this.updateSelected(0, 0);
    }

    paintNode(x, y){

        this.sketch.children[x].children[y].classList.add('selected');

    }

    paintCurrentSelectedNode(){

    }

    updateSelected(diffX, diffY){

        this.currentX += diffX;
        this.currentY += diffY;

        this.paintNode(this.currentX, this.currentY);
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
        this.currentRotation += movementX;

        this.updateVisuals();


        const changeSelectedResistance = 10;
        
        let change = 0;

        if(this.changeValue < -changeSelectedResistance){

            change = -1;
        }

        else if(this.changeValue > changeSelectedResistance){
            change = 1;
        }

        else{
            return;
        }


        this.changeValue = 0;

        if(this.isHorizontal)
            manager.updateSelected(change, 0);
        else 
            manager.updateSelected(0, -change);

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


let shake = document.querySelector('.shake-container');
document.querySelector('#clear').addEventListener('click', (event) => {


    shake.classList.add('shake');    
    manager.populateScreen()
});


shake.addEventListener('animationend', (event) =>{

    shake.classList.remove('shake');
});


