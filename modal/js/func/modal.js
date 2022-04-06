export class Modal{
    constructor(){}//constructor

    init(){
        const $$wrap = document.querySelectorAll('[data-modal]');
        $$wrap.forEach($wrap => { new Draggable($wrap);});
    }

    open(target){
        const mdName = target.dataset.modalOpen;
        const $wrap = document.querySelector(`[data-modal="${mdName}"]`);
        const $bg = $wrap.getElementsByClassName('md-bg')?.[0]; 
        if($bg){
            document.body.style.overflowY = 'hidden';
        }//if
        $wrap.classList.remove('off');
    }//open

    close(target){
        const mdName = target.dataset.modalClose;
        const $wrap = document.querySelector(`[data-modal="${mdName}"]`);
        document.body.style.overflowY = 'auto';
        $wrap.classList.add('off');
    }//close
}//class-Modal

/* ----------- 모달 드래그 ------------ */
/* 윈도우 사이즈 */
const WINDOW_SIZE = {
    wid : window.innerWidth,
    hei : window.innerHeight
};

/* 윈도우 사이즈 업데이트 */
function update_window_size(){
    WINDOW_SIZE.wid = window.innerWidth;
    WINDOW_SIZE.hei = window.innerHeight;
}//update_window_size

/* 윈도우 드래그 해제 */
function clear_selection(){
    if (window.getSelection().empty) {  
        // Chrome
        window.getSelection().empty();
    }else if(window.getSelection().removeAllRanges){  
        // Firefox
        window.getSelection().removeAllRanges();
    }
    //https://w3c.github.io/selection-api
    //https://stackoverflow.com/questions/3169786/clear-text-selection-with-javascript
}//clear_selection

class Draggable{
    constructor($wrap){
        this.$modal = $wrap.getElementsByClassName('modal')[0];
        this.$header = this.$modal.getElementsByClassName('md-head')[0];
        this.$body = this.$modal.getElementsByClassName('md-body')[0];
        this.is_draggable = false;
        this.SIZE = {
            wid : this.$modal.getBoundingClientRect().width,
            hei : this.$modal.getBoundingClientRect().height}
        this.LIMIT = {
            right : WINDOW_SIZE.wid - (this.SIZE.wid / 2),
            bottom : WINDOW_SIZE.hei - (this.SIZE.hei / 2)}
        this.POS = {
            last : {x:null, y:null},
            final : {x:null, y:null}}

        //실행
        this.init();
    }//constructor

    /* 실행 시작 */
    init(){
        if(!this.$header){return;}
        this.$header.addEventListener('mousedown', this.ready_to_drag);
        this.$modal.addEventListener('mouseup',this.stop_drag);
        window.addEventListener('mouseleave',this.stop_drag);
    }//init

    /* 드래그 준비 */
    ready_to_drag = (e) =>{
        this.is_draggable = true;
        this.POS.last.x = e.clientX  - this.$modal.getBoundingClientRect().left;
        this.POS.last.y = e.clientY  - this.$modal.getBoundingClientRect().top;

        /* update limit size.. */
        update_window_size();
        this.LIMIT.right = WINDOW_SIZE.wid - (this.SIZE.wid / 2);
        this.LIMIT.bottom = WINDOW_SIZE.hei - (this.SIZE.hei / 2);

        /* add Event */
        window.addEventListener('mousemove', this.on_drag);
    }//ready_to_drag
    
    /* 드래그 중 */
    on_drag = (e) => {
        if(!this.is_draggable){return;}
        this.$body.style.userSelect = 'none';
        const currX = e.clientX - this.POS.last.x;
        const currY = e.clientY - this.POS.last.y;

        /* X축 */
        if(currX <= (this.SIZE.wid / -2)){
            this.POS.final.x = (this.SIZE.wid / -2);
        }else if(currX > this.LIMIT.right){
            this.POS.final.x = this.LIMIT.right;
        }else{
            this.POS.final.x = currX;}
            
        /* Y축 */
        if(currY <= 0){
            this.POS.final.y = 0;
        }else if(currY > this.LIMIT.bottom){
            this.POS.final.y = this.LIMIT.bottom;
        }else{
            this.POS.final.y = currY;}

        /* 최종 css 적용 */
        const {final:{x,y}} = this.POS;
        this.$modal.style.transform = `translate(${x}px,${y}px)`; 
    }//on_drag

    /* 드래그 끝 */
    stop_drag = () => {
        this.is_draggable = false;
        this.$body.style.userSelect = 'auto';
        // clear_selection();
        this.POS.last.x = this.$modal.getBoundingClientRect().left;
        this.POS.last.y = this.$modal.getBoundingClientRect().top;

        //removeEvent
        window.removeEventListener('mousemove', this.on_drag);
    }//stop_drag
}//class-Draggable