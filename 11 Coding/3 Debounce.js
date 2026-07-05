// Q. Debounce function (very common frontend interview question).

function debounce (fn,delay){
let timer;

return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
        fn(...args)
    }, delay);
}

}
function query(){
    console.log("User Type ...")

}
const debounceSearch = debounce(query,500)
debounceSearch()
