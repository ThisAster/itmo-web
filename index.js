function checkPoint() {
    const data = getData();
    alert(JSON.stringify(data));
}

function getData() {
    const xInput = document.getElementById("x"); 
    const ySelect = document.getElementById("y");
    const rSelect = document.getElementById("r");
    const ySelectedOption = ySelect.options[ySelect.selectedIndex];
    const rSelectedOption = rSelect.options[rSelect.selectedIndex];
    const data = {
        x: xInput.value,
        y: ySelectedOption.text,
        r: rSelectedOption.text
    }
    return data;
}