export class Test{
    constructor(){
        this.$btn = document.getElementById('btn');
        this.$div = document.getElementById('myDiv');
        this.POS = {x:null, y:null};
        this.flag = false;
    }//constructor
    
    init(){
        this.$btn.addEventListener('mousedown',this.on_down);
        window.addEventListener('mouseup',this.on_up);
    }//init

    on_down = ()=>{
        this.flag = true;
        this.flag && window.addEventListener('mousemove',this.on_move);
    }//on_down

    on_move = (e)=>{
        if(!this.flag){return;}
        this.POS.x = e.clientX;
        this.POS.y = e.clientY;
        console.log(this.POS);
    }//on_move

    on_up = ()=>{
        this.flag = false;
        window.removeEventListener('mousemove',this.on_move);
    }//on_up
}//class-Test