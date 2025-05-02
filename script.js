
class Manager{

    init(){

        this.left = new Wheel(document.querySelector('#left-wheel'));
        this.right = new Wheel(document.querySelector('#right-wheel'));

        this.selected = null;
        this.sketch = document.querySelector('#sketch');


        this.initialiseEvents();
        this.populateScreen(10, 8);
    }

    initialiseEvents(){

        
        addEventListener('mouseup', (data)=>{

            if(this.selected !== null){

                this.selected = null;
            }

        });

        addEventListener('mousemove', (data)=>{

            if(this.selected !== null){

                this.selected.onDrag(data.movementX);
            }

        });
    }


    selectWheel(wheel){

        this.selected = wheel;
    }


    clearElements(container){

        container.innerHtml = "";
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

    populateScreen(columns, rows){



        this.clearElements(sketch);

        for(let i = 0; i < columns; i++){

            let column = this.createColumn();

            for(let c = 0; c < rows; c++){

                this.createCell(column);
            }
        }

    }

}



let manager = new Manager();


class Wheel{

    constructor(element){

        // this.currentRotation = Math.random() * 360;
         this.currentRotation = 0;
        this.element = element;


        element.addEventListener('mousedown', ()=>{

            manager.selectWheel(this);
        });

        this.updateVisuals();
    }    


    updateVisuals(){

        
        this.element.children[0].style.transform = `rotate(${this.currentRotation}deg)`;
    }

    onDrag(movementX){

        this.currentRotation += movementX;

        this.updateVisuals();
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
