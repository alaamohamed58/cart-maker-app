let txtInputs = document.querySelectorAll('#checkInputs input[type = "text"]'),
  informCheckBox = document.querySelectorAll(
    "#checkInputs input#inform, input#inform2"
  );
let p1 = document.querySelector("#cart .inform"),
  p2 = document.querySelector("#cart .inform2"),
  inform1Input = document.getElementById("informInput"),
  inform2Input = document.getElementById("inform2Input");
informCheckBox.forEach((el) => {
  el.addEventListener("click", () => {
    let input = el.parentElement.nextElementSibling.querySelector("input");
    if (el.checked) {
      input.disabled = false;
    } else {
      input.disabled = true;
    }

    let paragraph = document.createElement("p");
    paragraph.className = "inform";
  });
});

inform1Input.addEventListener("input", () => {
  p1.textContent = inform1Input.value;
});
inform2Input.addEventListener("input", () => {
  p2.textContent = inform2Input.value;
});

txtInputs.forEach((txt) => {
  txt.disabled = true;
});

let informCheker = document.getElementById("inform"),
  inform2Cheker = document.getElementById("inform2");

informCheker.addEventListener("click", () => {
  if (informCheker.checked) {
    p1.style.display = "block";
  } else {
    p1.style.display = "none";
  }
});

inform2Cheker.addEventListener("click", () => {
  if (inform2Cheker.checked) {
    p2.style.display = "block";
  } else {
    p2.style.display = "none";
  }
});

let titleText = document.getElementById("titleText"),
  cartTitle = document.getElementById("cartTitle"),
  titleChecker = document.getElementById("titleinput");
cartTitle.style.display = "none";
titleChecker.addEventListener("click", () => {
  if (titleChecker.checked) {
    titleText.disabled = false;
    cartTitle.style.display = "block";
  } else {
    titleText.disabled = true;
    cartTitle.style.display = "none";
  }
});

titleText.disabled = true;

titleText.addEventListener("input", () => {
  cartTitle.textContent = titleText.value;
});
let expireChecker = document.getElementById("expire"),
  expirationValue = document.querySelector(".expiration");

expireChecker.checked = true;
expireChecker.addEventListener("click", () => {
  if (expireChecker.checked) {
    expirationValue.style.display = "block";
  } else {
    expirationValue.style.display = "none";
  }
});
let serChecker = document.getElementById("flexCheckDefault"),
  serNum = document.querySelector("#cart h5");

serChecker.checked = true;
serChecker.addEventListener("click", () => {
  if (serChecker.checked) {
    serNum.style.display = "block";
  } else {
    serNum.style.display = "none";
  }
});

let dateChecker = document.getElementById("date"),
  dateShow = document.getElementById("dateshow");
var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

dateShow.textContent = utc;
dateChecker.checked = true;
dateChecker.addEventListener("click", () => {
  if (dateChecker.checked) {
    dateShow.style.display = "block";
  } else {
    dateShow.style.display = "none";
  }
});
