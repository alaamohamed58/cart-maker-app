//template without phone
const cart = document.getElementById("cart"),
  radioCellsChecker = document.getElementById("flexRadioDefault2"),
  radioImgChecker = document.getElementById("flexRadioDefault1"),
  backgroundChecker = document.getElementById("backgroundcheck");

//add cells

radioCellsChecker.addEventListener("change", () => {
  if (flexRadioDefault2.checked) {
    cart.classList.add("cells");
    cart.classList.remove("dragging");
    backgroundChecker.setAttribute("disabled", null);
    cart.style.backgroundImage = `unset`;
    // let cartCells = document.querySelector(".cells");
  }
});
//remove cells
radioImgChecker.addEventListener("change", () => {
  cart.classList.remove("cells");
  cart.classList.add("dragging");
  backgroundChecker.removeAttribute("disabled");
  setBackGround();
});
/************************************************************************************** */
const priceInput = document.getElementById("currency"),
  priceValue = document.getElementById("priceValue"),
  currencyType = document.getElementById("currencyName"),
  currencyTypeSelect = document.getElementById("currencyChange"),
  priceChecker = document.getElementById("price"),
  priceContent = document.querySelector("#cart .price");

priceChecker.addEventListener("click", () => {
  if (priceChecker.checked) {
    priceContent.style.display = "block";
  } else {
    priceContent.style.display = "none";
  }
});

//price value
priceInput.value = 1;
priceValue.textContent = priceInput.value;
priceInput.addEventListener("input", () => {
  priceValue.textContent = priceInput.value;
});

//currency change
currencyType.textContent = currencyTypeSelect.value;
currencyTypeSelect.addEventListener("click", () => {
  currencyType.textContent = currencyTypeSelect.value;
  //   console.log(currencyTypeSelect.children[0].textContent);
});
/**************************************************************************************************** */
//cart background & logo
const uploadBackground = document.getElementById("backgroundupload");

backgroundChecker.addEventListener("click", () => {
  if (backgroundChecker.checked) {
    uploadBackground.removeAttribute("disabled");
    setBackGround();
  }
  if (!backgroundChecker.checked) {
    uploadBackground.setAttribute("disabled", null);
    cart.style.background = "unset";
  }
});
//setbackground function
const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];
function validFileType(file) {
  return fileTypes.includes(file.type);
}
function setBackGround() {
  let curFiles = uploadBackground.files;

  for (const file of curFiles) {
    if (validFileType(file)) {
      let backgroundImg = URL.createObjectURL(file);
      cart.style.backgroundImage = `url(${backgroundImg})`;
    }
  }
}
uploadBackground.addEventListener("change", updateImageDisplay);
function updateImageDisplay() {
  setBackGround();
}

//select icons
const selectIcons = document.getElementById("formFile"),
  iconChecker = document.getElementById("icons"),
  iconFilter = document.getElementById("filter"),
  borderRadius = document.getElementById("radius");
const iconEditSection = document.querySelectorAll(
  "#iconEdit input:not(input[type ='checkbox'])"
);

for (let i = 0; i < iconEditSection.length; i++) {
  let inputs = iconEditSection[i];
  inputs.disabled = true;
}

function filter() {
  iconChecker.addEventListener("click", () => {
    if (iconChecker.checked) {
      selectIcon();
      for (let i = 0; i < iconEditSection.length; i++) {
        let inputs = iconEditSection[i];
        inputs.disabled = false;
      }
      // iconFilter.disabled = false;
    }
    if (!iconChecker.checked) {
      for (let i = 0; i < iconEditSection.length; i++) {
        let inputs = iconEditSection[i];
        inputs.disabled = true;
      }
      // iconFilter.disabled = true;

      borderRadius.value = 0;
      // iconFilter.value = "contrast(1)";
      let icons = document.querySelector(" .icons");

      if (icons) {
        icons.remove();
      }
    }
  });
}
filter();

const removeIcons = () => {
  if (document.querySelector(".icons")) {
    document.querySelector(".icons").remove();
  }
};

function selectIcon() {
  removeIcons();

  let curFiles = selectIcons.files;
  let iconContainer = document.createElement("div"),
    iconImage = document.createElement("img");
  iconContainer.className = "icons";
  for (const file of curFiles) {
    if (validFileType(file)) {
      let selectedIcon = URL.createObjectURL(file);

      iconContainer.appendChild(iconImage);
      iconImage.src = selectedIcon;

      //filter

      // iconFilter.oninput = () => {
      //   iconImage.style.filter = iconFilter.value;
      // };
    }
    cart.prepend(iconContainer);

    borderRadius.oninput = () => {
      iconImage.style.borderRadius = `${borderRadius.value}%`;
    };

    let imgWidth = document.getElementById("iconwidth"),
      imgHeight = document.getElementById("iconheight");
    imgWidth.value = iconContainer.clientWidth;
    imgWidth.oninput = () => {
      iconContainer.style.width = `${imgWidth.value}px`;
    };
    imgHeight.value = iconContainer.clientHeight;
    imgHeight.oninput = () => {
      iconContainer.style.height = `${imgHeight.value}px`;
    };

    move();
  }
}
selectIcons.addEventListener("change", selectIcon);

//cart style
//border size
const borderChecker = document.getElementById("border"),
  borderSizeChanger = document.getElementById("bordersize");
borderSizeChanger.value = 1;
borderChecker.checked = false;
borderSizeChanger.disabled = true;
borderChecker.addEventListener("click", () => {
  if (borderChecker.checked) {
    borderSizeChanger.disabled = false;
    cart.style.border = `${borderSizeChanger.value}px solid #000`;
  }
  if (!borderChecker.checked) {
    borderSizeChanger.disabled = true;
    cart.style.border = "1px solid #000";
  }
});
borderSizeChanger.addEventListener("input", () => {
  cart.style.borderWidth = `${borderSizeChanger.value}px`;
});
let dragValue;
let dragging = false;
function move() {
  const element = document.querySelector(".dragging");

  let elementChildren = Array.from(element.children);

  for (let i = 0; i < elementChildren.length; i++) {
    let children = elementChildren[i];
    children.style.position = "absolute";

    children.onmousedown = () => {
      dragValue = children;
      dragging = true;
    };
    document.onmouseup = () => {
      dragValue = null;
      dragging = false;
    };
    element.onmousemove = (e) => {
      const rect = element.getBoundingClientRect();
      let x = e.pageX - rect.left,
        y = e.pageY - rect.top;
      if (dragging) {
        dragValue.style.left = `${x}px`;
        dragValue.style.top = `${y}px`;
        document.getElementById("positionx").value = x;
        document.getElementById("positiony").value = y;
        if (cart.classList.contains("cells")) {
          document.getElementById("positionx").disabled = true;
          document.getElementById("positionx").value = 0;
          document.getElementById("positiony").disabled = true;
          document.getElementById("positiony").value = 0;
        } else {
          document.getElementById("positionx").value = x;
          document.getElementById("positiony").value = y;
          document.getElementById("positionx").disabled = false;
          document.getElementById("positiony").disabled = false;
        }
      }
    };
  }
}
move();

//fetching parcode
function makeCode(ele, value) {
  let qrcode = new QRCode(ele);
  qrcode.makeCode(value.toString());
}

let qrCodeChecker = document.getElementById("passcode");
fetch("https://system-511f7-default-rtdb.firebaseio.com/pass.json")
  .then((response) => response.json())
  .then((data) => {
    let qrContent = document.createElement("div"),
      dataContent = document.createElement("span");
    dataContent.textContent = data;
    qrContent.id = "qrCode";
    qrContent.style.cssText = `

    z-index : 111
    `;

    makeCode(qrContent, data);
    cart.appendChild(qrContent);
    qrCodeChecker.addEventListener("click", () => {
      if (qrCodeChecker.checked) {
        cart.appendChild(qrContent);
        document.querySelector("#qrCode img").style.display = "block";
        dataContent.remove();
      } else if (!qrCodeChecker.checked && qrContent.children[1]) {
        document.querySelector("#qrCode img").style.display = "none";
        qrContent.appendChild(dataContent);
        edit();
      }
      move();
    });

    move();
  });

//onclick;
const printBtn = document.getElementById("download"),
  // colNum = document.getElementById("col"),
  // rowNum = document.getElementById("row"),
  cartNo = document.getElementById("cartno");
const cartContainer = document.getElementById("cartContainer");
const clone = cart.cloneNode();
let widthCont = document.getElementById("cartContainer").offsetWidth;
let ser = document.getElementById("serCart");
// rowNum.onchange = () => {
//   cartNo.value = rowNum.value * colNum.value;
// };
printBtn.onclick = () => {
  let copy = +cartNo.value;

  let myContainer = document.createElement("div"),
    margX = document.getElementById("paddingx"),
    margY = document.getElementById("paddingy"),
    bR = document.getElementById("bordersize");

  myContainer.style.display = "grid";

  myContainer.setAttribute("id", "cart-print");
  myContainer.style.cssText = `
  display : flex;
  flex-wrap : wrap;
  justify-content : center;
  align-items : center;
  width : 760px;
  max-width : 760px ;
  margin: auto;
  `;

  setBackGround();
  for (let i = 0; i < copy; i++) {
    let div = document.createElement("div");
    div.innerHTML = cart.innerHTML;
    div.id = clone.id;
    div.className = clone.className;
    let flexRadioDefault2 = document.getElementById("flexRadioDefault2");

    if (flexRadioDefault2.checked) {
      div.classList.add("cells");
    } else {
      div.classList.remove("cells");
    }

    // myContainer.appendChild(pageBreaks);

    div.style.margin = `${margX.value}px ${margY.value}px`;
    div.style.border = `${bR.value}px solid #000`;
    div.style.width = "31%";

    // div.querySelector(".icons img").style.filter = iconFilter.value;

    div.style.pageBreakInside = "avoid";
    div.children[8].textContent = `p-${i + 1}`;

    let curFiles = uploadBackground.files;

    for (const file of curFiles) {
      if (validFileType(file)) {
        let backgroundImg = URL.createObjectURL(file);
        div.style.backgroundImage = `url(${backgroundImg})`;
      }
    }
    myContainer.appendChild(div);
  }

  document.body.appendChild(myContainer);
  let pageBreaks = document.createElement("div");
  pageBreaks.className = "html2pdf__page-break";
  // console.log(document.querySelectorAll("#cart-print #cart:nth-child(6n)"));
  document.querySelector("#cart-print #cart:nth-child(6n)").after(pageBreaks);

  var element = document.getElementById("cart-print");
  var opt = {
    margin: [0, 0, 0, 10], //top, left, buttom, right
    filename: "carts.pdf",
    image: { type: "jpg", quality: 0.98 },
    html2canvas: { dpi: 192, scale: 2, letterRendering: true, useCORS: true },
    jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    pageBreak: { avoid: "tr" },
  };
  html2pdf(element, opt);
};

checkPage.onclick = () => {
  let copy = +cartNo.value;

  let myContainer = document.createElement("div"),
    margX = document.getElementById("paddingx"),
    margY = document.getElementById("paddingy"),
    bR = document.getElementById("bordersize");

  myContainer.style.display = "grid";

  myContainer.setAttribute("id", "cart-print");
  myContainer.style.cssText = `
  display : flex;
  flex-wrap : wrap;
  max-width : 760px ;
  background: #fff;
  padding: 10px;
  margin: auto;
  `;

  let bigContainer = document.createElement("div");
  bigContainer.id = "bigContainer";
  bigContainer.style.cssText = `

  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgb(221, 221, 221);
  width: 100%;
  height: auto;
  z-index: 1111;


    `;
  let div = document.createElement("div");
  div.style.cssText = `
  position: absolute;
  right: 50px;
  top: 50px;
  font-weight: bold;
  color: red;
  font-size: 30px;
  cursor: pointer;
  `;
  div.addEventListener("click", () => {
    bigContainer.remove();
  });
  div.innerHTML = `X`;
  bigContainer.appendChild(myContainer);
  bigContainer.prepend(div);
  setBackGround();
  for (let i = 0; i < copy; i++) {
    let div = document.createElement("div");
    div.innerHTML = cart.innerHTML;
    div.id = clone.id;
    div.className = clone.className;
    let flexRadioDefault2 = document.getElementById("flexRadioDefault2");

    if (flexRadioDefault2.checked) {
      div.classList.add("cells");
    } else {
      div.classList.remove("cells");
    }

    div.style.margin = `${margX.value}px ${margY.value}px`;
    div.style.border = `${bR.value}px solid #000`;
    div.style.width = "31%";
    div.style.pageBreakInside = "avoid";

    let curFiles = uploadBackground.files;

    for (const file of curFiles) {
      if (validFileType(file)) {
        let backgroundImg = URL.createObjectURL(file);
        div.style.backgroundImage = `url(${backgroundImg})`;
      }
    }
    myContainer.appendChild(div);
    document.body.appendChild(bigContainer);
  }
};
