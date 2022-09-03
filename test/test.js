const input = document.getElementById('file');

async function onChangeInput(e) {
    const file = e.target.files.item(0)
    const text = await file.text();

    document.getElementById("output").innerText = text;
    console.log(text)
}

input.onchange = onChangeInput;
