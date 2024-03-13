import { posts, suggestUsers, users } from "./database.js";

/* ------------------------------- Function Follow ------------------------------- */

function follow() {
  const button__follow = document.querySelectorAll(".button__follow");

  button__follow.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("button__following");

      if (button.classList.contains("button__following")) {
        button.innerText = "Seguindo";
      } else {
        button.innerText = "Seguir";
      }
    });
  });
}

/* ------------------------------- DOM Suggestions ------------------------------- */

function suggestion(users) {
  const ul = document.querySelector(".suggestions__container");

  users.forEach((user) => {
    const people = createUser(user);
    ul.appendChild(people);
  });
}

function createUser(element) {
  const profile__suggestions = document.createElement("li");
  const img__profile = document.createElement("img");
  const name__container = document.createElement("div");
  const name__button = document.createElement("div");
  const name__profile = document.createElement("h2");
  const button__follow = document.createElement("button");
  const stack__profile = document.createElement("h3");

  profile__suggestions.classList.add("profile__suggestions");

  img__profile.classList.add("img__profile");
  img__profile.src = element.img;
  img__profile.alt = element.user;

  name__container.classList.add("name__container");

  name__button.classList.add("name__button");

  name__profile.classList.add("name__profile");
  name__profile.innerText = element.user;

  button__follow.classList.add("button__follow");
  button__follow.innerText = "Seguir";

  stack__profile.classList.add("stack__profile");
  stack__profile.innerText = element.stack;

  name__button.append(name__profile, button__follow);
  name__container.append(name__button, stack__profile);
  profile__suggestions.append(img__profile, name__container);

  return profile__suggestions;
}
suggestion(suggestUsers);
follow();

/* ------------------------------- DOM Posts ------------------------------- */

function redeSocial(lista) {
  const ul = document.querySelector(".post__container");
  ul.innerHTML = "";
  lista.forEach((object) => {
    const post = createPost(object);
    ul.append(post);
  });
  like()
  modal()
}

function createPost(element) {
  const li = document.createElement("li");
  const post__profile = document.createElement("div");
  const img__post = document.createElement("img");
  const name__container = document.createElement("div");
  const name__post = document.createElement("h3");
  const stack__post = document.createElement("h4");
  const subject__post = document.createElement("span");
  const text__post = document.createElement("p");
  const button__like = document.createElement("div");
  const open__post = document.createElement("button");
  const img__like = document.createElement("img");

  li.classList.add("item__container");

  post__profile.classList.add("post__profile");

  img__post.classList.add("img__post");
  img__post.src = element.img;
  img__post.alt = element.user;

  name__container.classList.add("name__container");

  name__post.classList.add("name__post");
  name__post.innerText = element.user;

  stack__post.classList.add("stack__post");
  stack__post.innerText = element.stack;

  subject__post.classList.add("subject__post");
  subject__post.innerText = element.title;

  text__post.classList.add("text__post");
  text__post.innerText = element.text;

  button__like.classList.add("button__like");

  open__post.classList.add("open__post");
  open__post.innerText = "Abrir Post";
  open__post.dataset.id = element.id;

  img__like.classList.add("img__like");
  img__like.src = "./src/assets/img/dislike.svg";
  img__like.alt = "dislike";

  name__container.append(name__post, stack__post);
  post__profile.append(img__post, name__container);
  button__like.append(open__post, img__like);
  li.append(post__profile, subject__post, text__post, button__like);

  return li;
}
redeSocial(posts);

/* ------------------------------- Like/Dislike ------------------------------- */

function like() {
  const button__like = document.querySelectorAll(".img__like");
  console.log("text")

  button__like.forEach((img) => {
    img.addEventListener("click", () => {
      if (img.alt === "dislike") {
        img.src = "./src/assets/img/like.svg";
        img.alt = "like";
      } else {
        img.src = "./src/assets/img/dislike.svg";
        img.alt = "dislike";
      }
    });
  });
}
// like();

/* ------------------------------- Modal ------------------------------- */

function modal() {
  const modal = document.querySelector(".modal__container");
  const buttons = document.querySelectorAll(".open__post");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      modal.innerHTML = "";
      const modalContent = createModal(btn.dataset.id);
      modal.appendChild(modalContent);

      modal.showModal();
      modal.classList.add("show__modal");
      closeModal();
    });
  });
}

function createModal(id) {
  const div__modal = document.createElement("div");
  const profile__modal = document.createElement("div");
  const image__modal = document.createElement("img");
  const organization__modal = document.createElement("div");
  const name__modal = document.createElement("h3");
  const stack__modal = document.createElement("h4");
  const topic__modal = document.createElement("h2");
  const text__modal = document.createElement("h3");
  const close__modal = document.createElement("button");

  let element = {};

  posts.forEach((post) => {
    if (post.id === Number(id)) {
      element = post;
    }
  });

  div__modal.classList.add("div__modal");

  profile__modal.classList.add("profile__modal");

  image__modal.classList.add("image__modal");
  image__modal.src = element.img;
  image__modal.alt = element.user;

  organization__modal.classList.add("organization__modal");

  name__modal.classList.add("name__modal");
  name__modal.innerText = element.user;

  stack__modal.classList.add("stack__modal");
  stack__modal.innerText = element.stack;

  topic__modal.classList.add("topic__modal");
  topic__modal.innerText = element.title;

  text__modal.classList.add("text__modal");
  text__modal.innerText = element.text;

  close__modal.classList.add("close__modal");
  close__modal.innerText = "X";

  organization__modal.append(name__modal, stack__modal);
  profile__modal.append(image__modal, organization__modal);
  div__modal.append(profile__modal, topic__modal, text__modal, close__modal);
  return div__modal;
}

function closeModal() {
  const modal = document.querySelector(".modal__container");
  const closeBtn = document.querySelector(".close__modal");

  closeBtn.addEventListener("click", function () {
    modal.close();
  });
}

/* ------------------------------- CreateNewPost ------------------------------- */

function registerPost(array) {
  const inputs = document.querySelectorAll(".input__text");
  const { user, stack, img } = users[0];

  const newPost = { user: user, stack: stack, img: img };

  let emptyInput = 0;

  inputs.forEach((input) => {
    if (input.value === "") {
      emptyInput++;
    }

    newPost[input.name] = input.value;
  });
  newPost.id = array.length + 1;
  if (emptyInput !== 0) {
    return alert("Favor preencher todos os campos necessários");
  }
  array.unshift(newPost);
}

function registerEvent(array) {
  const submitButton = document.querySelector(".button__post");

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    registerPost(array);
    redeSocial(array);
  });
}
registerEvent(posts);