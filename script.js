async function loadData(){

  try{

    const response =
    await fetch(API_URL);

    const data =
    await response.json();

    console.log(data);

    // ambil parameter kode dari URL
    const params =
    new URLSearchParams(window.location.search);

    const kode =
    params.get("kode");

    let asset;

    // cari berdasarkan kode barang
    if(kode){

      asset = data.find(item =>
        item["Kode Barang"]?.trim() === kode.trim()
      );

    }else{

      // default tampil data pertama
      asset = data[0];
    }

    // jika asset tidak ditemukan
    if(!asset){

      card.innerHTML = `
        <div style="color:red;text-align:center;">
          Asset tidak ditemukan
        </div>
      `;

      return;
    }

    console.log("ASSET:", asset);

    // gambar
    const imageUrl =
    asset["Link Gambar"] ||
    "assets/no-image.png";

card.innerHTML = `

<div class="asset-layout">

  <img
    class="asset-image"
    src="${imageUrl}"
    alt="Asset Image"
    onerror="this.src='assets/no image.png'"
  >

  <div class="asset-info">

    <div class="label">
      Nama Barang
    </div>

    <div class="value">
      ${asset["Nama Barang"] || "-"}
    </div>

    <div class="label">
      Kode Barang
    </div>

    <div class="value asset-code">
      ${asset["Kode Barang"] || "-"}
    </div>

    <div class="label">
      Tipe / Ukuran
    </div>

    <div class="value">
      ${asset["Tipe/Ukuran"] || "-"}
    </div>

    <div class="label">
      Lokasi
    </div>

    <div class="value">
      ${asset["Lokasi"] || "-"}
    </div>

    <div class="label">
      Keterangan
    </div>

    <div class="value">
      ${asset["Keterangan (Letak)"] || "-"}
    </div>

    <div class="label">
      Kondisi Asset
    </div>

    <div class="status">
      ${asset["Kondisi Aset"] || "-"}
    </div>

  </div>

</div>
    `;

  }catch(error){

    console.log(error);

    card.innerHTML =
    "ERROR mengambil data";
  }

}

loadData();