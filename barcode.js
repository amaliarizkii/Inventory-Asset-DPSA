const list = document.getElementById("list");

async function generateQR(){

  const response = await fetch(API_URL);

  const data = await response.json();

  data.forEach(asset => {

    const div = document.createElement("div");

    div.className = "item";

    const url =
`http://127.0.0.1:5500/index.html?kode=${asset["Kode Barang"]}`;

    div.innerHTML = `
      <h3>${asset["Nama Barang"]}</h3>

      <p>${asset["Kode Barang"]}</p>

      <canvas id="${asset["Kode Barang"]}"></canvas>
    `;

    list.appendChild(div);

    QRCode.toCanvas(
      document.getElementById(asset["Kode Barang"]),
      url
    );

  });

}

generateQR();