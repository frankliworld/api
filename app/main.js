const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);

const templateForm = (data) => {
  return `
    <main class="grid h-screen" style="grid-template-columns: 1fr 400px; gap: 40px">
      <section class="p-10 grid place-self-center">
        <h1 class="font-bold text-2xl">${data.title}</h1>
        <p class="mb-10 text-gray-500 text-sm">${data.description}</p>
        <form id="user-form">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" name="name" class="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md" placeholder="Ingresar nombre">
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700">Apellido</label>
            <input type="text" name="lastname" class="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md" placeholder="Ingresar apellido">
          </div>
          <button type="submit" class="mt-4 w-full px-3 py-2 text-white font-bold rounded-md bg-indigo-500 hover:bg-indigo-600">Enviar</button>
        </form>
      </section>

      <section id="user-list" class="bg-gray-50 p-10 h-full overflow-y-auto grid gap-10 " style="align-content: center">list void</section>
    </main>
  `;
};

const renderTemplate = () => {
  const data = {
    title: "Formulario de prueba",
    description:
      "Este es un formulario de prueba para alimentar la base de datos",
  };
  qs("#app").innerHTML = templateForm(data);
};

const templateCard = (user) => {
  const { _id, name, lastname } = user;
  const numberRandom = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const picture =
    "https://source.unsplash.com/random/100x100?sig=" + numberRandom(1, 500);
  const username = name.toLowerCase();
  return `
    <article class="overflow-visible py-3 px-3 relative bg-white shadow-lg ring-1 ring-black/5 rounded-xl" style="display: grid; grid-template-columns: 50px 1fr auto; gap: 10px; align-items: center">
      <div>
        <img class="absolute bg-white -left-4 w-20 h-20 rounded-full shadow-lg" style="transform: translateY(-50%)" src="${picture}" alt="${name}"/>
      </div>
      <div class="flex flex-col">
        <h2 class="font-bold">${name} ${lastname}</h2>
        <p class="text-gray-500 text-sm">@${username}</p>
      </div>
      <button data-id="${_id}" class="rounded-full border-2 border-gray-200 text-gray-500 text-sm px-2 py-1">
        eliminar
      </button>
    </article>
  `;
};

const getUsers = async () => {
  const res = await fetch("/users");
  const users = await res.json();
  const userList = qs("#user-list");
  userList.innerHTML = users.map((user) => templateCard(user)).join("");
  userList.scrollTop = userList.scrollHeight;
  
  users.forEach((user) => {
    const button = qs(`button[data-id="${user._id}"]`);
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      await fetch(`/users/${user._id}`, {
        method: "DELETE",
      }).catch((err) => console.log(err));
      button.parentNode.remove();
      console.log("user deleted id:" + user._id);
    });
  });
};

const addFormListener = () => {
  const form = qs("#user-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    if(data.name && data.lastname) {
      await fetch("/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((err) => console.log(err));
      form.reset();
      getUsers();
    } else {
      console.log("data not valid");
    }
  });
};

window.onload = () => {
  renderTemplate();
  addFormListener();
  getUsers();
  console.log("app active :)");
};
