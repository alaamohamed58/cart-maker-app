let fontEdit = document.createElement("div");

fontEdit.setAttribute("id", "fontedit");

fontEdit.innerHTML = `
<select name="fontfamily" id="fontfamily">
<option value="'Poppins', sans-serif">Poppins, sans-serif</option>
<option value="'Roboto', sans-serif">Roboto, sans-serif</option>
</select>
<input type="number" id="fontsize" value="12" />
<button>B</button>
<button><i>I</i></button>
<div id = "selected" style = "background : #ddd; color : #000; padding : 5px"> </div>
<input type="color" id="fontcolor" />
`;

let tageNames = ["H1", "H2", "H3", "H4", "H5", "SPAN", "P", "DIV", "MAIN"];
Array.from(cart.childNodes).forEach((e) => {
  e.addEventListener("dblclick", () => {
    for (let i = 0; i < tageNames.length; i++) {
      let tageName = tageNames[i];

      if (e.tagName == tageName) {
        document.body.prepend(fontEdit);
        changeStyle(e);
      }
    }
  });
});

function edit() {
  for (let i = 0; i < document.querySelectorAll("#cart div").length; i++) {
    let el = document.querySelectorAll("#cart div")[i].childNodes;
    el.forEach((e) => {
      e.addEventListener("dblclick", () => {
        for (let i = 0; i < tageNames.length; i++) {
          let tageName = tageNames[i];
          if (e.tagName == tageName) {
            document.body.prepend(fontEdit);
            changeStyle(e);
          }
        }
      });
    });
  }
}

edit();
function changeStyle(e) {
  let fontEdit = document.getElementById("fontedit");
  fontEdit.children[4].textContent = e.textContent;
  //fontfamily
  fontEdit.children[0].oninput = () => {
    e.style.fontFamily = `${fontEdit.children[0].value}`;
  };
  //fontsize
  fontEdit.children[1].oninput = () => {
    e.style.setProperty(
      "font-size",
      `${fontEdit.children[1].value}px`,
      "important"
    );
  };

  //fontbold
  fontEdit.children[2].onclick = () => {
    fontEdit.children[2].classList.toggle("bold");
    if (fontEdit.children[2].classList.contains("bold")) {
      e.style.fontWeight = "bold";
    } else {
      e.style.fontWeight = "normal";
    }
  };
  //font italic
  fontEdit.children[3].onclick = () => {
    fontEdit.children[3].classList.toggle("italic");

    if (fontEdit.children[3].classList.contains("italic")) {
      e.style.fontStyle = "italic";
    } else {
      e.style.fontStyle = "normal";
    }
  };
  //fontcolor
  fontEdit.children[5].oninput = () => {
    e.style.color = `${fontEdit.children[5].value}`;
  };
}

//hide fontedit
document.addEventListener("click", (event) => {
  const box = document.getElementById("fontedit");

  if (box && !box.contains(event.target)) {
    box.remove();
  }
});
