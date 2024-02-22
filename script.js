class Slide {
  constructor(slideSelector, carroselSelector) {
    this.slide = document.querySelector(slideSelector);
    this.carrosel = document.querySelector(carroselSelector);
    this.dist = { finalPosition: 0, startX: 0, movement: 0, movePosition: 0 };
    this.activeClass = "active";
    this.index = { prev: undefined, active: 0, next: 1 };
  }

  transition(active) {
    this.slide.style.transition = active ? "transform .3s" : "";
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition + this.dist.movement;
  }

  onStart(event) {
    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      movetype = "mousemove";
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = "touchmove";
    }
    this.carrosel.addEventListener(movetype, this.onMove);
    this.transition(false);
  }

  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX; // Correção aqui
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const movetype = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.carrosel.removeEventListener(movetype, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
    this.transition(true);
    this.changeSlideOnEnd();
  }

  changeSlideOnEnd() {
    if (this.dist.movement > 120 && this.index.next !== undefined) {
      this.activeNextSlide();
    } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
      this.activePrevSlide();
    } else {
      this.changeSlide(this.index.active);
    }
  }

  addSlideEvents() {
    this.carrosel.addEventListener("mousedown", this.onStart);
    this.carrosel.addEventListener("touchstart", this.onStart);
    this.carrosel.addEventListener("mouseup", this.onEnd);
    this.carrosel.addEventListener("touchend", this.onEnd);
  }

  slidePosition(slide) {
    const margin = (this.carrosel.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(this.slideArray[index].position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
    this.changeActiveClass(); // Correção aqui
  }

  changeActiveClass() {
    this.slideArray.forEach((item) =>
      item.element.classList.remove(this.activeClass)
    );
    this.slideArray[this.index.active].element.classList.add(this.activeClass);
  }

  activePrevSlide() {
    if (this.index.prev !== undefined) this.changeSlide(this.index.prev);
  }

  activeNextSlide() {
    if (this.index.next !== undefined) this.changeSlide(this.index.next);
  }

  onResize() {
    setTimeout(() => {
      this.slidesConfig();
      this.changeSlide(this.index.active);
    }, 1000);
  }

  addResizeEvent() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.activePrevSlide = this.activePrevSlide.bind(this);
    this.activeNextSlide = this.activeNextSlide.bind(this);
    this.onResize = this.onResize.bind(this);
  }
  init() {
    this.bindEvents();
    this.transition(true);
    this.addSlideEvents();
    this.slidesConfig();
    this.addResizeEvent();
    this.changeSlide(2);
    this.addArrow(".prev", ".next");
    return this;
  }
}

class slideNav extends Slide {
  addArrow(prev, next) {
    this.prevElement = document.querySelector(prev);
    this.nextElement = document.querySelector(next);
    this.addArrowEvent();
  }

  addArrowEvent() {
    this.prevElement.addEventListener("click", this.activePrevSlide);
    this.nextElement.addEventListener("click", this.activeNextSlide);
  }
}

const meuCarrosel = new slideNav(".slides-carrosel", ".carrosel");
meuCarrosel.init();

meuCarrosel.addArrow(".prev", ".next");

////////////////////////////////////////////////Accordion List

const accordionLista = document.querySelectorAll(".accordion dt");
accordionLista[0].classList.add("ativo");
accordionLista[0].nextElementSibling.classList.add("ativo");

function activeAccordion() {
  this.classList.toggle("ativo");
  this.nextElementSibling.classList.toggle("ativo");
}

accordionLista.forEach((item) => {
  item.addEventListener("click", activeAccordion);
});

////////////////////////////////////////////////radio button

const radioButtonContainer = document.querySelector(".divRadioButton-Js");
const radioButtons = radioButtonContainer.querySelectorAll(".radio-button");

radioButtons.forEach(function (item) {
  item.addEventListener("click", function () {
    if (item.classList.contains("radio-button-checked")) {
      item.classList.remove("radio-button-checked");
    } else {
      radioButtons.forEach(function (radiobutton) {
        radiobutton.classList.remove("radio-button-checked");
      });
      item.classList.add("radio-button-checked");
    }
  });
});

////////////////////////////////////////////////checkbox

const tdsMeios = document.getElementById("checkBox-tdsMeios-JS");
const enviarEmail = document.getElementById("checkBox-email-JS");
const enviarSMS = document.getElementById("checkBox-sms-JS");

function tdsMeiosClick() {
  const tdsMeiosHasClass = tdsMeios.classList.contains("checkBox-checked");
  const enviarEmailHasClass =
    enviarEmail.classList.contains("checkBox-checked");
  const enviarSMSHasClass = enviarSMS.classList.contains("checkBox-checked");

  if (!tdsMeiosHasClass && !enviarEmailHasClass && !enviarSMSHasClass) {
    tdsMeios.classList.add("checkBox-checked");
    enviarEmail.classList.add("checkBox-checked");
    enviarSMS.classList.add("checkBox-checked");
  } else if (tdsMeiosHasClass && enviarEmailHasClass && enviarSMSHasClass) {
    tdsMeios.classList.remove("checkBox-checked");
    enviarEmail.classList.remove("checkBox-checked");
    enviarSMS.classList.remove("checkBox-checked");
  } else if (enviarSMSHasClass || enviarEmailHasClass) {
    tdsMeios.classList.add("checkBox-checked");
    enviarEmail.classList.add("checkBox-checked");
    enviarSMS.classList.add("checkBox-checked");
  }
}

tdsMeios.addEventListener("click", tdsMeiosClick);

function enviarEmailClick() {
  const enviarEmailHasClass =
    enviarEmail.classList.contains("checkBox-checked");
  const enviarSMSHasClass = enviarSMS.classList.contains("checkBox-checked");
  const tdsMeiosHasClass = tdsMeios.classList.contains("checkBox-checked");

  if (!enviarEmailHasClass) {
    enviarEmail.classList.add("checkBox-checked");
  } else {
    enviarEmail.classList.remove("checkBox-checked");
  }

  if (enviarSMSHasClass && !tdsMeiosHasClass) {
    tdsMeios.classList.add("checkBox-checked");
    enviarEmail.classList.add("checkBox-checked");
  } else if (tdsMeiosHasClass && enviarEmailHasClass && enviarSMSHasClass) {
    tdsMeios.classList.remove("checkBox-checked");
    enviarEmail.classList.remove("checkBox-checked");
  } else if (!tdsMeiosHasClass && !enviarEmailHasClass && enviarSMSHasClass) {
    tdsMeios.classList.add("checkBox-checked");
    enviarEmail.classList.add("checkBox-checked");
  }
}

enviarEmail.addEventListener("click", enviarEmailClick);

function enviarSmsClick() {
  const enviarEmailHasClass =
    enviarEmail.classList.contains("checkBox-checked");
  const enviarSMSHasClass = enviarSMS.classList.contains("checkBox-checked");
  const tdsMeiosHasClass = tdsMeios.classList.contains("checkBox-checked");

  if (!enviarSMSHasClass) {
    enviarSMS.classList.add("checkBox-checked");
  } else {
    enviarSMS.classList.remove("checkBox-checked");
  }

  if (!enviarSMSHasClass && tdsMeiosHasClass) {
    tdsMeios.classList.add("checkBox-checked");
    enviarSMS.classList.add("checkBox-checked");
  } else if (tdsMeiosHasClass && enviarEmailHasClass && enviarSMSHasClass) {
    tdsMeios.classList.remove("checkBox-checked");
    enviarSMS.classList.remove("checkBox-checked");
  } else if (!tdsMeiosHasClass && enviarEmailHasClass && !enviarSMSHasClass) {
    tdsMeios.classList.add("checkBox-checked");
    enviarSMS.classList.add("checkBox-checked");
  }
}

enviarSMS.addEventListener("click", enviarSmsClick);

////////////////////////////////////////////////select

const selectForm = document.querySelector(".selectForm");
const carneOptions = document.querySelector(".select-menu");

function toggleSelectMenu() {
  carneOptions.style.display =
    carneOptions.style.display === "block" ? "none" : "block";

  const subTituloForm = selectForm.querySelector(".subTituloForm");
  subTituloForm.classList.toggle("active");
}

function selectOption(option) {
  document.getElementById("select").textContent =
    "Tipo de carne favorita: " + option;
  toggleSelectMenu();

  const selectOptions = carneOptions.querySelectorAll("li");
  selectOptions.forEach((item) => {
    if (item.textContent === option) {
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
  });
}

////////////////////////////////////////////////validação

const formulario = document.getElementById("formularioContato");
const nome = document.getElementById("nome");
const telefoneInput = document.getElementById("telefone");
const carnesExotic = document.getElementById("radioButton-carnesExotic");
const carnesTrad = document.getElementById("radioButton-carnesTrad");
const amabasCarne = document.getElementById("radioButton-ambas");
const mensagemForm = document.getElementById("mensagem");
const emailInput = document.getElementById("email");
const selectCarne = document.querySelector(".selectForm ul.select-menu");

const botaoForm = document.getElementById("botaoFormulario");

botaoForm.addEventListener("click", function (event) {
  event.preventDefault();
  validar();
});

function validar() {
  const nomeValido = validacaoNome(nome);
  const radioButtonValido = validacaoRadioButton(
    carnesExotic,
    carnesTrad,
    amabasCarne
  );
  const mensagemFormValido = validacaoMensagemForm();
  const telefoneValido = validacaoTelefone();
  const emailValido = validacaoEmail();
  const selectValido = validacaoSelect(selectCarne);

  if (
    nomeValido &&
    radioButtonValido &&
    mensagemFormValido &&
    telefoneValido &&
    emailValido &&
    selectValido
  ) {
    formulario.reset();
    const mensagemValidado = document.createElement("div");
    mensagemValidado.classList.add("mensagemValidado");
    mensagemValidado.innerHTML = "<p>Formulário enviado com sucesso!</p>";
    formulario.appendChild(mensagemValidado);
  }
}

function validacaoNome(element) {
  const nomeValue = element.value.trim();
  const nomes = nomeValue.split(" ");

  if (nomeValue.length === 0) {
    addError(element, "O campo precisa ser preenchido.");
    return false;
  } else if (nomes.length < 2) {
    addError(element, "Pelo menos dois nomes são necessários.");
    return false;
  } else {
    cleanError(element);
    return true;
  }
}

function validacaoTelefone() {
  const telefone = telefoneInput.value.replace(/[\(\)\-\s]/g, "");
  if (telefone.length !== 11) {
    addError(telefoneInput, "Telefone inválido.");
    return false;
  } else {
    cleanError(telefoneInput);
    return true;
  }
}

function validacaoRadioButton(opcao1, opcao2, opcao3) {
  const radioErro = document.getElementById("radioErro");
  cleanError(opcao1);
  cleanError(opcao2);
  cleanError(opcao3);

  if (
    !opcao1.classList.contains("radio-button-checked") &&
    !opcao2.classList.contains("radio-button-checked") &&
    !opcao3.classList.contains("radio-button-checked")
  ) {
    addError(radioErro, "Selecione pelo menos um item de preferência.");
    return false;
  } else {
    return true;
  }
}

function validacaoEmail() {
  const email = emailInput.value.toLowerCase();
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  cleanError(emailInput);
  if (email.length === 0 || !regexEmail.test(email)) {
    addError(emailInput, "Email inválido");
    return false;
  } else {
    cleanError(emailInput);
    return true;
  }
}

function validacaoMensagemForm() {
  cleanError(mensagemForm);
  const mensagemFormValue = mensagemForm.value.trim();

  if (mensagemFormValue.length < 5) {
    addError(mensagemForm, "A mensagem deve ter pelo menos 5 caracteres.");
    return false;
  } else {
    cleanError(mensagemForm);
    return true;
  }
}

function validacaoSelect() {
  const selectedOption = carneOptions.querySelector("li.selected");
  const selectErro = document.getElementById("selectErro");
  cleanError(selectErro);

  if (!selectedOption) {
    addError(selectErro, "Selecione uma opção de carne favorita.");
    return false;
  } else {
    return true;
  }
}

function addError(element, message) {
  cleanError(element);
  const mensagemErroContainer = document.createElement("div");
  mensagemErroContainer.classList.add("mensagem-erro");
  mensagemErroContainer.style.fontSize = "12px";
  mensagemErroContainer.style.color = "red";
  element.parentNode.insertBefore(mensagemErroContainer, element.nextSibling);
  mensagemErroContainer.textContent = message;
}

function cleanError(element) {
  const mensagemErroContainer = element.nextElementSibling;
  if (
    mensagemErroContainer &&
    mensagemErroContainer.classList.contains("mensagem-erro")
  ) {
    mensagemErroContainer.remove();
  }
}
