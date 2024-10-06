//Variables y llamadas a los id del Html
let busca = document.getElementById("busca");
let texto = document.getElementById("texto");
let resultados= document.getElementById("resultados");

//Variable con la apiKei
const apiKey = "kZUnG24w9UPhAa1fxR6CRQfPGoylZ80P";

//Funcion fetch para conectar la api de giphy y la busqueda de gifs 
const llamada = (ak, kw) => {
    return fetch(`https://api.giphy.com/v1/gifs/search?
        api_key=${ak}
        &q=${kw}
        &limit=9
        &offset=0
        &rating=g
        &lang=en
        &bundle=messaging_non_clips`);
}

//Llamada a la api, funcionalidad con promesas....
busca.addEventListener("click", () => {
    let tex = texto.value;
    llamada(apiKey, tex)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .then((results) => {
            resultados.innerHTML = '';
            results.data.forEach(element => {
                let img = document.createElement("img");
                img.setAttribute("src", element.images.original.url);
                resultados.appendChild(img);
            });
        })
        .catch((error) => {
            console.error("Error en la consulta: " + error.message);
        });
});
