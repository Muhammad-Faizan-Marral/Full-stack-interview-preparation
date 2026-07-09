


function greet(no) {
    console.log(this(),no)
}
const user = function () {
    const d = "d"
return d
}

const gg =greet.bind(user,["11"])
gg()