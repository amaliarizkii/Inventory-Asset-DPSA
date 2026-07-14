const SHEET_ID =
"1csqVJgZhmLnA0pCo-TQPKNXe2jg-wVijiGuryEfD10o";

const SHEET_NAME =
"DATABASE";

const API_URL =
`https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

const card =
document.getElementById("card");

const params =
new URLSearchParams(window.location.search);

const kode =
params.get("kode");

async function loadData(){

  try{

    const response =
    await fetch(API_URL);

    const data =
    await response.json();

    let asset;

    if(kode){

      asset = data.find(item =>
        item["Kode Barang"] === kode
      );

    }else{

      asset = data[0];
    }

    if(!asset){

      card.innerHTML =
      `<div class="error">
        Asset tidak ditemukan
      </div>`;

      return;
    }

    let imageUrl =
    asset["Link Gambar"] || "";

    if(
      imageUrl.includes(
        "drive.google.com/file/d/"
      )
    ){

      const match =
      imageUrl.match(
        /\/d\/([^\/]+)/
      );

      if(match){

        const fileId =
        match[1];

        imageUrl =
        `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
      }
    }

      // Rapikan data Tipe / Ukuran otomatis
      let spec = asset["Tipe/Ukuran"] || "-";
      
      spec = spec
      .replace(/Monitor\s*:/gi,"<b>Monitor :</b> ")
      .replace(/Processor\s*:/gi,"<br><b>Processor :</b> ")
      .replace(/CPU\s*:/gi,"<br><b>CPU :</b> ")
      .replace(/RAM\s*:/gi,"<br><b>RAM :</b> ")
      .replace(/Storage\s*:/gi,"<br><b>Storage :</b> ")
      .replace(/SSD\s*:/gi,"<br><b>SSD :</b> ")
      .replace(/HDD\s*:/gi,"<br><b>HDD :</b> ")
      .replace(/SN\s*:/gi,"<br><b>SN :</b> ")
      .replace(/Resolusi\s*:/gi,"<br><b>Resolusi :</b> ")
      .replace(/Dimensi\s*:/gi,"<br><b>Dimensi :</b> ")
      .replace(/Ukuran\s*:/gi,"<br><b>Ukuran :</b> ")
      .replace(/Berat\s*:/gi,"<br><b>Berat :</b> ")
      .replace(/Printer\s*:/gi,"<br><b>Printer :</b> ");
      
      card.innerHTML = `

      <div class="asset-container">

        <div class="asset-photo">

          <img
            src="${imageUrl}"
            alt="Asset Image"
            onerror="this.src='no image.png'"
          >

        </div>

        <div class="asset-detail">

          <div class="info-row">
            <div class="icon">📦</div>

            <div class="info-content">
              <span>Nama Barang</span>
              <h3>${asset["Nama Barang"] || "-"}</h3>
            </div>
          </div>

          <div class="info-row">
            <div class="icon">🏷️</div>

            <div class="info-content">
              <span>Kode Barang</span>

              <h3 class="asset-code">
                ${asset["Kode Barang"] || "-"}
              </h3>
            </div>
          </div>

           <div class="info-row info-spec">
  
          <div class="icon">🖥️</div>
        
          <div class="info-content">
            <span>Tipe / Ukuran</span>
        
            <h3>
              ${spec}
            </h3>
        
          </div>
        
        </div>

          <div class="info-row">
            <div class="icon">📍</div>

            <div class="info-content">
              <span>Lokasi</span>

              <h3>
                ${asset["Lokasi"] || "-"}
              </h3>
            </div>
          </div>

          <div class="info-row">
            <div class="icon">👤</div>

            <div class="info-content">
              <span>Keterangan</span>

              <h3>
                ${asset["Keterangan (Letak)"] || "-"}
              </h3>
            </div>
          </div>

          <div class="info-row">

    <div class="icon">
        📋
    </div>

    <div class="info-content">

        <span>Kondisi Asset</span>

        <h3 class="status-text">
            ${asset["Kondisi Aset"] || "-"}
        </h3>

    </div>

</div>

        </div>

        <img
          src="plant-lineart.png"
          class="bg-plant"
        >

      </div>

    `;

  }catch(error){

    console.log(error);

    card.innerHTML =
    `<div class="error">
      ERROR mengambil data
    </div>`;
  }

}

loadData();
