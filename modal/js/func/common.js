import { Include } from "./include.js";
import { Modal } from "./modal.js";

export async function Common(){
    const INCLUDE = new Include();
    const MODAL = new Modal();
    
    await INCLUDE.init();
    MODAL.init();

    window.addEventListener('click',e=>{
        const target = e.target;
        // OPEN
        if(target.dataset.modalOpen){MODAL.open(target);}
        // CLOSE
        if(target.dataset.modalClose){MODAL.close(target);}
    });
}//Common