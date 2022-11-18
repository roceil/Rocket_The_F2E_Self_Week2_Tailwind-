/** @type {HTMLCanvasElement} */
const draw_bg = document.querySelector(".draw-container");
const input_file = document.querySelector(".input-file");
const input_file_btn = document.querySelector(".input-file-btn");
const step2 = document.querySelector("#step2");
// !抓取canvas元素
const canvas = document.querySelector("#canvas");

// !設定canvas畫布
const ctx = canvas.getContext("2d");
const canvasW = (canvas.width = draw_bg.clientWidth + 10);
const canvasH = (canvas.height = draw_bg.clientHeight + 10);
ctx.fillStyle = "#F2EFEF";
ctx.fillRect(0, 0, canvasW, canvasH);

const data = [];

// !設定canvas.onChange事件
// input_file_btn.addEventListener('change',function (e) {

// })

input_file_btn.addEventListener("change", (e) => {
  if (e.target.files[0] === undefined) return;

  // 上傳成功後，步驟 2 換顏色
  renderStepBG(step2);

  // 上傳成功後，canvas外層div寬高取消
  deleteW(draw_bg)

  // 透過 input 所選取的檔案
  const file = e.target.files[0];

  // 產生fileReader物件
  const fileReader = new FileReader();

  // 將資料做處理
  fileReader.readAsArrayBuffer(file);

  // 綁入事件監聽
  fileReader.addEventListener("load", () => {
    // 獲取readAsArrayBuffer產生的結果，並用來渲染PDF
    const typedarray = new Uint8Array(fileReader.result);
    console.log(JSON.stringify(data));
    addFile(typedarray);
  });
});

// async function renderPDF(data) {
//   const pdfDoc = await pdfjsLib.getDocument(data).promise;
//   const pdfPage = await pdfDoc.getPage(1);
//   const viewport = pdfPage.getViewport({ scale: 1 });
//   canvas.width = viewport.width;
//   canvas.height = viewport.height;
//   pdfPage.render({
//     canvasContext: ctx,
//     viewport: viewport,
//   });
// }

// input_file_btn.addEventListener('click',function (e) {
//   addFile()
// })

// !渲染PDF函式
function addFile(item) {
  // 因為是以外部引入的方式使用套件，因此需要做環境設定
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://mozilla.github.io/pdf.js/build/pdf.worker.js";
  // 參數的部份請先將 PDF 放入專案資料夾內，並寫入路徑
  pdfjsLib.getDocument(item).promise.then((doc) => {
    doc.getPage(1).then((page) => {
      input_file.setAttribute("style", "display:none");

      // 設定 PDF 內容的顯示比例
      const viewport = page.getViewport({ scale: 1 });

      // 設定 canvas 的大小與 PDF 相等
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      //實際渲染 PDF
      page.render({
        canvasContext: ctx,
        viewport: viewport,
      });
    });
  });
}

// !渲染步驟背景函式
function renderStepBG(value) {
  value.setAttribute("style", "background-color: #215F78 ;color:white");
}

// !移除寬高函式
function deleteW(value) {
  value.setAttribute("style", "width:auto");
}
