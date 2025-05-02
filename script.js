
class Manager{

    init(){

        this.left = new Wheel(document.querySelector('#left-wheel'));
        this.right = new Wheel(document.querySelector('#right-wheel'));

        this.selected = null;

        this.initialiseEvents();
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