const bar = document.getElementsByClassName(`loader`)[0];
const balloon = document.getElementsByClassName(`balloon`)[0];
setInterval(() => {
    const calc = getComputedStyle(bar);
    const width = parseFloat(calc.getPropertyValue(`--width`)) || 0;
    bar.style.setProperty(`--width`, width + .25);
    if (width < 90){
    balloon.style.setProperty(`--width`, width);
    }
    if (width > 105){
    document.getElementById(`loading`).style.opacity = "0";
    document.getElementById(`site`).style.opacity = "100";
    document.body.style.backgroundColor = "#212529";
    }
}, 5)