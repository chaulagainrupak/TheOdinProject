
window.onload = function () {
    navBarWriter();
}










let navBarItems = [
    ['Dashboard', '📦'],
    ['Homepage', '🏠'],
    ['Profile', '🪪'],
    ['Messages', '💬'],
    ['History', '🕒'],
    ['Tasks', '☑️'],
    ['Settings', '⚙️'],
    ['Privacy', '🎭'],
];

let navBarWriter = () => {

    let cssRoot = getComputedStyle(document.querySelector(':root'));
    let div = document.createElement('div');



    for(let i = 0; i < navBarItems.length; i++){

        let nav = document.querySelector('.navBar');


        if (navBarItems[i][0] == 'Dashboard'){
            div.style.fontSize = '2.5rem';
            div.style.marginTop = '3rem';
            div.style.marginBottom = '5rem';
            div.textContent = navBarItems[i][1] + navBarItems[i][0];
            nav.appendChild(div);
        }else{
            let a = document.createElement('a');
            let urlDiv = document.createElement('div');
            urlDiv.style.marginTop = '2rem';
            urlDiv.style.height = '5rem';
            a.setAttribute('href', '#');
            a.setAttribute('class', 'links');
            a.textContent = navBarItems[i][1] + navBarItems[i][0];
            a.style.textDecoration = 'none';
            urlDiv.appendChild(a);
            
            nav.appendChild(urlDiv);
        }
        
        console.log('Navbar Items Written!');
    }
}   